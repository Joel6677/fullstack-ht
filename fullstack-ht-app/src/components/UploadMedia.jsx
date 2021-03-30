import React, { useState } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { Button, Avatar, Divider, IconButton, Snackbar, Appbar} from 'react-native-paper';
import { useHistory } from 'react-router-native';
import Text from './Text';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";
import "firebase/firebase-auth";


const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1
  },
  button: {
    marginBottom: 30
  },
  heading: {
    paddingBottom: 50,
  },
  iconButton: {
    position: 'absolute',
    width: 200,
    height: 200,
    paddingTop: 130,
    paddingLeft: 100,
    marginLeft: 150,
    zIndex: 2
  },
  snackbar: {
    marginBottom: 100
  }

});


const MyMedia = () => {

  const [image, setImage] = useState();
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);


  const pickProfilePicFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
      setImage(result.uri);
      onToggleSnackBar();
    }
  };

  const takePic = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
      setImage(result.uri);
      onToggleSnackBar();
    }
  };

  const addImageToFirestore = async (downloadURL) => {
    firebase.auth().currentUser ? 
    firebase.firestore()
    .collection('images')
    .doc(firebase.auth().currentUser.uid)
    .collection('userImages')
    .add({
      downloadURL
    }) : () => console.log('not signed in');
};

const uploadImage = async(uri) => {

  const response = await fetch(uri);
  const blob = await response.blob();

  const ref = firebase.storage().ref().child(`images/${firebase.auth().currentUser.uid}/${uuid.v4()}`);

  const uploadTask = ref.put(blob);

  uploadTask.on('state_changed', 
(snapshot) => {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  // Handle unsuccessful uploads
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      console.log(error.code);
      break;
    case 'storage/canceled':
      // User canceled the upload
      console.log(error.code);
      break;
    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      console.log(error.code);
      break;
  }
},
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    console.log('File available at', downloadURL);
    addImageToFirestore(downloadURL);
  });
});

};
  return (
   <>
  
      <View style={styles.container}>
        <Text style={styles.heading} color={'primary'} fontSize={'heading'} fontWeight={'bold'}>Add media</Text>
        <Button icon='folder-image' mode='contained' style={styles.button} onPress={pickProfilePicFromLibrary}>Pick an image</Button>
        <Button icon='camera' mode='contained' style={styles.button} onPress={takePic} >Take a picture</Button>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        <Snackbar
          style={styles.snackbar}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              console.log('pressed');
            },
          }}>
          Image uploaded.
      </Snackbar>
        {image && <IconButton
          icon={'check-circle-outline'} size={50} style={styles.iconButton} color='#b157e6' />}
    </View>

   </>

  );
};

export default MyMedia;