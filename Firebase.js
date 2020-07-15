//firebase setup
import * as firebase from 'firebase/app';
// import 'firebase/analytics';
import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyABE5CrAEQivDkyppNM3f_2iw13IiV053c',
	authDomain: 'loundr-fced9.firebaseapp.com',
	databaseURL: 'https://loundr-fced9.firebaseio.com',
	projectId: 'loundr-fced9',
	storageBucket: 'loundr-fced9.appspot.com',
	messagingSenderId: '28905429703',
	appId: '1:28905429703:web:1cc5160bd2b907759d3ce2',
	measurementId: 'G-BMV4TW6QFQ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("HEY");

export default firebase;