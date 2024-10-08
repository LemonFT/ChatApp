import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCa2LrvIxmBDsqW6Ax5jLKbBKanJ-1jXNk",
  authDomain: "authfacebyfirebase.firebaseapp.com",
  projectId: "authfacebyfirebase",
  storageBucket: "authfacebyfirebase.appspot.com",
  messagingSenderId: "1078978937864",
  appId: "1:1078978937864:web:9a07a1985b4200855cfdbd",
  measurementId: "G-BBQW8JMLZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default firebase;
const storage = getStorage(app);


// sign in google
export const signInGG = async () => {
  try {
    const rs = await signInWithPopup(auth, provider);
    const userData = {
      email: rs.user.email,
      username: rs.user.displayName,
      password: rs.user.uid,
    };
    return userData;
  } catch (error) {
    alert("Kiểm tra kết nối mạng")
  }
};


// upload image 
export const handleImageUploadFb = async (e: any) => {
  const file = e.target.files[0];
  let url = "education/file/" + new Date().getMilliseconds();
  if (file) {
    const storageRef = ref(storage, url);
    try {
      await uploadBytes(storageRef, file);
      url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return "error"
    }
  }
  return "error"
}
// delete image
export const handleDeleteImageFb = async (fileName: any) => {
  try {
    await deleteObject(ref(storage, fileName));
    return true;
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
    return false;
  }
};