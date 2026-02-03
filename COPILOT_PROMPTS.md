# GitHub Copilot Prompts Guide

## Purpose
This file contains optimized prompts for GitHub Copilot to implement each phase of the Disney Food Quest app. Copy and use these in Copilot Chat.

---

## Phase 1: Project Setup

### Prompt 1: Initialize Project
```
I'm building a Disney food tracking app with React + Vite + Firebase + Tailwind CSS.

Initialize a new Vite React project with:
- TypeScript configuration removed (using JS)
- Tailwind CSS configured
- React Router DOM installed
- Basic folder structure: src/components, src/pages, src/services, src/context, src/utils, src/data

Show me the commands to run and initial file structure.
```

### Prompt 2: Configure Tailwind
```
Configure Tailwind CSS for a Disney-themed app with these custom colors:
- disney-blue: #0063B2
- disney-purple: #6B4E9C
- disney-yellow: #FFD700
- disney-red: #E4002B

Update tailwind.config.js and show me the required content configuration for Vite + React.
Also create the index.css with Tailwind directives.
```

### Prompt 3: Firebase Setup
```
Create a Firebase configuration file at src/services/firebase.js that:
- Imports and initializes Firebase
- Gets credentials from environment variables (VITE_ prefix)
- Exports: db (Firestore), auth, storage
- Includes error handling

Also show me the .env template with all required Firebase variables.
```

---

## Phase 2: Authentication

### Prompt 1: Auth Service
```
Create src/services/auth.js with these functions:
- signUp(email, password, username) - creates auth user and Firestore user document
- signIn(email, password) - returns user
- signOut() - logs out user
- getCurrentUser() - returns current user or null

Use Firebase Auth and Firestore. Include proper error handling and JSDoc comments.
```

### Prompt 2: Auth Context
```
Create src/context/AuthContext.jsx that:
- Provides authentication state to the app
- Uses Firebase onAuthStateChanged listener
- Exports: currentUser, loading, signUp, signIn, signOut
- Persists auth state across refreshes
- Shows loading state while checking auth

Include the AuthProvider wrapper component.
```

### Prompt 3: Login Page
```
Create src/pages/Login.jsx with:
- Email and password form fields
- Submit button
- Link to signup page
- Error message display
- Uses AuthContext for signIn
- Redirects to home on success
- Tailwind CSS styling (Disney theme)
- Loading state during submission
```

### Prompt 4: Signup Page
```
Create src/pages/Signup.jsx with:
- Username, email, password, confirm password fields
- Form validation (password match, email format)
- Submit button
- Link to login page
- Uses AuthContext for signUp
- Error message display
- Redirects to home on success
- Tailwind CSS styling matching Login page
```

### Prompt 5: Protected Route
```
Create src/components/ProtectedRoute.jsx that:
- Checks if user is authenticated
- Redirects to /login if not authenticated
- Renders children if authenticated
- Uses AuthContext
- Shows loading spinner while checking auth
```

---

## Phase 3: Database Schema

### Prompt 1: Seed Data Structure
```
Create src/data/seedData.js with an array of 10 sample Disney food items.

Each item should have:
- id (string, kebab-case)
- name (string)
- park (string: Magic Kingdom, EPCOT, Hollywood Studios, or Animal Kingdom)
- location (string: specific location in park)
- price (number)
- category (string: snacks, meals, or desserts)
- imageUrl (string: placeholder URL)
- xp (number: 10 for snacks, 15 for desserts, 25 for meals)
- isBossFood (boolean)
- isLegend (boolean)
- isHiddenGem (boolean)
- description (string)

Include variety: 1 Boss Food, 3 Legends, 2 Hidden Gems, mix of categories and parks.
```

### Prompt 2: Database Seeding Script
```
Create scripts/seedDatabase.js that:
- Imports seed data from src/data/seedData.js
- Connects to Firestore using Firebase Admin SDK
- Uploads all food items to 'foodItems' collection
- Uses batch writes for efficiency
- Shows progress during upload
- Includes error handling
- Can be run with: node scripts/seedDatabase.js

Show me what dependencies to install and how to set up Firebase Admin credentials.
```

