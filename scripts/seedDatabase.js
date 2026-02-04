import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { foodItems } from '../src/data/seedData.js';

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  console.error(
    'Missing GOOGLE_APPLICATION_CREDENTIALS. Set it to the path of your Firebase service account JSON.'
  );
  process.exit(1);
}

try {
  initializeApp({
    credential: cert(serviceAccountPath),
  });
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error);
  process.exit(1);
}

const db = getFirestore();

async function seedFoodItems() {
  try {
    const batch = db.batch();

    foodItems.forEach((item) => {
      const docRef = db.collection('foodItems').doc(item.id);
      batch.set(docRef, item, { merge: true });
    });

    console.log(`Uploading ${foodItems.length} food items...`);
    await batch.commit();
    console.log('✅ Seed complete!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedFoodItems();
