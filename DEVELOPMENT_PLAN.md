# Disney Food Quest - Development Plan

## Project Overview
A gamified Disney park food tracking app. Simple, stable Version 1 focused on core food tracking + basic gamification.

---

## 🎯 VERSION 1 - CORE FEATURES

### Essential Features (Must Have)
1. **User Authentication**
   - Sign up / Login
   - User profiles

2. **Food Database**
   - Pre-populated list of ~100-150 Disney park food items
   - Name, location, park, price, category, image
   - 4 parks: Magic Kingdom, EPCOT, Hollywood Studios, Animal Kingdom

3. **Food Discovery & Browsing**
   - Browse all food items
   - Filter by park
   - Filter by category (snacks, meals, desserts)
   - Search by name
   - View item details (photo, price, location, description)

4. **Food Tracking**
   - "Capture" items (mark as tried)
   - View personal collection of captured items
   - Timestamp when captured

5. **Gamification - XP & Levels**
   - Earn XP for each item captured
     - Snacks: 10 XP
     - Meals: 25 XP
     - Desserts: 15 XP
     - "Boss Foods" (special items): 100 XP
   - User level system (1-20)
   - Progress bar showing XP to next level

6. **Gamification - Badges**
   - 8 basic achievement badges:
     - First Bite (capture first item)
     - Park Explorer (try item from all 4 parks)
     - Snack Attack (10 snacks)
     - Sweet Tooth (10 desserts)
     - Meal Master (10 meals)
     - Century Club (100 XP earned)
     - Completionist (capture 50 items)
     - Legend Hunter (capture a "Boss Food")

7. **User Profile**
   - Display username, level, total XP
   - Show all earned badges
   - List of all captured items
   - Stats: total items, favorite park, total spent

8. **Leaderboard**
   - Global top 20 users by XP
   - Simple ranking display

9. **Curated Lists**
   - "Nearby Legends" section (15-20 must-try items)
   - "Hidden Gems" section (10-15 seasonal/unique items)

---

## 🛠️ TECHNICAL STACK

### Frontend
- **React** (web app) - simpler than React Native for v1
- **Vite** for build tooling
- **Tailwind CSS** for styling
- Responsive design (mobile-first, works on all devices)

### Backend & Database
- **Firebase**
  - Authentication (email/password)
  - Firestore (database)
  - Storage (images)
  - Hosting (deployment)

### Key Libraries
- React Router (navigation)
- Firebase SDK
- Lucide React (icons)

---

## 📋 DEVELOPMENT TASKS (For LLM Implementation)

### Phase 1: Project Setup
- [ ] Initialize Vite + React project
- [ ] Install and configure Tailwind CSS
- [ ] Set up Firebase project (console)
- [ ] Configure Firebase in React app
- [ ] Set up project folder structure
- [ ] Create basic routing structure (Home, Browse, Profile, Leaderboard)

### Phase 2: Authentication System
- [ ] Create Sign Up page with form
- [ ] Create Login page with form
- [ ] Implement Firebase email/password authentication
- [ ] Create authentication context/provider
- [ ] Add protected routes
- [ ] Create logout functionality
- [ ] Add basic error handling for auth

### Phase 3: Database Schema & Seed Data
- [ ] Design Firestore collections structure:
  - `users` (id, username, email, xp, level, createdAt)
  - `foodItems` (id, name, park, location, price, category, imageUrl, xp, isBossFood, description)
  - `userCaptures` (userId, foodItemId, capturedAt)
  - `userBadges` (userId, badgeId, earnedAt)
- [ ] Create seed data file with 100+ food items
- [ ] Write script to populate Firestore with seed data
- [ ] Define badge configuration (8 badges with criteria)

### Phase 4: Browse & Discovery Features
- [ ] Create FoodItem card component
- [ ] Build Browse page with grid/list view
- [ ] Implement park filter dropdown
- [ ] Implement category filter dropdown
- [ ] Add search bar with real-time filtering
- [ ] Create FoodItem detail modal/page
- [ ] Add "Capture" button on each item
- [ ] Show capture status (already captured vs not)

### Phase 5: Food Tracking & XP System
- [ ] Implement capture functionality (add to userCaptures)
- [ ] Calculate and award XP on capture
- [ ] Update user XP and level in Firestore
- [ ] Create XP calculation logic (check food category)
- [ ] Implement level-up algorithm (XP thresholds)
- [ ] Prevent duplicate captures of same item
- [ ] Add capture confirmation feedback (toast/modal)

### Phase 6: Badge System
- [ ] Define badge criteria logic
- [ ] Check badge criteria after each capture
- [ ] Auto-award badges when criteria met
- [ ] Create Badge component (visual display)
- [ ] Add badge notification on earn
- [ ] Display badges on profile (locked vs unlocked states)

### Phase 7: User Profile Page
- [ ] Create Profile page layout
- [ ] Display user stats (level, XP, progress bar)
- [ ] Show earned badges grid
- [ ] List all captured items
- [ ] Calculate and display stats:
  - Total items captured
  - Favorite park (most captures)
  - Total money spent (sum of prices)
