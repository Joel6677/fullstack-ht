import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { StateProvider } from "./src/state";
import firebase from "firebase/app";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const firebaseConfig = {
  apiKey: "AIzaSyDkW-jIpPtfIi7gvbaTyWVw3GKWZR2GF00",
  authDomain: "fullstack-project-31017.firebaseapp.com",
  databaseURL: "https://fullstack-project-31017-default-rtdb.firebaseio.com",
  projectId: "fullstack-project-31017",
  storageBucket: "gs://fullstack-project-31017.appspot.com",
  messagingSenderId: "487934128883",
  appId: "1:487934128883:web:2dda37c11f4a27833e7d86",
  measurementId: "G-SLF7782DHQ"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <StateProvider>
            <Main />
          </StateProvider>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;