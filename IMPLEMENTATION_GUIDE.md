# Implementation Guide - For AI-Assisted Development

## Overview
This guide provides detailed specifications for each component, service, and utility function. Use these as references when prompting GitHub Copilot or other AI coding assistants.

---

## Firebase Services

### `src/services/firebase.js`
```javascript
// Initialize Firebase with environment variables
// Export: db, auth, storage
```

### `src/services/auth.js`
**Functions to implement:**
```javascript
// signUp(email, password, username) → creates user + Firestore user doc
// signIn(email, password) → returns user
// signOut() → logs out user
// getCurrentUser() → returns current user or null
```

### `src/services/foodService.js`
**Functions to implement:**
```javascript
// getAllFoodItems() → returns array of all food items
// getFoodItemById(id) → returns single food item
// getFoodItemsByPark(parkName) → returns filtered array
// getFoodItemsByCategory(category) → returns filtered array
// searchFoodItems(query) → returns items matching search
// getLegends() → returns items where isLegend === true
// getHiddenGems() → returns items where isHiddenGem === true
```

### `src/services/userService.js`
**Functions to implement:**
```javascript
// getUserProfile(userId) → returns user doc from Firestore
// updateUserXP(userId, xpToAdd) → adds XP and recalculates level
// getUserCaptures(userId) → returns array of captured food items
// captureFood(userId, foodItemId) → creates capture record, awards XP, checks badges
// hasCaptured(userId, foodItemId) → returns boolean
// getUserBadges(userId) → returns array of earned badges
// awardBadge(userId, badgeId) → creates badge record
// getUserStats(userId) → returns calculated stats object
// getLeaderboard(limit = 20) → returns top users by XP
```

---

## Components Specifications

### `src/components/Navbar.jsx`
**Props:** None (uses auth context)
**State:** None
**Features:**
- Logo/app name
- Navigation links: Home, Browse, Profile, Leaderboard
- Login/Signup buttons (if not authenticated)
- User avatar + logout button (if authenticated)
- Mobile responsive hamburger menu

### `src/components/FoodCard.jsx`
**Props:**
```javascript
{
  foodItem: {
    id: string,
    name: string,
    park: string,
    location: string,
    price: number,
    category: string,
    imageUrl: string,
    xp: number,
    isBossFood: boolean,
    isLegend: boolean,
    isHiddenGem: boolean,
    description: string
  },
  isCaptured: boolean,
  onCapture: (foodItemId) => void
}
```
**Features:**
- Display food image
- Show name, price, location
- Badge indicator for Boss/Legend/Hidden Gem
- "Captured" checkmark if already tried
- "Capture" button (disabled if already captured)
- Click to view details

### `src/components/FoodDetail.jsx`
**Props:**
```javascript
{
  foodItem: object, // same as FoodCard
  isCaptured: boolean,
  onCapture: (foodItemId) => void,
  onClose: () => void
}
```
**Features:**
- Modal/full-screen overlay
- Large image
- Full description
- All details (park, location, price, XP value)
- Special badges (Boss, Legend, Hidden Gem)
- Capture button
- Close button

### `src/components/Badge.jsx`
**Props:**
```javascript
{
  badge: {
    id: string,
    name: string,
    description: string,
    icon: string, // emoji or icon name
  },
  isEarned: boolean
}
```
**Features:**
- Show badge icon
- Badge name
- Description on hover
- Grayed out/locked state if not earned
- Earned date (if earned)

### `src/components/ProgressBar.jsx`
**Props:**
```javascript
{
  current: number,
  max: number,
  label: string // e.g., "Level 5"
}
```
**Features:**
- Visual progress bar
- Percentage fill
- Display current/max values
- Label above or inside bar

### `src/components/ProtectedRoute.jsx`
**Props:**
```javascript
{
  children: ReactNode
}
```
**Features:**
- Checks if user is authenticated
- Redirects to /login if not
- Renders children if authenticated

---

## Pages Specifications

### `src/pages/Home.jsx`
**Sections:**
1. Hero/Welcome section
2. "Nearby Legends" carousel (15-20 featured items)
3. "Hidden Gems" grid (10-15 items)
4. Quick stats (total items available, total users)
5. CTA to browse or sign up

### `src/pages/Browse.jsx`
**Features:**
- Search bar (filters in real-time)
- Park filter dropdown (All, Magic Kingdom, EPCOT, etc.)
- Category filter dropdown (All, Snacks, Meals, Desserts)
- Grid of FoodCard components
- Pagination or infinite scroll (optional for v1)
- Empty state if no results

### `src/pages/Profile.jsx`
**Sections:**
1. User info (username, level, XP)
2. Progress bar to next level
3. Stats cards:
   - Total items captured
   - Favorite park
   - Total money spent
4. Badge showcase (8 badges, locked/unlocked)
5. Captured items list
6. Logout button

### `src/pages/Leaderboard.jsx`
**Features:**
- Title: "Top Foodies"
- Ranked list (1-20)
- Each entry shows:
  - Rank number
  - Username
  - Level
  - Total XP
- Highlight current user if in top 20
- Refresh button

### `src/pages/Login.jsx`
**Form fields:**
- Email (input)
- Password (input)
- Submit button
- Link to signup page
- Error message display

