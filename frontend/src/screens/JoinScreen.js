import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function JoinScreen({ joinChat }) {
  const [username, setUsername] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:'white' }}>
     
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("./../../assets/KHUDI-white.png")}
      />
       
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter username"
        />
        <TouchableOpacity style={styles.button} onPress={() => joinChat(username)}>
          <Text style={{color:"white"}}>Join Chat</Text>
          </TouchableOpacity>
      </View>
      {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    
    </View>
    
  );
}

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
