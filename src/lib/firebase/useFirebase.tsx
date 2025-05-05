"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "./config";

type FirebaseDocumentData = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | FirebaseDocumentData
    | FirebaseDocumentData[];
};

interface FirebaseDocument {
  id: string;
  data: FirebaseDocumentData;
}

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  getDocument: (
    collectionName: string,
    id: string
  ) => Promise<FirebaseDocument | null>;
  getCollection: (
    collectionName: string
  ) => Promise<Array<{ id: string } & DocumentData>>;
  addDocument: (collectionName: string, data: DocumentData) => Promise<string>;
  updateDocument: (
    collectionName: string,
    id: string,
    data: DocumentData
  ) => Promise<void>;
  deleteDocument: (collectionName: string, id: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      // First check if any admin exists
      const admins = await getCollection("admins");
      if (admins.length > 0) {
        throw new Error("Admin user already exists. Please log in instead.");
      }

      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user to admins collection
      await setDoc(doc(db, "admins", user.uid), {
        email: user.email,
        role: "admin",
        createdAt: new Date().toISOString(),
      });

      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  const getDocument = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, data: docSnap.data() as FirebaseDocumentData };
      }
      return null;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  };

  const getCollection = async (collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id, // This is the Firestore document ID
          ...data
        };
      });
    } catch (error) {
      console.error('Error getting collection:', error);
      throw error;
    }
  };

  const addDocument = async (collectionName: string, data: DocumentData) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  const updateDocument = async (
    collectionName: string,
    id: string,
    data: DocumentData
  ) => {
    try {
     
      const docRef = doc(db, collectionName, id);
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data format for update");
      }

      const cleanData: DocumentData = {};

      for (const [key, value] of Object.entries(data)) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          cleanData[key] = {};
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            cleanData[key][nestedKey] =
              nestedValue === undefined ? null : nestedValue;
          }
        } else {
          cleanData[key] = value === undefined ? null : value;
        }
      }

      await updateDoc(docRef, cleanData);
    } catch (error) {
      console.error("❌ Error updating document:", error);
      throw error;
    }
  };

  const deleteDocument = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    getDocument,
    getCollection,
    addDocument,
    updateDocument,
    deleteDocument,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase(): FirebaseContextType {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
