import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import { checkAllBadges } from '../utils/badgeChecker';
import { calculateLevel, calculateXP } from '../utils/xpCalculator';

const usersCollection = collection(db, 'users');
const capturesCollection = collection(db, 'userCaptures');
const badgesCollection = collection(db, 'userBadges');
const foodCollection = collection(db, 'foodItems');

/**
 * Fetch a user profile document.
 * @param {string} userId
 * @returns {Promise<object|null>}
 */
export async function getUserProfile(userId) {
  try {
    const snapshot = await getDoc(doc(usersCollection, userId));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}

/**
 * Create a user profile document.
 * @param {string} userId
 * @param {string} username
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function createUserProfile(userId, username, email) {
  try {
    const userDoc = {
      id: userId,
      username,
      email,
      xp: 0,
      level: 1,
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(usersCollection, userId), userDoc, { merge: true });
  } catch (error) {
    console.error('Failed to create user profile:', error);
    throw error;
  }
}

/**
 * Add XP to a user and recalculate level (transaction).
 * @param {string} userId
 * @param {number} xpToAdd
 * @returns {Promise<{ xp: number, level: number }>} Updated values
 */
export async function updateUserXP(userId, xpToAdd) {
  try {
    return await runTransaction(db, async (transaction) => {
      const userRef = doc(usersCollection, userId);
      const snapshot = await transaction.get(userRef);

      if (!snapshot.exists()) {
        throw new Error('User profile not found.');
      }

      const current = snapshot.data();
      const newXP = Math.max(0, (current.xp || 0) + (xpToAdd || 0));
      const newLevel = calculateLevel(newXP);

      transaction.update(userRef, { xp: newXP, level: newLevel });

      return { xp: newXP, level: newLevel };
    });
  } catch (error) {
    console.error('Failed to update user XP:', error);
    throw error;
  }
}

/**
 * Get array of captured food item IDs for a user.
 * @param {string} userId
 * @returns {Promise<string[]>}
 */
export async function getUserCaptures(userId) {
  try {
    const q = query(capturesCollection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => docSnap.data().foodItemId);
  } catch (error) {
    console.error('Failed to fetch user captures:', error);
    throw error;
  }
}

/**
 * Check if a user has already captured a food item.
 * @param {string} userId
 * @param {string} foodItemId
 * @returns {Promise<boolean>}
 */
export async function hasCaptured(userId, foodItemId) {
  try {
    const q = query(
      capturesCollection,
      where('userId', '==', userId),
      where('foodItemId', '==', foodItemId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Failed to check capture:', error);
    throw error;
  }
}

/**
 * Capture a food item and award XP (transaction).
 * @param {string} userId
 * @param {string} foodItemId
 * @returns {Promise<{ xpAwarded: number, newXP: number, newLevel: number }>} Result
 */
export async function captureFood(userId, foodItemId) {
  try {
    const result = await runTransaction(db, async (transaction) => {
      const userRef = doc(usersCollection, userId);
      const userSnapshot = await transaction.get(userRef);

      if (!userSnapshot.exists()) {
        throw new Error('User profile not found.');
      }

      const foodRef = doc(foodCollection, foodItemId);
      const foodSnapshot = await transaction.get(foodRef);

      if (!foodSnapshot.exists()) {
        throw new Error('Food item not found.');
      }

      const captureQuery = query(
        capturesCollection,
        where('userId', '==', userId),
        where('foodItemId', '==', foodItemId)
      );
      const captureSnapshot = await getDocs(captureQuery);
      if (!captureSnapshot.empty) {
        throw new Error('Item already captured.');
      }

      const foodItem = foodSnapshot.data();
      const xpAwarded = calculateXP(foodItem.category, foodItem.isBossFood);

      const userData = userSnapshot.data();
      const newXP = Math.max(0, (userData.xp || 0) + xpAwarded);
      const newLevel = calculateLevel(newXP);

      const captureRef = doc(capturesCollection);
      transaction.set(captureRef, {
        userId,
        foodItemId,
        capturedAt: serverTimestamp(),
      });

      transaction.update(userRef, { xp: newXP, level: newLevel });

      return { xpAwarded, newXP, newLevel };
    });

    let newBadges = [];
    try {
      newBadges = await checkAndAwardBadges(userId);
    } catch (badgeError) {
      console.error('Failed to check/award badges:', badgeError);
    }

    return { ...result, newBadges };
  } catch (error) {
    console.error('Failed to capture food item:', error);
    throw error;
  }
}

/**
 * Get user badges with timestamps.
 * @param {string} userId
 * @returns {Promise<Array<{ badgeId: string, earnedAt: object }>>}
 */
export async function getUserBadges(userId) {
  try {
    const q = query(badgesCollection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      badgeId: docSnap.data().badgeId,
      earnedAt: docSnap.data().earnedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch user badges:', error);
    throw error;
  }
}

/**
 * Award a badge to a user.
 * @param {string} userId
 * @param {string} badgeId
 * @returns {Promise<void>}
 */
export async function awardBadge(userId, badgeId) {
  try {
    const badgeRef = doc(badgesCollection, `${userId}_${badgeId}`);
    await setDoc(
      badgeRef,
      {
        userId,
        badgeId,
        earnedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Failed to award badge:', error);
    throw error;
  }
}

/**
 * Check all badges and award newly earned ones.
 * @param {string} userId
 * @returns {Promise<string[]>} Newly earned badge IDs
 */
export async function checkAndAwardBadges(userId) {
  return checkAllBadges(userId);
}

/**
 * Calculate user stats: total items, favorite park, total spent.
 * @param {string} userId
 * @returns {Promise<{ totalItems: number, favoritePark: string | null, totalSpent: number }>}
 */
export async function getUserStats(userId) {
  try {
    const captureQuery = query(capturesCollection, where('userId', '==', userId));
    const captureSnapshot = await getDocs(captureQuery);
    const capturedIds = captureSnapshot.docs.map((docSnap) => docSnap.data().foodItemId);

    if (capturedIds.length === 0) {
      return { totalItems: 0, favoritePark: null, totalSpent: 0 };
    }

    const foodSnapshot = await getDocs(foodCollection);
    const foodMap = new Map(
      foodSnapshot.docs.map((docSnap) => [docSnap.id, docSnap.data()])
    );

    const parkCounts = {};
    let totalSpent = 0;

    capturedIds.forEach((id) => {
      const item = foodMap.get(id);
      if (!item) return;

      totalSpent += Number(item.price || 0);
      const park = item.park || 'Unknown';
      parkCounts[park] = (parkCounts[park] || 0) + 1;
    });

    const favoritePark = Object.entries(parkCounts).reduce(
      (favorite, [park, count]) => {
        if (!favorite) return [park, count];
        return count > favorite[1] ? [park, count] : favorite;
      },
      null
    )?.[0] ?? null;

    return {
      totalItems: capturedIds.length,
      favoritePark,
      totalSpent: Number(totalSpent.toFixed(2)),
    };
  } catch (error) {
    console.error('Failed to calculate user stats:', error);
    throw error;
  }
}
