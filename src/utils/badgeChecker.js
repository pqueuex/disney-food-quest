import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { BADGES } from './constants';

const usersCollection = collection(db, 'users');
const capturesCollection = collection(db, 'userCaptures');
const badgesCollection = collection(db, 'userBadges');
const foodCollection = collection(db, 'foodItems');

/**
 * Return all badge definitions.
 * @returns {Array<object>}
 */
export function getBadgeDefinitions() {
  return BADGES;
}

/**
 * Check whether a user already has a badge.
 * @param {Array<string|{badgeId?: string, id?: string}>} userBadges
 * @param {string} badgeId
 * @returns {boolean}
 */
export function hasBadge(userBadges, badgeId) {
  if (!Array.isArray(userBadges)) return false;
  return userBadges.some((badge) => {
    if (typeof badge === 'string') return badge === badgeId;
    return badge?.badgeId === badgeId || badge?.id === badgeId;
  });
}

/**
 * Check a single badge's criteria.
 * @param {string} badgeId
 * @param {object} userData
 * @param {Array<object>} captures Array of food item objects
 * @returns {boolean}
 */
export function checkBadge(badgeId, userData, captures) {
  const badge = BADGES.find((item) => item.id === badgeId);
  if (!badge) return false;

  const capturedItems = Array.isArray(captures) ? captures : [];
  const totalCaptures = capturedItems.length;

  switch (badgeId) {
    case 'first-bite':
      return totalCaptures >= 1;
    case 'park-explorer': {
      const uniqueParks = new Set(
        capturedItems.map((item) => item?.park).filter(Boolean)
      );
      return uniqueParks.size >= 4;
    }
    case 'snack-attack':
      return capturedItems.filter((item) => item?.category === 'snacks').length >= 10;
    case 'sweet-tooth':
      return capturedItems.filter((item) => item?.category === 'desserts').length >= 10;
    case 'meal-master':
      return capturedItems.filter((item) => item?.category === 'meals').length >= 10;
    case 'century-club':
      return (userData?.xp || 0) >= 100;
    case 'completionist':
      return totalCaptures >= 50;
    case 'legend-hunter':
      return capturedItems.some((item) => item?.isBossFood === true);
    default:
      return false;
  }
}

const chunkArray = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const fetchCapturedFoodItems = async (capturedIds) => {
  const uniqueIds = Array.from(new Set(capturedIds));
  const batches = chunkArray(uniqueIds, 10);
  const results = [];

  for (const batch of batches) {
    const q = query(foodCollection, where(documentId(), 'in', batch));
    const snapshot = await getDocs(q);
    snapshot.docs.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() });
    });
  }

  return results;
};

const getUserBadges = async (userId) => {
  const q = query(badgesCollection, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => docSnap.data().badgeId);
};

/**
 * Check all badge criteria and award newly earned badges.
 * @param {string} userId
 * @returns {Promise<string[]>} Newly earned badge IDs
 */
export async function checkAllBadges(userId) {
  if (!userId) return [];

  try {
    const [userSnapshot, captureSnapshot, existingBadges] = await Promise.all([
      getDoc(doc(usersCollection, userId)),
      getDocs(query(capturesCollection, where('userId', '==', userId))),
      getUserBadges(userId),
    ]);

    if (!userSnapshot.exists()) return [];

    const userData = userSnapshot.data();
    const capturedIds = captureSnapshot.docs.map((docSnap) => docSnap.data().foodItemId);
    const capturedItems = capturedIds.length
      ? await fetchCapturedFoodItems(capturedIds)
      : [];

    const newlyEarned = [];

    for (const badge of BADGES) {
      if (hasBadge(existingBadges, badge.id)) continue;
      if (checkBadge(badge.id, userData, capturedItems)) {
        const badgeRef = doc(badgesCollection, `${userId}_${badge.id}`);
        await setDoc(badgeRef, {
          userId,
          badgeId: badge.id,
          earnedAt: serverTimestamp(),
        });
        newlyEarned.push(badge.id);
      }
    }

    return newlyEarned;
  } catch (error) {
    console.error('Failed to check badges:', error);
    throw error;
  }
}
