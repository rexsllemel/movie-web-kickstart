import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAnV8-wcplsL_4qNNRzDUagRwSP-7OjXX4',
  authDomain: 'toplaymovies-download-tracker.firebaseapp.com',
  projectId: 'toplaymovies-download-tracker',
  storageBucket: 'toplaymovies-download-tracker.firebasestorage.app',
  messagingSenderId: '321163919714',
  appId: '1:321163919714:web:79806f2735d4721703ec3b',
  measurementId: 'G-4HW4NVQRD7',
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
