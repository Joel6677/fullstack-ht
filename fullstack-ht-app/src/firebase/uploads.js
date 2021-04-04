import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const uploadUserInfo = async (firstName, lastName, birthdate, bio) => {

    console.log('upload userinfo');

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