import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import uuid from 'uuid';
import * as ImagePicker from 'expo-image-picker';
import { Button, Checkbox, Snackbar } from 'react-native-paper';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { StateContext } from '../state';
import DateTimePicker from '@react-native-community/datetimepicker';
// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Moment from 'moment';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    paddingVertical: 80,
    zIndex: 1,
  },
  fieldContainer: {
    margin: 5,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#aab2bb',
    margin: 5
}, textContainer: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    color: '#A6ACAF',
}, textContainer2: {
  fontSize: theme.fontSizes.body,
  fontFamily: theme.fonts.main,
  marginTop: 9,
  color: '#A6ACAF',
}, checkboxContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#aab2bb',
    margin: 5
}
});

const initialValues = {
  distillery: '', 
  brand: '', 
  nameAddition: '',
  country: '',
  region: '',
  category: '',
  age: '', 
  abv: '',
  bottleSize: '',
  bottler: '',
  series: '',
  description: '',
  caskType: '',
  caskNumber: '',
  numberOfBottles: '',
};




const validationSchema = yup.object().shape({
  distillery: yup
    .string()
    .required('Distillery is required'),
  brand: yup
    .string()
    .required('Brand is required'),
  nameAddition: yup
    .string(),
  country: yup
    .string()
    .required('Country is required'),
  region: yup
    .string(),
  category: yup
    .string()
    .required('Category is required'),
  age: yup 
    .number(),
  abv: yup
    .number()
    .min(0, 'Abv must be non negative number')
    .max(100, 'Abv can be atmost 100')
    .required('Abv is required'),
  bottleSize: yup
    .number()
    .required('Bottlesize is required'),
  bottler: yup
    .string(),
  series: yup
    .string(),
  description: yup
    .string(),
  caskType: yup
    .string(),
  caskNumber: yup
    .number(),
  numberOfBottles: yup
    .number()
});



const UploadWhiskyForm = ({ onSubmit, pickProfilePicFromLibrary, distillationPressed, bottlingPressed, distillationDate, bottlingDate }) => {

  const { state, dispatch } = useContext(StateContext);
  const distillationDateText = distillationPressed ? Moment(distillationDate).format('DD-MM-YYYY') : 'Distillation date';
  const bottlingDateText = bottlingPressed ? Moment(bottlingDate).format('DD-MM-YYYY') : 'Bottling date';

  return (
    <View>
      <View style={styles.fieldContainer}>
        <FormikTextInput 
        name="distillery" 
        placeholder="Distillery" />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="brand"
          placeholder="Brand"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="nameAddition"
          placeholder="Name addition"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="country"
          placeholder="Country"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="region"
          placeholder="Region"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="category"
          placeholder="Category"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="age"
          keyboardType="numeric"
          placeholder="Age"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="abv"
          keyboardType="numeric"
          placeholder="Abv"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="bottleSize"
          keyboardType="numeric"
          placeholder="Bottlesize (Liter)"
        />
      </View>


      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="bottler"
          placeholder="Bottler"
        />
      </View>


      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="series"
          placeholder="Series"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="caskType"
          placeholder="Cask Type"
        />
      </View>


      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="caskNumber"
          keyboardType="numeric"
          placeholder="Cask Number"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="numberOfBottles"
          keyboardType="numeric"
          placeholder="Number of bottles"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="description"
          placeholder="Description"
          multiline
          numberOfLines={1}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => dispatch({ type: "SET_SHOW_DISTILLATION_DATE", payload: !state.show })} >
        <View style={styles.buttonContainer}>
          <Text style={styles.textContainer}>{distillationDateText}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => dispatch({ type: "SET_SHOW_BOTTLING_DATE", payload: !state.show })} >
        <View style={styles.buttonContainer}>
          <Text style={styles.textContainer}>{bottlingDateText}</Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.checkboxContainer}>

      <Text style={styles.textContainer2}>Chill filtration</Text>

      <Checkbox
        status={state.cfChecked ? 'checked' : 'unchecked'}
        onPress={() => {
          dispatch({ type: "SET_CF_CHECKED", payload: !state.cfChecked});
        }} />

      </View>

      <View style={styles.checkboxContainer}>

        <Text style={styles.textContainer2}>Artificial colouring</Text>

        <Checkbox
          status={state.acChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            dispatch({ type: "SET_AC_CHECKED", payload: !state.acChecked });
          }} />

      </View>

      <Button icon='camera' mode='outlined' onPress={pickProfilePicFromLibrary} style={styles.fieldContainer}>Upload image</Button>

      <Button icon={'bottle-wine'} style={styles.fieldContainer} mode='outlined' onPress={onSubmit}>
          Submit whisky
      </Button>
    </View>
  );
};



