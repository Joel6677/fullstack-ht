import React, { useState, useContext, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({

  container: {

  }

});




const MyMedia = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    firebase.firestore()
    .collection("images")
    .doc(firebase.auth().currentUser.uid)
    .collection("userImages")
    .get()
    .then((querySnapshot) => {
      let posts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setFiles(posts);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  },[]);


  return (
      <View>
          
          <FlatList
          numColumns={3}
          horizontal={false}
          data={files}
          renderItem={({ item }) => (
            <View
              style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />

            </View>

          )}
          keyExtractor={({ id }) => id}
        />
  
      </View>
  );
};

export default MyMedia;