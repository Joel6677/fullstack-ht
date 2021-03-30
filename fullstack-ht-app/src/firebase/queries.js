import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { StateContext } from '../state';

export const GET_USERINFO = () => {

    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('userinfo')
    .get()
      .then((querySnapshot) => {
        let posts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
        });
        console.log('posts: ', posts);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      

};

export const GET_PROFILEPIC = async () => {

    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('userinfo')
    .get()
      .then((querySnapshot) => {
        let posts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
        });
        console.log('posts: ', posts);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      
};

export const GET_USERIMAGES = async () => {

    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('userinfo')
    .get()
      .then((querySnapshot) => {
        let posts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
        });
        console.log('posts: ', posts);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      
};