# Setup Guide - Disney Food Quest

## Pre-Development Checklist

### 1. GitHub Repository Setup
```bash
# Initialize git (if not already done)
git init

# Create .gitignore
# Add: node_modules, .env, dist, .DS_Store, firebase-debug.log

# Create GitHub repo and push
git add .
git commit -m "Initial commit with development plan"
git remote add origin https://github.com/YOUR_USERNAME/disney-food-quest.git
git push -u origin main
```

### 2. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project: "disney-food-quest"
3. Enable Authentication → Email/Password provider
4. Create Firestore Database (start in test mode for now)
5. Enable Firebase Storage
6. Get Firebase config credentials
7. Copy config to `.env` file

### 3. Environment Variables
Create `.env` file in project root:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Initial Project Setup Commands
```bash
# Create Vite + React project
npm create vite@latest . -- --template react

# Install core dependencies
npm install firebase react-router-dom

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional libraries
npm install lucide-react react-hot-toast
```

### 5. VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Firebase Explorer
- GitHub Copilot (already installed)
- Prettier - Code formatter
- ESLint

### 6. GitHub Copilot Optimization
To get better suggestions from Copilot:
- Keep detailed comments in code
- Use descriptive variable/function names
- Reference the IMPLEMENTATION_GUIDE.md in comments
- Open related files in tabs for context
- Use inline chat for specific implementations

---

## Development Workflow

### Phase-by-Phase Approach
1. **Read the phase tasks** from DEVELOPMENT_PLAN.md
2. **Review specifications** in IMPLEMENTATION_GUIDE.md
3. **Open relevant files** in VS Code for context
4. **Use Copilot chat** to generate code with context
5. **Test thoroughly** before moving to next phase
6. **Commit frequently** with clear messages

### Git Commit Strategy
```bash
# After each completed task/component
git add .
git commit -m "feat: implement [specific feature]"

# After each phase
git commit -m "feat: complete Phase X - [phase name]"
git push

# Create tags for major milestones
git tag v0.1.0 -m "Auth system complete"
git push --tags
```

### Testing Checklist (Per Phase)
- [ ] Component renders without errors
- [ ] All props/data display correctly
- [ ] User interactions work as expected
- [ ] Mobile responsive (test in browser dev tools)
- [ ] No console errors
- [ ] Firebase operations succeed
- [ ] Loading states show appropriately

---

## Quick Start After Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal - populate database
node scripts/seedDatabase.js

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

---

## Troubleshooting

### Common Issues

**Firebase connection fails**
- Check .env variables are correct
- Ensure Firebase project has correct settings
- Verify API key hasn't been restricted

**Tailwind styles not working**
- Ensure tailwind.config.js content paths are correct
- Check tailwind directives in index.css
- Restart dev server

**Copilot not giving good suggestions**
- Open more context files in tabs
- Add detailed comments explaining what you need
- Reference type definitions and interfaces
- Use Copilot chat with specific prompts

**Build errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for missing dependencies
- Verify all imports are correct

---

## Next Steps

1. ✅ Complete this setup guide
2. ✅ Run `npm create vite@latest`
3. ✅ Set up Firebase project
4. ✅ Install all dependencies
5. ✅ Review IMPLEMENTATION_GUIDE.md
6. ✅ Review SEED_DATA.md
7. ✅ Start Phase 1: Project Setup
