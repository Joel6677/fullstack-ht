import React, {useRef, useState} from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
// import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {firebaseConfig} from '../firebase/Fire';
import Text from './Text';
import theme from '../theme';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 50,
        zIndex: 3,
    },
    textInput: {
        marginVertical: 20,
        fontSize: 17,
    },
    buttons: {
        marginBottom: 20,
        zIndex: 3
    }
  });
  

const SignUpPhone = () => {

    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState();

    const attemptInvisibleVerification = false;

    return (

        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={attemptInvisibleVerification}
            />
            <Text fontWeight='bold'>Enter phone number</Text>
            <TextInput
                style={styles.textInput}
                placeholder="+1 999 999 9999"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
            <View style={styles.buttons}>
            <Button
                color={theme.colors.primary}
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={async () => {
                    // The FirebaseRecaptchaVerifierModal ref implements the
                    // FirebaseAuthApplicationVerifier interface and can be
                    // passed directly to `verifyPhoneNumber`.
                    try {
                        const phoneProvider = new firebase.auth.PhoneAuthProvider();
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                            phoneNumber,
                            recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        showMessage({
                            text: 'Verification code has been sent to your phone.',
                        });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'red' });
                    }
                }}
            />
            </View>
            
            <Text fontWeight='bold'>Enter Verification code</Text>
            <TextInput
                style={styles.textInput}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <View style={styles.button}>
            <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                onPress={async () => {
                    try {
                        const credential = firebase.auth.PhoneAuthProvider.credential(
                            verificationId,
                            verificationCode
                        );
                        await firebase.auth().signInWithCredential(credential);
                        showMessage({ text: 'Phone authentication successful' });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'red'});
                    }
                }}
            />
            </View>
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 'white', justifyContent: 'center', zIndex: 10},
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: message.color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                            zIndex: 10
                        }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : (
                    undefined
                )} 
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>

    );



};

export default SignUpPhone;