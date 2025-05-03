import { db, auth, storage } from './config';
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

export const useFirebase = () => {
  // Firestore operations
  const getCollection = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  const getDocument = async (collectionName: string, docId: string) => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  };

  const addDocument = async (collectionName: string, data: DocumentData) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  };

  const updateDocument = async (collectionName: string, docId: string, data: DocumentData) => {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  };

  const deleteDocument = async (collectionName: string, docId: string) => {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  };

  const queryDocuments = async (
    collectionName: string,
    constraints: QueryConstraint[]
  ) => {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  // Authentication operations
  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Storage operations
  const uploadFile = async (path: string, file: File) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const deleteFile = async (path: string) => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  };

  return {
    // Firestore
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
    // Auth
    signUp,
    signIn,
    logout,
    // Storage
    uploadFile,
    deleteFile,
    // Current user
    currentUser: auth.currentUser,
  };
}; 