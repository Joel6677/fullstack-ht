import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    zIndex: 1,
    // position: 'absolute',
    height: '100%',
    width: '100%',
    // paddingTop: 80,
    paddingBottom: 60,
  },

});

const MyMedia = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const images = firebase.firestore()
      .collection('images')
      .doc(firebase.auth().currentUser.uid)
      .collection('userImages')
      .get()

      const posts = images.docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        return { id, ...data };
      })

      setFiles(posts)
    }

    fetchData()

  }, []);

  return (
    <View>

      <FlatList
        numColumns={3}
        horizontal={false}
        data={files}
        renderItem={({ item }) => (
          <View
            style={styles.containerImage}
          >
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
