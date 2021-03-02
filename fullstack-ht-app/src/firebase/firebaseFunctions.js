import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const SignUpWithEmail = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const currentUser = firebase.auth().currentUser;
        const db = firebase.firestore();

        console.log('currentUser: ', currentUser);

        db.collection('users')
            .doc(currentUser.uid)
            .set({
                email: currentUser.email
            });

    } catch (err) {
        console.log('sign up with email error', err);
    }
};

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
