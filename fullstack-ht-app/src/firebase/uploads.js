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

export const addToWishList = async (whisky, whiskyID) => {

        const currentUser = firebase.auth().currentUser;

        const db = firebase.firestore();
        db.collection('wishLists')
            .doc(currentUser.uid)
            .collection('userWishList')
            .doc(whiskyID)
            .set({
                whiskyID: whiskyID,
                brand: whisky.brand,
                nameAddition: whisky.nameAddition,
                age: whisky.age,
                distillationDate: whisky.distillationDate,
                bottlingDate: whisky.bottlingDate,
                abv: whisky.abv,
                bottleSize: whisky.bottleSize,
                downloadURL: whisky.downloadURL,
                reviewCount: whisky.reviewCount,
                rating: whisky.rating,
                bottler: whisky.bottler
            }).then(() => {
                console.log('whisky added to wish list');
            }).catch((error) => {
                console.error(error);
            });

};


export const addToCollection = (whisky, whiskyID) => {

    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection('collections')
        .doc(currentUser.uid)
        .collection('userCollection')
        .doc(whiskyID)
        .set({
            whiskyID: whiskyID,
            brand: whisky.brand,
            nameAddition: whisky.nameAddition,
            age: whisky.age,
            distillationDate: whisky.distillationDate,
            bottlingDate: whisky.bottlingDate,
            abv: whisky.abv,
            bottleSize: whisky.bottleSize,
            downloadURL: whisky.downloadURL,
            reviewCount: whisky.reviewCount,
            rating: whisky.rating,
            bottler: whisky.bottler
        }).then(() => {
            console.log('whisky added to collection');
        }).catch((error) => {
            console.error(error);
        });

};