### Prompt 3: Badge Definitions
```
Create src/utils/constants.js with:
- PARKS array (4 parks)
- CATEGORIES array (snacks, meals, desserts)
- XP_VALUES object
- BADGES array with all 8 badges, each having:
  - id (string)
  - name (string)
  - description (string)
  - icon (emoji)
  - criteria (object describing unlock requirements)

Reference the badge list from DEVELOPMENT_PLAN.md
```

---

## Phase 4: Browse & Discovery

### Prompt 1: Food Service
```
Create src/services/foodService.js with these Firestore query functions:
- getAllFoodItems() - returns all food items sorted by name
- getFoodItemById(id) - returns single item
- getFoodItemsByPark(parkName) - filtered by park
- getFoodItemsByCategory(category) - filtered by category
- searchFoodItems(query) - searches name and description
- getLegends() - where isLegend === true
- getHiddenGems() - where isHiddenGem === true

Include error handling and JSDoc. Return data with IDs included.
```

### Prompt 2: Food Card Component
```
Create src/components/FoodCard.jsx that displays a food item card with:
- Food image (with fallback if missing)
- Food name
- Price (formatted as currency)
- Location
- Special badges (Boss Food, Legend, Hidden Gem icons)
- XP value indicator
- "Captured" checkmark or "Capture" button based on isCaptured prop
- Click handler for viewing details
- Tailwind CSS card styling (shadow, rounded, hover effect)

Props: foodItem (object), isCaptured (boolean), onCapture (function), onClick (function)
```

### Prompt 3: Browse Page
```
Create src/pages/Browse.jsx that:
- Fetches all food items on mount
- Shows search input with real-time filtering
- Park filter dropdown (All, Magic Kingdom, EPCOT, etc.)
- Category filter dropdown (All, Snacks, Meals, Desserts)
- Grid of FoodCard components
- Loading state while fetching
- Empty state if no results
- Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)

Uses foodService and includes proper state management.
```

### Prompt 4: Food Detail Modal
```
Create src/components/FoodDetail.jsx that shows expanded food details:
- Full-screen modal overlay
- Large food image
- Complete description
- All details (park, location, price, XP, category)
- Special indicator badges (stacked horizontally)
- Capture button (disabled if already captured)
- Close button (X in corner)
- Click outside to close
- Escape key to close
- Tailwind styling with backdrop blur

Props: foodItem, isCaptured, onCapture, onClose, isOpen
```

---

## Phase 5: Food Tracking & XP

### Prompt 1: XP Calculator Utility
```
Create src/utils/xpCalculator.js with:
- calculateXP(category, isBossFood) - returns XP value
- calculateLevel(totalXP) - returns level (1-20)
- getXPForLevel(level) - returns XP needed to reach that level
- getXPToNextLevel(currentXP) - returns XP needed for next level
- getLevelProgress(currentXP) - returns { level, currentLevelXP, nextLevelXP, percentage }

Use formula: XP_needed = level * 50 + (level - 1) * 20

Include unit test examples in comments.
```

### Prompt 2: User Service
```
Create src/services/userService.js with:
- getUserProfile(userId) - gets user document
- createUserProfile(userId, username, email) - creates new user doc
- updateUserXP(userId, xpToAdd) - adds XP and recalculates level
- getUserCaptures(userId) - returns array of captured food item IDs
- captureFood(userId, foodItemId) - creates capture record, awards XP
- hasCaptured(userId, foodItemId) - returns boolean
- getUserStats(userId) - calculates total items, favorite park, total spent

Use Firestore transactions where needed for data consistency.
```

