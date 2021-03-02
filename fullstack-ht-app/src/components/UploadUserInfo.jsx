import React from 'react';
import { View, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import * as firebase from "firebase";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    button: {

    }
});

const UploadUserInfo = () => {

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage();

    // Create a storage reference from our storage service
    const storageRef = storage.ref();

    return (
        // formik 
    <View style={styles.container}>


            <View>
                <CustomButton style={styles.button}>
                    Upload profile picture
                </CustomButton>
            </View>
            

    </View>

    );
};

export default UploadUserInfo;