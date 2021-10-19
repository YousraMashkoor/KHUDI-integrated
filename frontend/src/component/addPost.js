import React, { Component, useState, useEffect  } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  Picker,
  TouchableOpacity,
  Button, Image, Platform
} from "react-native";
import QA from '../component/requirements'
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import * as ImagePicker from 'expo-image-picker';

import Axios from "../../axios";
import jwt_decode from "jwt-decode";

// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
const { width, height } = Dimensions.get("window");
// const [checked, setChecked] = React.useState('first');

// SIGNIN FORM

class createPost extends Component {
    state = { category: 'baking',  image: null };
    constructor() {
      super();
      this.state = {
        name: "",
        price: "",
        tagline: "",
        category: "",
        description: "",
        postImage: "",
        errors: "",
      };
    }

    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
      });
      
      if (result.cancelled) {
        console.log('got here');
        return;
      }
      this.setState({ image: result.uri });
    };


    async componentDidMount(){

      if (Platform.OS !== 'web') {
               const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
             if (status !== 'granted') {
                 alert('Sorry, we need camera roll permissions to make this work!');
              }
           }

    }

     // useEffect(() => {
    //   (async () => {
    //     if (Platform.OS !== 'web') {
    //       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    //   })();
    // }, []);


    onChangeText = (key, val) => {
      this.setState({ [key]: val });
    };

    postForm = async () => {
      console.log("Add post FRONTEND!!!!")
      const {name, price, tagline, category, description, postImage} = this.state;
      const asyncToken = await AsyncStorage.getItem("jwtToken");
      console.log("Token: ", asyncToken);
      const decodedToken = jwt_decode(asyncToken);
      const id = decodedToken.id;
      console.log("Decoded Token: ", id);
      console.log("postForm");
      try {
        let response = await Axios.post(`/api/posts//${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: asyncToken,
            },
            name: this.state.name,
            price: this.state.price,
            tagline: this.state.tagline,
            category: this.state.category,
            description: this.state.description,
            postImage: this.state.postImage,
          }
        );
        this.props.navigation.navigate("createPost");
        console.log("Response: ", response.data);
      } catch (err) {
        console.log("Error: ", err.response.data);
        // console.warn("Error: ", err.response.data);
        this.setState({ errors: err.response.data });
      }
      console.log("In the end of ADD_POST");
    };

  render() {
    const { errors } = this.state;

    // const { checked } = "first";
    // const setChecked = (checked) => this.setState({ checked});
    
    const { category } = this.state;
    const setCategory = (category) => this.setState({ category });
    // const { category } = "first";
    let { image } = this.state;
    
    return (
      <View
        style={{
        //   backgroundColor: '#3b444b',
          height: "100%",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <KeyboardAvoidingView style={{ display: "flex" }}>
          <ScrollView>
          <Text style={{color: "#1F2833",fontWeight: "bold",textAlign: "center",fontSize: 30,marginVertical: 10, marginTop:40}}>
              Add your Fields
            </Text>
            <View>
              <TextInput
                placeholder="POST TITLE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                maxLength={100}
                onChangeText={(val) => this.onChangeText("name", val)}
                
              />
              
              <TextInput
                placeholder="TAG LINE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                onChangeText={(val) => this.onChangeText("tagline", val)}
                
              />
              
            </View>

            <TextInput
              placeholder="DESCRIPTION"
              style={styles.textInput}
              placeholderTextColor="black"     
              maxLength={300}         
              onChangeText={(val) => this.onChangeText("description", val)}
              
            />
{/* **************SUHA agr picker se hone me masla hora hoto mjhe btadena.. radio button niche he */}
            <Text style={{marginLeft:20, color: "#1F2833", marginTop:10}}>SELECT CATEGORY</Text>
            <Picker
                selectedValue={category}
                style={[styles.textInput]}
                onValueChange={(category) => setCategory(category)}
                value={category}
              >
                <Picker.Item label="Baking" value="baking" />
                <Picker.Item label="Stitching" value="stitching" />
                <Picker.Item label="Arts and Crafts" value="arts" />
                <Picker.Item label="Development and Designing" value="development" />
              </Picker>
        {/* <RadioButton.Group
              onValueChange={(checked) => setChecked(checked)}
              value={checked}
            >
              <RadioButton.Item
                defaultChecked
                style={styles.radio}
                label="Baking"
                value="baking"
                color="#1F2833"
              />
              <RadioButton.Item
                style={styles.radio}
                label="Stitching"
                value="stitching"
                color="#1F2833"
              />
              <RadioButton.Item
                style={styles.radio}
                label="Development"
                value="development"
                color="#1F2833"
              />
              <RadioButton.Item
                style={styles.radio}
                label="Arts and Crafts"
                value="art"
                color="#1F2833"
              />
            </RadioButton.Group> */}
            
            <TextInput
              placeholder="STARTING PRICE"
              style={styles.textInput}
              placeholderTextColor="black"
              keyboardType="number-pad"
              onChangeText={(val) => this.onChangeText("price", val)}
            />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Upload Visuals"
          onPress={this._pickImage}
          style={styles.button}
          onChangeText={(val) => this.onChangeText("postImage", val)}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />}
      </View>

        <QA/>
            {/* <TapGestureHandler
            onHandlerStateChange={() =>
              this.props.navigation.navigate("successfulSignin")
            }
          > */}
            <TapGestureHandler onHandlerStateChange={()=>this.props.navigation.navigate("createPost")}>
              <Animated.View style={styles.button}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  // onPress={()=>this.postForm}
                >
                  CREATE
                </Text>
              </Animated.View>
            </TapGestureHandler>
            {/* </TapGestureHandler> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );

    
  }


}


export default createPost;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    marginRight: width / 2,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 10,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1F2833",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
