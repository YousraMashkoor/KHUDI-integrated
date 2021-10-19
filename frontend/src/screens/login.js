import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

import Axios from "../../axios";
import jwt_decode from "jwt-decode";

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",
    };

    this.buttonOpacity = new Value(1);
    this.OnStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.OnCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  //********************************LOGIN*************************************** */
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  logIn = async () => {
    const { email, password } = this.state;
    console.log("this.state.email: ", this.state.email);
    console.log("this.state.password: ", this.state.password);
    console.log("Login");
    try {
      let response = await Axios.post("/api/users/login", {
        email: this.state.email,
        password: this.state.password,
      });

      console.log("before sending token");
      // saving token to local storage
      const token = response.data.token;
      AsyncStorage.setItem("jwtToken", token);
      // setAuthToken(token);
      // const decodedToken = jwt_decode(token);
      // console.log("Decoded Token: ", decodedToken);

      this.props.navigation.navigate("Explore");
      console.log("Response: ", response.data.token);
    } catch (err) {
      console.log("Error: ", err.response.data);
      // console.warn("Error: ", err.response.data);
      this.setState({ errors: err.response.data });
    }
    console.log("In the end of LOGIN");
  };

  // componentDidMount() {
  //   this.getApiData();
  // }

  // async getApiData() {
  //   let response = await Axios.post("/login");
  //   console.log("RESPONSE: ", response);
  //   // console.warn(response.data);
  //   this.setState({ data: response.data });
  // }

  //*********************************************************************** */

  render() {
    const { errors } = this.state;

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end",
        }}
        behavior="height"
        enabled
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "flex-end",
          }}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }],
            }}
          >
            <Svg height={height} width={width}>
              <ClipPath id="clip">
                <Circle r={height} cx={width / 2} />
              </ClipPath>
              <Image
                href={require("./../../assets/bg.jpg")}
                height={height}
                width={width}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          </Animated.View>
          <View style={{ height: height / 3, justifyContent: "center" }}>
            <TapGestureHandler onHandlerStateChange={this.OnStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }],
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TapGestureHandler>

            <TapGestureHandler
              onHandlerStateChange={() =>
                this.props.navigation.navigate("Signin")
              }
            >
              <Animated.View
                style={{
                  ...styles.button,
                  backgroundColor: "#2E71DC",
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }],
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  JOIN US NOW
                </Text>
              </Animated.View>
            </TapGestureHandler>
            <Animated.View
              style={{
                zIndex: this.textInputZindex,
                opacity: this.textInputOpacity,
                transform: [{ translateY: this.textInputY }],
                height: height / 3,
                backgroundColor: "white",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,

                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: "center",
              }}
            >
              <TapGestureHandler onHandlerStateChange={this.OnCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text
                    style={{
                      fontSize: 15,
                      transform: [{ rotate: concat(this.rotateCross, "deg") }],
                    }}
                  >
                    X
                  </Animated.Text>
                </Animated.View>
              </TapGestureHandler>

              {/* ******************************************************************** */}
              {/* <View style={{ flex: 1, margin: 70 }}>
                {this.state.data.length > 0 ? (
                  <View>
                    {this.state.data.map((item) => (
                      <Text style={{ fontSize: 40 }}>{item.text}</Text>
                    ))}
                  </View>
                ) : (
                  <Text>Data is loading...</Text>
                )}
              </View> */}
              {/* ******************************************************************** */}

              <TextInput
                placeholder="EMAIL"
                style={styles.textInput}
                placeholderTextColor="black"
                // onChangeText={this.onChangeEmail}
                onChangeText={(val) => this.onChangeText("email", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.email}
              </Text>
              <TextInput
                placeholder="PASSWORD"
                style={styles.textInput}
                placeholderTextColor="black"
                secureTextEntry
                onChangeText={(val) => this.onChangeText("password", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.password}
              </Text>
              <Text
                onPress={() => this.props.navigation.navigate("Forgot")}
                style={{
                  textDecorationLine: "underline",
                  textAlign: "center",
                  color: "gray",
                }}
              >
                Forgot your password?
              </Text>

              {/* <TapGestureHandler
                onHandlerStateChange={() =>
                  this.props.navigation.navigate("Signin")
                }
              > */}
              <TouchableOpacity onPress={this.logIn}>
                <Animated.View style={styles.button}>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold" }}
                    // onPress={this.logIn}
                  >
                    SIGN IN
                  </Text>
                </Animated.View>
              </TouchableOpacity>
              {/* </TapGestureHandler> */}
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
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

  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 3,
  },
});
