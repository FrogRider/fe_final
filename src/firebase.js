import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBufk53Rj38AxhfcinuS3KejSBSHRosd20',
  authDomain: 'food-delivery-data-20bc2.firebaseapp.com',
  databaseURL: 'https://food-delivery-data-20bc2.firebaseio.com',
  projectId: 'food-delivery-data-20bc2',
  storageBucket: 'food-delivery-data-20bc2.appspot.com',
  messagingSenderId: '137436009177'
};

firebase.initializeApp(config);
export default firebase;