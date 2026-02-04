import {
  collection,
  getDoc,
  getDocs,
  doc,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const foodCollection = collection(db, 'foodItems');

const mapDocs = (snapshot) => snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

/**
 * Fetch all food items sorted by name.
 * @returns {Promise<Array<object>>}
 */
export async function getAllFoodItems() {
  try {
    const q = query(foodCollection, orderBy('name'));
    const snapshot = await getDocs(q);
    return mapDocs(snapshot);
  } catch (error) {
    console.error('Failed to fetch food items:', error);
    throw error;
  }
}

/**
 * Fetch a single food item by id.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getFoodItemById(id) {
  try {
    const snapshot = await getDoc(doc(db, 'foodItems', id));
    if (!snapshot.exists()) {
      return null;
    }
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error('Failed to fetch food item:', error);
    throw error;
  }
}

/**
 * Fetch food items filtered by park.
 * @param {string} parkName
 * @returns {Promise<Array<object>>}
 */
export async function getFoodItemsByPark(parkName) {
  try {
    const q = query(foodCollection, where('park', '==', parkName), orderBy('name'));
    const snapshot = await getDocs(q);
    return mapDocs(snapshot);
  } catch (error) {
    console.error('Failed to fetch food items by park:', error);
    throw error;
  }
}

/**
 * Fetch food items filtered by category.
 * @param {string} category
 * @returns {Promise<Array<object>>}
 */
export async function getFoodItemsByCategory(category) {
  try {
    const q = query(
      foodCollection,
      where('category', '==', category),
      orderBy('name')
    );
    const snapshot = await getDocs(q);
    return mapDocs(snapshot);
  } catch (error) {
    console.error('Failed to fetch food items by category:', error);
    throw error;
  }
}

/**
 * Search food items by name or description (client-side filter).
 * @param {string} searchTerm
 * @returns {Promise<Array<object>>}
 */
export async function searchFoodItems(searchTerm) {
  try {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return getAllFoodItems();
    }

    const q = query(foodCollection, orderBy('name'));
    const snapshot = await getDocs(q);
    const items = mapDocs(snapshot);

    return items.filter((item) => {
      const name = item.name?.toLowerCase() ?? '';
      const description = item.description?.toLowerCase() ?? '';
      return name.includes(normalized) || description.includes(normalized);
    });
  } catch (error) {
    console.error('Failed to search food items:', error);
    throw error;
  }
}

/**
 * Fetch "Legend" items.
 * @returns {Promise<Array<object>>}
 */
export async function getLegends() {
  try {
    const q = query(foodCollection, where('isLegend', '==', true), orderBy('name'));
    const snapshot = await getDocs(q);
    return mapDocs(snapshot);
  } catch (error) {
    console.error('Failed to fetch legends:', error);
    throw error;
  }
}

/**
 * Fetch "Hidden Gem" items.
 * @returns {Promise<Array<object>>}
 */
export async function getHiddenGems() {
  try {
    const q = query(
      foodCollection,
      where('isHiddenGem', '==', true),
      orderBy('name')
    );
    const snapshot = await getDocs(q);
    return mapDocs(snapshot);
  } catch (error) {
    console.error('Failed to fetch hidden gems:', error);
    throw error;
  }
}
