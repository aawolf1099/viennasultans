import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const teamMembers = [
  {
    id: 1,
    name: "Micheal Subhan",
    role: "Captain",
    image: "/images/mas.jpg",
    stats: { matches: 45, runs: 1200, wickets: 15 },
  },
  {
    id: 2,
    name: "Tauqir Asif",
    role: "Vice Captain",
    image: "/images/tk.jpg",
    stats: { matches: 38, runs: 950, wickets: 25 },
  },
  {
    id: 3,
    name: "Hammad Rana",
    role: "Left Arm Off Break",
    image: "/images/hammad.jpg",
    stats: { matches: 42, runs: 500, wickets: 105 },
  },
  {
    id: 4,
    name: "Asad Ullah",
    role: "All Rounder",
    image: "/images/asad.jpg",
    stats: { matches: 45, runs: 1800, wickets: 80 },
  },
  {
    id: 5,
    name: "Abdul Moid",
    role: "All Rounder",
    image: "/images/moid.jpg",
    stats: { matches: 43, runs: 1400, wickets: 90 },
  },
  {
    id: 6,
    name: "Zubair Khan",
    role: "Wicket Keeper Batsman",
    image: "/images/zubi.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 7,
    name: "Ghulam Muhammad",
    role: "Right Hand Batsman",
    image: "/images/gm.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 8,
    name: "Samandar Khan",
    role: "Right Arm Fast Bowler",
    image: "/images/samandar.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 9,
    name: "Adal Bakhteyar",
    role: "Right Arm Fast Bowler",
    image: "/images/adal.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
  {
    id: 10,
    name: "Farasat Ali",
    role: "Right Hand Batsman",
    image: "/images/farasat.jpg",
    stats: { matches: 32, runs: 1000, wickets: 0 },
  },
];

async function createPlayers() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    // Sign in with admin credentials
    await signInWithEmailAndPassword(
      auth,
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!
    );

    // Add players to Firestore
    const playersCollection = collection(db, "players");

    for (const player of teamMembers) {
      await addDoc(playersCollection, player);
      console.log(`Added player: ${player.name}`);
    }

    console.log("All players added successfully!");
  } catch (error) {
    console.error("Error creating players:", error);
  }
}

createPlayers();
