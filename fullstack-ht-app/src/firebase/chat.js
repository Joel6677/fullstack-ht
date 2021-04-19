// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


export const sendChatMessage = (chatID, text) => {

  firebase.firestore()
    .collection('messages')
    .doc(chatID)
    .collection('chats')
    .add({
      text: text,
      createdAt: new Date().getTime(),
      user: {
        _id: firebase.auth().currentUser.uid
      }
    });

    firebase.firestore()
    .collection('messages')
    .doc(chatID)
    .set({
      chatID: chatID,
      text: text,
      createdAt: new Date().getTime(),
    });    
};

