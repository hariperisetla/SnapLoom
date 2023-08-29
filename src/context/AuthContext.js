"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, storage, db } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageData, setImageData] = useState([]);
  const googleProvider = new GoogleAuthProvider();

  function googleLogin() {
    return signInWithPopup(auth, googleProvider);
  }

  function logout() {
    return signOut(auth);
  }

  const uploadImage = async (userId, file, metadata) => {
    const storageRef = ref(storage, `users/${userId}/${file.name}`);

    uploadBytes(storageRef, file).then((snapShot) => {
      // Get the download URL of the uploaded image
      getDownloadURL(storageRef).then(async (url) => {
        // Store the image metadata in Firestore
        try {
          const docRef = await addDoc(collection(db, "images"), {
            userId,
            imageUrl: url,
            metadata,
            // Add other metadata here if needed
          });
          console.log("Image uploaded with ID: ", docRef.id);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      });
    });
  };

  const fetchImageData = async () => {
    const imagesCollectionRef = collection(db, "images");
    const querySnapshot = await getDocs(imagesCollectionRef);

    const data = [];

    for (const doc of querySnapshot.docs) {
      const { imageUrl, metadata } = doc.data();

      // Get the download URL of the image from the Storage
      const storageRef = ref(getStorage(), imageUrl);
      const downloadURL = await getDownloadURL(storageRef);

      data.push({
        imageUrl: downloadURL,
        metadata: metadata || {},
        id: doc.id,
      });
    }

    setImageData(data);
  };

  useEffect(() => {
    fetchImageData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(user !== null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleLogin,
    logout,
    isAuthenticated,
    uploadImage,
    imageData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
