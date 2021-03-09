import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Alert } from 'react-native';

export const uploadUserInfo = async (firstName, lastName, birthdate, bio) => {

    try {

        const currentUser = firebase.auth().currentUser;
        console.log('current user: ', currentUser);
        const db = firebase.firestore();
        db.collection('users')
            .doc(currentUser.uid)
            .collection('userinfo')
            .add({
                firstname: firstName,
                lastname: lastName,
                birthdate: birthdate,
                bio: bio
            });
    } catch (err) {
        console.log('upload user info error: ', err);
    }

};

export const SignUpWithEmail = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();

        db.collection('users')
            .doc(currentUser.uid)
            .set({
                email: currentUser.email
            });
        return true;

    } catch (err) {

        Alert.alert(
            'Error',
            `${err}`
        );

        return false;
    }
};

// export const emailVerificationLink = async () => {

//     const useremail = firebase.auth().currentUser.email;

//     const actionCodeSettings = {
//         // URL you want to redirect back to. The domain (www.example.com) for this
//         // URL must be in the authorized domains list in the Firebase Console.
//         url: 'https://fullstack-project-31017.firebaseapp.com',
//         // This must be true.
//         handleCodeInApp: true
//     };

//     try {
//         const link = await admin.auth().generateEmailVerificationLink(useremail, actionCodeSettings);
//         return await admin.auth().sendCustomVerificationEmail(useremail, link);
//     } catch (error) {
//         console.log(error);
//     }



// };

export const SignInWithEmail = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const SignInWithGoogle = async () => {

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithRedirect(provider);
    } catch (err) {
        console.log(err);
    }

};

export const SignInWithFacebook = async () => {
    try {

        const provider = new firebase.auth.FacebookAuthProvider();
        await firebase.auth().signInWithRedirect(provider);
    } catch (err) {
        console.log(err);
    }

};

export const SignInAnonymously = async () => {
    await firebase.auth().signInAnonymously();

};

export const SignOut = async () => {

    try {
        firebase.auth().currentUser ? console.log('Sign out: ', firebase.auth().currentUser) : console.log('Not signed in');
        await firebase.auth().signOut();
    } catch (error) {
        console.log(error);
    }
};

export const DeleteUser = async () => {
    const currentUser = firebase.auth().currentUser;

    await currentUser.delete();

    console.log('user deleted: ', currentUser);
};