### `src/pages/Signup.jsx`
**Form fields:**
- Username (input)
- Email (input)
- Password (input)
- Confirm password (input)
- Submit button
- Link to login page
- Error message display

---

## Utilities

### `src/utils/xpCalculator.js`
**Functions:**
```javascript
// calculateXP(category, isBossFood) → returns XP value
// calculateLevel(totalXP) → returns level number
// getXPForLevel(level) → returns XP needed to reach that level
// getXPToNextLevel(currentXP) → returns XP needed for next level
// getLevelProgress(currentXP) → returns { level, currentLevelXP, nextLevelXP, percentage }
```

**Level Formula:** 
```
XP_needed = level * 50 + (level - 1) * 20
```

### `src/utils/badgeChecker.js`
**Functions:**
```javascript
// checkBadges(userId) → checks all badge criteria, awards new badges
// getBadgeDefinitions() → returns array of all 8 badges with criteria
// hasBadge(userBadges, badgeId) → returns boolean
```

**Badge Criteria Logic:**
- First Bite: capturedItems.length >= 1
- Park Explorer: capturedItems unique parks >= 4
- Snack Attack: capturedItems where category === 'snacks' >= 10
- Sweet Tooth: capturedItems where category === 'desserts' >= 10
- Meal Master: capturedItems where category === 'meals' >= 10
- Century Club: totalXP >= 100
- Completionist: capturedItems.length >= 50
- Legend Hunter: capturedItems has at least 1 isBossFood === true

### `src/utils/constants.js`
```javascript
export const PARKS = ['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom'];
export const CATEGORIES = ['snacks', 'meals', 'desserts'];
export const XP_VALUES = {
  snacks: 10,
  desserts: 15,
  meals: 25,
  boss: 100
};
export const BADGES = [
  { id: 'first-bite', name: 'First Bite', icon: '🍴', description: '...' },
  // ... all 8 badges
];
```

---

## Context

### `src/context/AuthContext.jsx`
**Provides:**
```javascript
{
  currentUser: object | null,
  loading: boolean,
  signUp: (email, password, username) => Promise,
  signIn: (email, password) => Promise,
  signOut: () => Promise
}
```

**Implementation notes:**
- Uses Firebase onAuthStateChanged listener
- Persists auth state
- Provides loading state while checking auth
- Wraps entire app in App.jsx

---

## Routing Structure

```javascript
// src/App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
</Routes>
```

---

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read all food items
    match /foodItems/{itemId} {
      allow read: if true;
      allow write: if false; // Only admins (add later)
    }
    
    // Users can read their own profile
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    
    // Users can only create/read their own captures
    match /userCaptures/{captureId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update, delete: if false;
    }
    
    // Users can only create/read their own badges
    match /userBadges/{badgeId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update, delete: if false;
    }
  }
}
```

---

## Styling Guidelines

### Tailwind Theme
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'disney-blue': '#0063B2',
      'disney-purple': '#6B4E9C',
      'disney-yellow': '#FFD700',
      'disney-red': '#E4002B',
    }
  }
}
```

### Common Patterns
- Cards: `rounded-lg shadow-md bg-white p-4`
- Buttons: `bg-disney-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`
- Inputs: `border border-gray-300 rounded px-3 py-2 w-full`
- Badges: `bg-disney-yellow text-black text-xs px-2 py-1 rounded-full`

---

## Error Handling

### Pattern for all async operations:
```javascript
try {
  setLoading(true);
  setError(null);
  
  const result = await someAsyncOperation();
  
  // Success toast
  toast.success('Success message');
  
} catch (error) {
  console.error('Error:', error);
  setError(error.message);
  toast.error(error.message);
} finally {
  setLoading(false);
}
```

---

## Testing Checklist Template

For each component/feature:
```markdown
- [ ] Renders without errors
- [ ] Props are validated
- [ ] Loading states work
- [ ] Error states display
- [ ] User interactions work
- [ ] Firebase operations succeed
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] No console errors/warnings
```

---

## AI Prompting Tips

### For GitHub Copilot Chat:

**When creating a component:**
```
Create a [ComponentName] component based on the specification in IMPLEMENTATION_GUIDE.md.
It should accept [list props] and include [list features].
Use Tailwind CSS for styling and follow the Disney theme colors.
```

**When creating a service function:**
```
Implement the [functionName] function in [filename].
It should [describe behavior].
Use Firestore with this query: [describe query].
Include proper error handling and return [describe return value].
```

**When debugging:**
```
I'm getting [error message] when [describe action].
The relevant code is in [filename].
Here's what I expect to happen: [describe expected behavior]
```

---

## Performance Optimization Notes

### For V1 (Keep it simple):
- Use basic React state (no Redux needed)
- Cache food items in memory after first fetch
- Debounce search input (300ms)
- Lazy load images with loading="lazy"
- Use Firebase indexes for leaderboard queries

### For Future Versions:
- Implement React Query for caching
- Add service worker for offline support
- Use virtual scrolling for long lists
- Optimize images with CDN
- Implement code splitting

---

## Deployment Checklist

Before deploying:
- [ ] All environment variables set
- [ ] Firebase security rules applied
- [ ] At least 100 food items in database
- [ ] Test user account created
- [ ] All features tested on mobile
- [ ] No console errors in production build
- [ ] Analytics configured
- [ ] Privacy policy page added
- [ ] 404 page created
- [ ] Loading states on all async operations