- [ ] Add visual progress indicators

### Phase 8: Leaderboard
- [ ] Create Leaderboard page
- [ ] Fetch top 20 users by XP from Firestore
- [ ] Display ranked list with:
  - Rank number
  - Username
  - Level
  - Total XP
- [ ] Highlight current user if in top 20
- [ ] Add real-time updates (optional)

### Phase 9: Curated Lists
- [ ] Tag 15-20 items as "Nearby Legends" in seed data
- [ ] Tag 10-15 items as "Hidden Gems" in seed data
- [ ] Create "Nearby Legends" section on homepage
- [ ] Create "Hidden Gems" section on homepage
- [ ] Add special visual indicators for these items

### Phase 10: UI/UX Polish
- [ ] Design and implement navigation bar
- [ ] Create homepage/landing page
- [ ] Add loading states for all data fetches
- [ ] Add empty states (no captures yet, etc.)
- [ ] Implement error boundaries
- [ ] Add responsive design for mobile
- [ ] Create consistent color scheme (Disney-themed)
- [ ] Add animations for level-ups and badge unlocks
- [ ] Test all user flows

### Phase 11: Deployment & Launch Prep
- [ ] Set up Firebase Hosting
- [ ] Configure production environment variables
- [ ] Build production version
- [ ] Deploy to Firebase Hosting
- [ ] Test production deployment
- [ ] Set up basic analytics (Firebase Analytics)
- [ ] Create simple onboarding/welcome screen
- [ ] Add basic privacy policy and terms pages

---

## 📂 SUGGESTED FILE STRUCTURE

```
disneysnacktracker/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── FoodCard.jsx
│   │   ├── FoodDetail.jsx
│   │   ├── Badge.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── Profile.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── firebase.js
│   │   ├── auth.js
│   │   ├── foodService.js
│   │   └── userService.js
│   ├── utils/
│   │   ├── xpCalculator.js
│   │   ├── badgeChecker.js
│   │   └── constants.js
│   ├── data/
│   │   └── seedData.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎮 XP & LEVELING SYSTEM

### XP Values
- Snacks: 10 XP
- Desserts: 15 XP
- Meals: 25 XP
- Boss Foods: 100 XP

### Level Thresholds (XP Required)
- Level 1: 0 XP
- Level 2: 50 XP
- Level 3: 120 XP
- Level 4: 210 XP
- Level 5: 320 XP
- Level 10: 1,200 XP
- Level 15: 3,000 XP
- Level 20: 5,500 XP

Formula: `XP_needed = level * 50 + (level - 1) * 20`

---

## 🏆 BADGE DEFINITIONS

1. **First Bite** - Capture your first item
2. **Park Explorer** - Capture at least 1 item from all 4 parks
3. **Snack Attack** - Capture 10 snacks
4. **Sweet Tooth** - Capture 10 desserts
5. **Meal Master** - Capture 10 meals
6. **Century Club** - Earn 100 total XP
7. **Completionist** - Capture 50 different items
8. **Legend Hunter** - Capture a "Boss Food"

---

## 📊 DATABASE SCHEMA EXAMPLES

### Food Item Document
```json
{
  "id": "dole-whip-mk",
  "name": "Dole Whip",
  "park": "Magic Kingdom",
  "location": "Aloha Isle - Adventureland",
  "price": 5.99,
  "category": "snacks",
  "description": "Iconic pineapple soft-serve",
  "imageUrl": "/images/dole-whip.jpg",
  "xp": 10,
  "isBossFood": false,
  "isLegend": true,
  "isHiddenGem": false
}
```

### User Document
```json
{
  "id": "user123",
  "username": "DisneyFoodie",
  "email": "user@example.com",
  "xp": 245,
  "level": 5,
  "createdAt": "2026-02-03T10:00:00Z"
}
```

### User Capture Document
```json
{
  "userId": "user123",
  "foodItemId": "dole-whip-mk",
  "capturedAt": "2026-02-03T14:30:00Z"
}
```

---

## 🚀 LAUNCH CRITERIA

Version 1 is ready to launch when:
- [ ] All 11 development phases complete
- [ ] 100+ food items in database
- [ ] All core features functional
- [ ] No critical bugs
- [ ] Responsive on mobile and desktop
- [ ] Deployed to production URL
- [ ] 5+ test users successfully complete full flow
- [ ] Basic analytics tracking active

---

## 🔮 POST-V1 ROADMAP (Future Versions)

**Version 1.1** - Social Features
- User-to-user following
- Activity feed
- Share captures to social media

**Version 1.2** - Advanced Discovery
- Map view of food locations
- Filter by dietary restrictions
- Price range filtering

**Version 2.0** - Premium Features
- Dining Plan optimizer
- Receipt scanning
- More parks (Disneyland, etc.)
- AR food spirits

---

## ✅ SUCCESS METRICS (V1)

- 100+ users in first month
- 1,000+ food captures total
- 4+ star rating from users
- Average 3+ items captured per user
- Zero critical bugs post-launch

---

**Target Launch**: February 2026  
**Status**: Ready to build 🚀
