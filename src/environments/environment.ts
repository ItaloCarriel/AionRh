import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export const environment = {
  production: true,
  firebaseConfig: {
    projectId:"odin-tarjador",
    appId:"1:1028957958097:web:19e6b7fa8c1c2849607af0",
    storageBucket:"odin-tarjador.appspot.com",
    apiKey:"AIzaSyB_3Ow7t_XV3Rw04DIj-sBDbIfYDJhpbjc",
    authDomain:"odin-tarjador.firebaseapp.com",
    messagingSenderId:"1028957958097",
    measurementId:"G-E6FDH1WQ4X"
  }
};

firebase.initializeApp(environment.firebaseConfig);
export default firebase;
