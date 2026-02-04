import { XP_VALUES } from './constants';

/**
 * Calculate XP for a given category.
 * @param {string} category
 * @param {boolean} isBossFood
 * @returns {number}
 */
export function calculateXP(category, isBossFood = false) {
  if (isBossFood) {
    return XP_VALUES.boss;
  }

  return XP_VALUES[category] ?? 0;
}

/**
 * XP needed to reach a specific level.
 * Formula: XP_needed = level * 50 + (level - 1) * 20
 * @param {number} level
 * @returns {number}
 */
export function getXPForLevel(level) {
  const safeLevel = Math.max(1, Math.floor(level));
  return safeLevel * 50 + (safeLevel - 1) * 20;
}

/**
 * Calculate the current level from total XP.
 * @param {number} totalXP
 * @returns {number}
 */
export function calculateLevel(totalXP) {
  const xp = Math.max(0, Math.floor(totalXP || 0));
  let level = 1;

  while (level < 20 && xp >= getXPForLevel(level + 1)) {
    level += 1;
  }

  return level;
}

/**
 * XP needed to reach the next level.
 * @param {number} currentXP
 * @returns {number}
 */
export function getXPToNextLevel(currentXP) {
  const level = calculateLevel(currentXP);
  const nextLevelXP = getXPForLevel(Math.min(level + 1, 20));
  return Math.max(0, nextLevelXP - Math.max(0, currentXP || 0));
}

/**
 * Get progress details for the current level.
 * @param {number} currentXP
 * @returns {{ level: number, currentLevelXP: number, nextLevelXP: number, percentage: number }}
 */
export function getLevelProgress(currentXP) {
  const xp = Math.max(0, currentXP || 0);
  const level = calculateLevel(xp);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(Math.min(level + 1, 20));
  const range = Math.max(1, nextLevelXP - currentLevelXP);
  const progress = Math.min(1, Math.max(0, (xp - currentLevelXP) / range));

  return {
    level,
    currentLevelXP,
    nextLevelXP,
    percentage: Math.round(progress * 100),
  };
}

/*
Unit test examples:

calculateXP('snacks', false) === 10
calculateXP('desserts', false) === 15
calculateXP('meals', false) === 25
calculateXP('snacks', true) === 100

getXPForLevel(1) === 50
getXPForLevel(2) === 120

calculateLevel(0) === 1
calculateLevel(50) === 2
calculateLevel(120) === 3

getXPToNextLevel(50) === 70
getLevelProgress(70) => level 2, percentage > 0
*/
