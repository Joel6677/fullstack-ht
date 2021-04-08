import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const uploadUserInfo = async (firstName, lastName, birthdate, bio) => {

    try {
        const currentUser = firebase.auth().currentUser;
        const name = firstName + ' ' + lastName;

        const db = firebase.firestore();
        db.collection('userinfo')
            .doc(currentUser.uid)
            .set({
                name: name,
                birthdate: birthdate,
                bio: bio
            });
    } catch (err) {
        console.log('upload user info error: ', err);
    }

};

export const addToWishList = async (whiskyID) => {

    try {
        const currentUser = firebase.auth().currentUser;

        const db = firebase.firestore();
        db.collection('users')
            .doc(currentUser.uid)
            .collection('wishlist')
            .doc(whiskyID)
            .set({
                whiskyID: whiskyID
            });
    } catch (err) {
        console.log('add to wish list error: ', err);
    }

};

export const addMessage = async (text, sendBy, sendTo) => {

    const db = firebase.firestore();

    db.collection('messages').add({
            text: text,
            sendBy: sendBy,
            sendTo: sendTo

        }).then(() => { console.log('uploaded successfully!'); })
        .catch((error) => { console.error('error writing document: ', error); });
};





export const addToCollection = async (whiskyID) => {

    try {
        const currentUser = firebase.auth().currentUser;

        const db = firebase.firestore();
        db.collection('users')
            .doc(currentUser.uid)
            .collection('collection')
            .doc(whiskyID)
            .set({
                whiskyID: whiskyID
            });
    } catch (err) {
        console.log('add to collection error: ', err);
    }

};