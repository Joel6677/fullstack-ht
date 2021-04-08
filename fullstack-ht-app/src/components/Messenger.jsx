import React, { useState, useContext, useRef, useEffect } from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import * as firebase from 'firebase';
import { addMessage } from '../firebase/uploads';


const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column'
    },
    messengerContainer: {

    },
    messageContainerSend: {
        backgroundcolor: 'red'
        
    },
    messageContainerReceived: {
        backgroundcolor: 'yellow'
    },
    sendMessageContainer: {
        flexDirection: 'row'
    }
});



const Messenger = ({otherUser}) => {

    const [text, setText] = useState('');
    const currentUser = firebase.auth().currentUser;
    const [sendedMessages, setSendedMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {

        firebase.firestore().collection('messages').where("sendBy", "==",currentUser).where("sendTo","==",otherUser)
        .get().then((querySnapshot) => {
            let posts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            });
            setSendedMessages(posts);
        });

        firebase.firestore().collection('messages').where("sendBy", "==",otherUser).where("sendTo","==",currentUser)
        .get().then((querySnapshot) => {
            let posts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            });
            setReceivedMessages(posts);
        });

    });

    // messages in flexdirection: column
    return(
        <View style={styles.container}>
            
            {/* {sendedMessages.map(message => <View style={styles.sendedMessages} key={message.id}>{message}</View>)} */}
            
            <View style={styles.sendMessageContainer}>
                <TextInput
                    label=""
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <Button icon="send" onPress={()=>{addMessage(text, currentUser.uid, otherUser);}} />
            </View>
                    
        </View>
    );
};

export default Messenger;