### Prompt 3: Capture Functionality
```
Implement the capture button click handler logic that:
1. Checks if already captured (prevent duplicates)
2. Calls userService.captureFood(userId, foodItemId)
3. Updates local state to show as captured
4. Shows success toast notification with XP earned
5. Checks if user leveled up and shows celebration
6. Handles errors gracefully
7. Disables button during submission

Use react-hot-toast for notifications. Include loading state.
```

---

## Phase 6: Badge System

### Prompt 1: Badge Checker Utility
```
Create src/utils/badgeChecker.js with:
- checkAllBadges(userId) - checks all badge criteria and awards new ones
- checkBadge(badgeId, userData, captures) - checks single badge criteria
- getBadgeDefinitions() - returns all 8 badges
- hasBadge(userBadges, badgeId) - returns boolean

Badge criteria logic:
- First Bite: captures.length >= 1
- Park Explorer: unique parks in captures >= 4
- Snack Attack: snack captures >= 10
- Sweet Tooth: dessert captures >= 10
- Meal Master: meal captures >= 10
- Century Club: totalXP >= 100
- Completionist: captures.length >= 50
- Legend Hunter: has at least 1 Boss Food capture

Return array of newly earned badge IDs.
```

### Prompt 2: Badge Service
```
Add to src/services/userService.js:
- getUserBadges(userId) - returns array of earned badges with timestamps
- awardBadge(userId, badgeId) - creates badge record
- checkAndAwardBadges(userId) - checks criteria and awards new badges

After each food capture, automatically check and award new badges.
Include badge earned notification.
```

### Prompt 3: Badge Component
```
Create src/components/Badge.jsx that displays a single badge:
- Badge icon (emoji or image)
- Badge name
- Description (shown on hover tooltip)
- Locked state (grayed out, with lock icon)
- Unlocked state (full color, earned date)
- Shimmer animation when unlocked
- Tailwind CSS styling

Props: badge (object), isEarned (boolean), earnedDate (timestamp or null)
```

---

## Phase 7: User Profile

### Prompt 1: Progress Bar Component
```
Create src/components/ProgressBar.jsx that shows visual progress:
- Filled bar showing percentage
- Label above or inside bar
- Current/max values displayed
- Smooth animation on value change
- Color variants (blue for XP, yellow for achievements)
- Tailwind CSS with gradient fill

Props: current (number), max (number), label (string), color (string)
```

### Prompt 2: Profile Page
```
Create src/pages/Profile.jsx with sections:
1. User header (username, level, total XP)
2. Progress bar to next level
3. Stats cards grid:
   - Total items captured
   - Favorite park (most captures)
   - Total money spent
   - Current streak (if applicable)
4. Badge showcase (3x3 grid, locked/unlocked)
5. Captured items list (scrollable)
6. Logout button

Fetch user data, captures, and badges on mount. Show loading state.
Mobile responsive layout.
```

---

## Phase 8: Leaderboard

### Prompt 1: Leaderboard Page
```
Create src/pages/Leaderboard.jsx that:
- Fetches top 20 users by XP from Firestore
- Displays ranked list with:
  - Rank number (1-20)
  - Username
  - Level badge
  - Total XP
- Highlights current user if in top 20 (gold background)
- Shows current user's rank even if outside top 20
- Refresh button
- Podium display for top 3 (special styling)
- Loading skeleton while fetching
- Real-time updates (optional)

Responsive table/card layout.
```

---

## Phase 9: Curated Lists

### Prompt 1: Home Page
```
Create src/pages/Home.jsx with sections:
1. Hero section:
   - App logo/title
   - Tagline: "Track, Capture, Level Up!"
   - CTA button (Browse or Sign Up)
2. "Nearby Legends" carousel:
   - Horizontal scrollable FoodCard components
   - Shows isLegend === true items
   - Snap scroll behavior
3. "Hidden Gems" grid:
   - 2-3 columns
   - Shows isHiddenGem === true items
4. Quick stats:
   - Total food items available
   - Total captures by all users
   - Active users today
5. Footer with links

Fetch data on mount. Fully responsive.
```

---

## Phase 10: UI/UX Polish

