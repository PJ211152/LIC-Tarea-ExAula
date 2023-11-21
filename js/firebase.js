// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {getFirestore,collection, addDoc, getDocs,getCountFromServer, deleteDoc, 
    doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjI5q4pmUiXApHka5qzK4y0C_FUT9Id84",
  authDomain: "fase-final-lic.firebaseapp.com",
  projectId: "fase-final-lic",
  storageBucket: "fase-final-lic.appspot.com",
  messagingSenderId: "80641344413",
  appId: "1:80641344413:web:3540812b30052e97d4e574"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore();

export const saveProduct=(product, table)=>{
    addDoc(collection(db,'tarifas'),product);
  }

  export const getProducts=(table)=>getDocs(collection(db,table))

  export const getProduct=(id,table)=>getDoc(doc(db,table,id))

  export const getProductListSize=async(table)=>{
    const products = collection(db, table);
    const snapshot = await getCountFromServer(products);
    return snapshot.data().count;
  }

export const deleteProduct=(id,table)=> deleteDoc(doc(db,table,id));

export const updateProduct=(id, newFields,table)=>updateDoc(doc(db,table,id), newFields);