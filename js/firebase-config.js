
// Config
const firebaseConfig = {
    apiKey: "AIzaSyAneZO49CtdUKgqoZpkYKdSlNPFE7ziivw",
    authDomain: "cp1-chl.firebaseapp.com",
    projectId: "cp1-chl",
    storageBucket: "cp1-chl.firebasestorage.app",
    messagingSenderId: "159904709373",
    appId: "1:159904709373:web:3f04122d8526a6ddc09c94"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();