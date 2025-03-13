import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Import signOut only here
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFaDW-uKEOg3za9BGchN9Zi0_pf3Zxhr0",
  authDomain: "mobzwaywebtodoapp.firebaseapp.com",
  projectId: "mobzwaywebtodoapp",
  storageBucket: "mobzwaywebtodoapp.firebasestorage.app",
  messagingSenderId: "413902938929",
  appId: "1:413902938929:web:5ce3bebb86b559f5b88610",
  measurementId: "G-NDN6B6TJRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

// Authentication Functions
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (e) {
    console.error("Login failed:", e);
    throw new Error("Login failed: " + e.message);
  }
};

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (e) {
    console.error("Sign-up failed:", e);
    throw new Error("Sign-up failed: " + e.message);
  }
};

// Sign out the user (no need to redeclare signOut here)
export const logoutUser = async () => {
  try {
    await signOut(auth);  // Simply call the signOut function directly from Firebase
    console.log("User signed out successfully");
  } catch (e) {
    console.error("Sign-out failed:", e);
    throw new Error("Sign-out failed: " + e.message);
  }
};

// Firestore functions for managing tasks

// Add a new task
export const addTask = async (task) => {
  try {
    const { title, description, dueDate, priority } = task;
    if (!title || !description || !dueDate || !priority) {
      throw new Error("Missing required task fields.");
    }

    if (isNaN(Date.parse(dueDate))) {
      throw new Error("Invalid due date.");
    }

    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(priority)) {
      throw new Error(`Invalid priority. Allowed values are: ${validPriorities.join(", ")}`);
    }

    const docRef = await addDoc(collection(db, "tasks"), task);
    console.log("Task added with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding task: ", e);
    throw new Error("Error adding task: " + e.message);
  }
};

// Fetch all tasks
export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  } catch (e) {
    console.error("Error fetching tasks: ", e);
    throw new Error("Error fetching tasks: " + e.message);
  }
};

// Update a task
export const updateTask = async (taskId, updatedData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
    console.log("Task updated with ID: ", taskId);
  } catch (e) {
    console.error("Error updating task: ", e);
    throw new Error("Error updating task: " + e.message);
  }
};
