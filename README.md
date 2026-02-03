# Disney Food Quest 🏰🍕

A gamified Disney park food tracking app. Track food items, earn XP, unlock badges, and compete on leaderboards!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Seed database (first time only)
node scripts/seedDatabase.js
```

## 📋 Project Overview

**Tech Stack:**
- React + Vite
- Firebase (Auth, Firestore, Storage, Hosting)
- Tailwind CSS
- React Router

**Core Features:**
- User authentication
- Browse 100+ Disney food items
- Track captured items
- XP & leveling system (1-20)
- 8 achievement badges
- Global leaderboard
- Curated "Legends" & "Hidden Gems" lists

## 📂 Project Structure

```
src/
├── components/       # React components
├── pages/           # Page components
├── context/         # Auth context
├── services/        # Firebase services
├── utils/           # Helper functions
└── data/            # Seed data
```

## 🎮 Game Mechanics

### XP System
- Snacks: 10 XP
- Desserts: 15 XP
- Meals: 25 XP
- Boss Foods: 100 XP

### Badges
1. First Bite - Capture first item
2. Park Explorer - Try all 4 parks
3. Snack Attack - 10 snacks
4. Sweet Tooth - 10 desserts
5. Meal Master - 10 meals
6. Century Club - Earn 100 XP
7. Completionist - Capture 50 items
8. Legend Hunter - Capture a Boss Food

## 📚 Documentation

- [Development Plan](DEVELOPMENT_PLAN.md) - Full feature roadmap
- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Component & service specs
- [Seed Data](SEED_DATA.md) - Food items database

## 🛠️ Development

Built with AI assistance (GitHub Copilot). See implementation guide for AI prompting tips.

### Development Phases
1. Project Setup
2. Authentication
3. Database Schema
4. Browse & Discovery
5. Food Tracking & XP
6. Badge System
7. User Profile
8. Leaderboard
9. Curated Lists
10. UI/UX Polish
11. Deployment

## 📱 Coming Soon (Post-V1)

- Mobile app version
- AR food "spirits"
- Dining Plan optimizer
- Receipt scanning
- Social features (crews, following)
- More parks (Disneyland, international)

## 📄 License

MIT

---

**Status**: In Development 🚧  
**Target Launch**: February 2026
