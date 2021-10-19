import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

class becomeSeller extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.container}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 35,
              }}
            >
              Become Seller?
            </Text>

            {/* <Animated.View >
                    <Svg height={height} width={width}>
                    <ClipPath id='clip'>
                        <Circle r={height} cx={width/2}/>
                    </ClipPath>
                    <Image
                        href={require('./../../assets/gifs/become-seller2.gif')}
                        height={height} width={width}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath='url(#clip)'
                    />
                    </Svg>
                </Animated.View> */}
            <Image
              style={{
                width: width,
                height: height / 2,
                justifyContent: "center",
                resizeMode: "contain",
              }}
              source={require("./../../assets/gifs/become-seller2.gif")}
            />

            <MaterialIcons
              name="play-circle-filled"
              size={130}
              color="#38DFEB"
              style={{
                justifyContent: "center",
                position: "absolute",
                marginTop: height / 2.9,
                marginLeft: width / 5.3,
              }}
            />
            <TapGestureHandler
              onHandlerStateChange={() =>
                this.props.navigation.navigate("sellerForm")
              }
            >
              <Text
                onPress={() => this.props.navigation.navigate("Explore")}
                style={{
                  textAlign: "center",
                  color: "#1F2833",
                  fontSize: 20,
                  marginVertical: 5,
                }}
              >
                Yes I want to become a Seller
              </Text>
            </TapGestureHandler>
          </View>

          {/* <TapGestureHandler onHandlerStateChange={() => this.props.navigation.navigate('becomeSeller')}>
                    <Animated.View style={styles.button}>
                    <Text  style={{fontSize:20,fontWeight:'bold', color:'white'}}>Take me there</Text>
                    </Animated.View>
                </TapGestureHandler> */}

          <Text
            onPress={() => this.props.navigation.navigate("Explore")}
            style={{
              textAlign: "center",
              color: "#1F2833",
              fontSize: 20,
              marginVertical: 5,
            }}
          >
            Go Back
          </Text>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    color: "white",
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "white",
    opacity: 0.5,
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
    shadowOpacity: 1,
    elevation: 3,
  },
});

export default becomeSeller;