### Prompt 1: Navigation Bar
```
Create src/components/Navbar.jsx with:
- App logo/name on left
- Navigation links: Home, Browse, Profile, Leaderboard
- User menu on right:
  - If not authenticated: Login/Signup buttons
  - If authenticated: User avatar, username, level, logout dropdown
- Mobile hamburger menu
- Active link highlighting
- Sticky positioning
- Tailwind CSS with Disney colors
- Responsive (desktop nav, mobile drawer)
```

### Prompt 2: Loading States
```
Create src/components/LoadingSpinner.jsx and LoadingCard.jsx:
- LoadingSpinner: Animated spinner with Disney colors
- LoadingCard: Skeleton card matching FoodCard layout
- Use Tailwind animations
- Props for size variants

Then add loading states to all pages and data fetching operations.
```

### Prompt 3: Error Boundary
```
Create src/components/ErrorBoundary.jsx that:
- Catches React errors
- Shows friendly error message
- Offers "Reload" button
- Logs error to console
- Disney-themed error illustration
- Prevents full app crash

Wrap entire app in App.jsx
```

### Prompt 4: Toast Notifications
```
Set up react-hot-toast with custom styling:
- Success toasts: green with checkmark
- Error toasts: red with X
- Level up toasts: gold with celebration emoji
- Badge earned toasts: purple with badge icon
- Position: top-right on desktop, top-center on mobile
- Custom animations

Create toast utility functions for common messages.
```

---

## Phase 11: Deployment

### Prompt 1: Build Configuration
```
Update vite.config.js for production build:
- Optimize chunk sizes
- Configure base path for Firebase Hosting
- Enable build analysis
- Set up environment variable handling
- Configure asset optimization

Show build command and output analysis.
```

### Prompt 2: Firebase Deployment
```
Set up Firebase Hosting:
1. Install firebase-tools
2. Initialize Firebase hosting in project
3. Configure firebase.json with:
   - Public directory (dist)
   - Single-page app rewrites
   - Cache headers
4. Create deployment script in package.json
5. Show deployment commands

Also set up Firebase Security Rules for Firestore (reference IMPLEMENTATION_GUIDE.md)
```

### Prompt 3: Privacy & Terms Pages
```
Create simple placeholder pages:
- src/pages/Privacy.jsx - Basic privacy policy
- src/pages/Terms.jsx - Basic terms of service
- src/pages/NotFound.jsx - 404 page

Add routes in App.jsx. Include back to home link.
Simple, readable layout.
```

---

## Debugging Prompts

### When encountering errors:
```
I'm getting this error: [paste error]

In this file: [filename]
When: [describe what triggers the error]

Expected behavior: [what should happen]
Current behavior: [what actually happens]

Relevant code: [paste code snippet]

Help me debug and fix this issue.
```

### For optimization:
```
This component/page is slow: [component name]
It needs to: [describe current behavior]

Suggest optimizations for:
- Reducing re-renders
- Memoizing expensive calculations
- Optimizing Firestore queries
- Improving load time

Current code: [paste code]
```

---

## Tips for Using These Prompts

1. **Open context files first**: Before running a prompt, open IMPLEMENTATION_GUIDE.md and related files in VS Code tabs
2. **One phase at a time**: Complete and test each phase before moving to the next
3. **Modify prompts**: Add specific requirements or constraints as needed
4. **Follow up**: Ask Copilot to explain, add features, or fix issues
5. **Test immediately**: Run and test generated code right away
6. **Commit often**: Commit after each working component/feature

---

## Post-Implementation Prompts

### For adding new features:
```
I want to add [feature name] that [describe functionality].

It should:
- [requirement 1]
- [requirement 2]

Reference the existing code structure in:
- [list related files]

Maintain consistency with current styling and patterns.
```

### For refactoring:
```
Refactor [filename] to:
- [improvement 1]
- [improvement 2]

Keep the same functionality but improve:
- Code organization
- Performance
- Readability
- Type safety

Current code: [paste code]
```
