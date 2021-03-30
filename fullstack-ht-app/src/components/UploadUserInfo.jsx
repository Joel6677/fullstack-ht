import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import theme from '../theme';
import Moment from 'moment';
import { uploadUserInfo } from '../firebase/auth';
import { StateContext } from '../state';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      position: 'absolute',
      flex: 1,
      zIndex: 1
    },
    fieldContainer: {
      marginBottom: 15,
    },
    buttonContainer: {
        zIndex: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#aab2bb',
        marginBottom: 15
    }, textContainer: {
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        color: '#A6ACAF',
    }
  });

const initialValues = {
    firstName: '',
    lastName: '',
    bio: ''

};

const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(1, 'First name must be at least 1 charaters long')
        .required('First name is required'),
    lastName: yup
        .string()
        .min(1, 'Last name must be at least 1 characters long')
        .required('Last name is required'),
    bio: yup
        .string()
        .max(150, 'Bio can be at most 150 characters long'),
});


const UserinfoForm = ({ onSubmit , date, pressed }) => {

    const { state, dispatch } = useContext(StateContext);
    const text = pressed ? Moment(date).format('DD-MM-YYYY') : 'Birthdate';

    return (
        <View style={styles.container}>

            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="firstName"
                    placeholder="First name"
                />
            </View>

            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="lastName"
                    placeholder="Last name" />
            </View>

            <TouchableWithoutFeedback onPress={() => dispatch({ type: "SET_SHOW", payload: !state.show })} >
                <View style={styles.buttonContainer}>
                    <Text style={styles.textContainer}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.fieldContainer}>
                <FormikTextInput
                    name="bio"
                    placeholder="Bio"
                    multiline
                    numberOfLines={4}
                />
            </View>

            <Button mode={'outlined'} onPress={onSubmit}>
                Submit
        </Button>


        </View>
    );
};

const UploadUserInfo = () => {

    const history = useHistory();
    const { state, dispatch } = useContext(StateContext);

    const [date, setDate] = useState(new Date());
    const [pressed, setPressed] = useState(false);


    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      dispatch({type: "SET_SHOW", payload: false});
      setDate(currentDate);
      setPressed(true);
    };

    const onSubmit = async (values) => {
        const { firstName, lastName, bio } = values;

        uploadUserInfo(firstName, lastName, date, bio);

        history.push('/');
      
    };

    return (
        <>
            <Formik
                style={styles.container}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => <UserinfoForm onSubmit={handleSubmit} date={date} pressed={pressed}/>}
            </Formik>
        { state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              display="default"
              onChange={onChange}
              maximumDate={new Date(2020, 12, 31)}
              minimumDate={new Date(1900, 1, 1)}
            />
            
        )}
        </>
    );
};

export default UploadUserInfo;