const UploadWhisky = () => {
  const history = useHistory();
  const [image, setImage] = useState();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const [nWhiskyID, setNWhiskyID] = useState('');
  const [downloadURL, setDownloadURL] = useState('');
  const {state, dispatch } = useContext(StateContext);
  const [distillationDate, setDistillationDate] = useState('');
  const [bottlingDate, setBottlingDate] = useState('');
  const [distillationPressed, setDistillationPressed] = useState(false);
  const [bottlingPressed, setBottlingPressed] = useState(false);
  const [uploadMessage, setUploadMessage] = useState();
  const onDismissSnackBar = () => setVisible(false);


  const addImageToFirestore = async (downloadURL, whiskyID) => { 
    setDownloadURL(downloadURL);

    firebase.firestore()
    .collection('whiskyImages')
    .doc(whiskyID)
    .set({
      downloadURL
    });
  };
  
  const pickProfilePicFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const whiskyID = uuid.v4();
    setNWhiskyID(whiskyID);
  
    if (!result.cancelled) {
      uploadImage(result.uri, whiskyID);
      setImage(result.uri);
      onToggleSnackBar();
    }
  };

  const uploadImage = async(uri, whiskyID) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`images/whiskies/${whiskyID}`);

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
      addImageToFirestore(downloadURL, whiskyID);
    });
  });

  };

  const onSubmit = async (values) => {
    const {distillery, brand, nameAddition, country, region, category, age, abv, bottleSize, 
    bottler, series, description, caskType, caskNumber, numberOfBottles} = values;

    const fullName = distillery + brand + age + (distillationDate&&Moment(distillationDate).format('DD-MM-YYYY'))
     + abv + bottler;

    firebase.firestore().collection('whiskies').doc(nWhiskyID).set({
      fullName : fullName,
      distillery: distillery,
      brand: brand,
      nameAddition: nameAddition,
      country: country,
      region: region,
      category: category,
      age: age,
      abv: abv,
      bottleSize: bottleSize,
      bottler: bottler,
      series: series,
      description: description,
      caskType: caskType,
      caskNumber: caskNumber,
      numberOfBottles: numberOfBottles,
      distillationDate: distillationDate !== '' ? Moment(distillationDate).format('DD-MM-YYYY') : '',
      bottlingDate: bottlingDate !== '' ? Moment(bottlingDate).format('DD-MM-YYYY') : '',
      artificialColoring: state.acChecked,
      chillFiltration: state.cfChecked,
      downloadURL: downloadURL,
      reviewCount: 0,
      rating: 0,
      created_at: Moment(new Date()).format('DD-MM-YYYY')

    }).then(() => {console.log('Uploaded whisky successfully');}).catch((error) => {
      console.log("Error uploading whisky: ", error);
  });
    history.push('/');
  };


  const onDistillationChange = (event, selectedDate) => {
    const currentDate = selectedDate || distillationDate;
    console.log(currentDate, ' ', selectedDate);
    dispatch({type: "SET_SHOW_DISTILLATION_DATE", payload: false});
    setDistillationDate(currentDate);
    setDistillationPressed(true);
  };

  const onBottlingChange = (event, selectedDate) => {
    const currentDate = selectedDate || bottlingDate;
    dispatch({type: "SET_SHOW_BOTTLING_DATE", payload: false});
    setBottlingDate(currentDate);
    setBottlingPressed(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.heading}>
        <Text color={'primary'} fontSize={'heading'} fontWeight={'bold'}>
          Upload Whisky
        </Text>
      </View>
      
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <UploadWhiskyForm onSubmit={handleSubmit} pickProfilePicFromLibrary={pickProfilePicFromLibrary} distillationDate={distillationDate} bottlingDate={bottlingDate} distillationPressed={distillationPressed} bottlingPressed={bottlingPressed} />}
      </Formik>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, alignSelf: 'center' }} />} 
      </ScrollView>
      <Snackbar
        duration={1500}
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        >
        {uploadMessage}
      </Snackbar>
      { state.showDistillationDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          display="default"
          onChange={onDistillationChange}
        />
      )}
      { state.showBottlingDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          display="default"
          onChange={onBottlingChange}
        />
      )}
      
    </View>
  );
};

export default UploadWhisky;