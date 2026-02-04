export const PARKS = [
  'Magic Kingdom',
  'EPCOT',
  'Hollywood Studios',
  'Animal Kingdom',
];

export const CATEGORIES = ['snacks', 'meals', 'desserts'];

export const XP_VALUES = {
  snacks: 10,
  desserts: 15,
  meals: 25,
  boss: 100,
};

export const BADGES = [
  {
    id: 'first-bite',
    name: 'First Bite',
    description: 'Capture your first item.',
    icon: '🍴',
    criteria: {
      type: 'captures-count',
      min: 1,
    },
  },
  {
    id: 'park-explorer',
    name: 'Park Explorer',
    description: 'Capture at least one item from all 4 parks.',
    icon: '🎢',
    criteria: {
      type: 'unique-parks',
      min: 4,
    },
  },
  {
    id: 'snack-attack',
    name: 'Snack Attack',
    description: 'Capture 10 snacks.',
    icon: '🍿',
    criteria: {
      type: 'category-count',
      category: 'snacks',
      min: 10,
    },
  },
  {
    id: 'sweet-tooth',
    name: 'Sweet Tooth',
    description: 'Capture 10 desserts.',
    icon: '🍰',
    criteria: {
      type: 'category-count',
      category: 'desserts',
      min: 10,
    },
  },
  {
    id: 'meal-master',
    name: 'Meal Master',
    description: 'Capture 10 meals.',
    icon: '🍽️',
    criteria: {
      type: 'category-count',
      category: 'meals',
      min: 10,
    },
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Earn 100 total XP.',
    icon: '💯',
    criteria: {
      type: 'total-xp',
      min: 100,
    },
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Capture 50 different items.',
    icon: '✅',
    criteria: {
      type: 'captures-count',
      min: 50,
    },
  },
  {
    id: 'legend-hunter',
    name: 'Legend Hunter',
    description: 'Capture a Boss Food item.',
    icon: '🏆',
    criteria: {
      type: 'boss-capture',
      min: 1,
    },
  },
];
