import React, { useState, useEffect } from 'react';
import { View, Image, Button, Platform, Alert } from 'react-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";
import "firebase/firebase-auth";

const ChoosePic = () => {

  useEffect(() => {
    console.log('test');
  });

  const [image, setImage] = useState(null);

  const pickProfilePicFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result: ', result);

    if (!result.cancelled) {
      uploadImage(result.uri);
      setImage(result.uri);
    }
  };

  const takeProfilePic = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result: ', result);

    if (!result.cancelled) {
      uploadImage(result.uri);
      setImage(result.uri);
    }
  };

  const addImageToFirestore = async (downloadURL) => {
    firebase.firestore()
    .collection('images')
    .doc(firebase.auth.currentUser.uid)
    .collection('userImages')
    .add({
      downloadURL
    });
};


  const uploadImage = async(uri) => {
    console.log('uri: ', uri);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`images/${firebase.auth().currentUser.uid}/${uuid.v4()}`);

    console.log('blob: ', blob);

    const uploadTask = ref.put(blob);

    console.log('uploadTask: ', uploadTask);

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

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button title="Pick an image from camera roll" onPress={pickProfilePicFromLibrary} />
    <Button title='Take a picture' onPress={takeProfilePic} />
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    {/* <Image source={{ url : imageUrl }} style={{ width: 200, height: 200 }} /> */}
  </View>

  );
};

export default ChoosePic;
