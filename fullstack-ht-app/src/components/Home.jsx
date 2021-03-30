import React, { useContext, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Alert } from 'react-native';
import { useQuery } from '@apollo/client'; 
import { StateContext } from '../state';
import Text from './Text';

// import fileService from '../services/files';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    position: 'absolute',
  }
});



const Home = () => {



  return (
     <>
      <View style={styles.container}>

      
      
      </View>
     


      {/* <Animated.View style={[styles.home, {
        transform: [{
          translateX: homeAnim
        }]
      }]}>
        <View>
          {files.map((file) =>
            <React.Fragment key={file._id}>
              <Image
                style={styles.photo}
                source={{
                  uri: `http://localhost:3001/image/${file.filename}`
                }} />
            </React.Fragment>
          )}
          <Text>Pictures&videos</Text>
        </View>
      </Animated.View>  */}
      
     </>

  );
};

export default Home;