import React from 'react';
import { NativeRouter } from 'react-router-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import firebase from 'firebase/app';
import Main from './src/components/Main';
import { StateProvider } from './src/state';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#334b8b',
  },
};

const firebaseConfig = {
  apiKey: 'AIzaSyDkW-jIpPtfIi7gvbaTyWVw3GKWZR2GF00',
  authDomain: 'fullstack-project-31017.firebaseapp.com',
  databaseURL: 'https://fullstack-project-31017-default-rtdb.firebaseio.com',
  projectId: 'fullstack-project-31017',
  storageBucket: 'gs://fullstack-project-31017.appspot.com',
  messagingSenderId: '487934128883',
  appId: '1:487934128883:web:2dda37c11f4a27833e7d86',
  measurementId: 'G-SLF7782DHQ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => (
  <PaperProvider theme={theme}>
    <NativeRouter>
      <StateProvider>
        <Main />
      </StateProvider>
    </NativeRouter>
  </PaperProvider>
);

export default App;
