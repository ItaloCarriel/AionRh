import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCDnQ5GIigYKgBM32rm4ZS_pPswZVmi4NM",
    authDomain: "aionrh-d3b0e.firebaseapp.com",
    projectId: "aionrh-d3b0e",
    storageBucket: "aionrh-d3b0e.appspot.com",
    messagingSenderId: "335423905692",
    appId: "1:335423905692:web:311815b57b36fa3f88f259",
    measurementId: "G-D0Z6EZMJZG"
  }
};

firebase.initializeApp(environment.firebaseConfig);
export default firebase;
