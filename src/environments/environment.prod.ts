import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyDdpN7h4TU0vjznA2FqD5nz5qvsd4i6utQ",
  authDomain: "aionrh-df4df.firebaseapp.com",
  projectId: "aionrh-df4df",
  storageBucket: "aionrh-df4df.appspot.com",
  messagingSenderId: "186928834608",
  appId: "1:186928834608:web:b5b3825772b18b506d65f5",
  measurementId: "G-2FVLPTQ05T"
  }
};

firebase.initializeApp(environment.firebaseConfig);
export default firebase;
