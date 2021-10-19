import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import Axios from "../../axios";

// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
const { width, height } = Dimensions.get("window");
// const [checked, setChecked] = React.useState('first');

// SIGNIN FORM

class Signin extends Component {
  state = { checked: "male" };

  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      password2: "",
      gender: "",
      errors: "",
    };
    // this.onPressFlag = this.onPressFlag.bind(this);
    // this.selectCountry = this.selectCountry.bind(this);
    // this.state = {
    //     cell:null,
    //   pickerData: null,
    // };
  }
  //   *****************************************SIGNIN
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signIn = async () => {
    const { fname, lname, email, password, password2, gender } = this.state;
    ////////////////////////////////CONSOLEEESSS
    console.log("start of Signin");
    console.log(
      "this.state.fname + lname: ",
      this.state.fname,
      " + ",
      this.state.lname
    );
    console.log("this.state.email: ", this.state.email);
    console.log(
      "this.state.password + pwd2: ",
      this.state.password,
      " + ",
      this.state.password2
    );
    console.log("this.state.gender: ", this.state.checked);
    ////////////////////////
    try {
      let response = await Axios.post("/api/users/register", {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        gender: this.state.checked,
      });

      console.log("NOW GOING TO GENERATE TOKEN!!!!!!!!!!!!!!!!!");
      // saving token to local storage
      const token = response.data.token;
      AsyncStorage.setItem("jwtToken", token);

      // STORING TOKEN FROM ASYNC_STORAGE
      // const token2 = await AsyncStorage.getItem("jwtToken");
      // console.log("Token2: ", token2);

      // setAuthToken(token);
      // const decodedToken = jwt_decode(token);
      // console.log("Decoded Token: ", decodedToken);

      this.props.navigation.navigate("successfulSignin");
      console.log("Response: ", response.data.token);
    } catch (err) {
      console.log("Error: ", err.response.data);
      // console.warn("Error: ", err.response.data);
      this.setState({ errors: err.response.data });
    }
    console.log("In the end of SIGNIN / REGISTER");
  };

  //   onPressFlag() {
  //     this.myCountryPicker.open();
  //   }

  //   selectCountry(country) {
  //     this.phone.selectCountry(country.iso2);
  //   }
  render() {
    const { errors } = this.state;
    const { checked } = this.state;
    const setChecked = (checked) => this.setState({ checked });

    return (
      <View
        style={{
          backgroundColor: "#FFF",
          height: "100%",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <KeyboardAvoidingView style={{ display: "flex" }}>
          <ScrollView>
            <Text
              style={{
                color: "#1F2833",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 22,
                marginVertical: 10,
              }}
            >
              Create My Account
            </Text>
            <View>
              <TextInput
                placeholder="FIRST NAME"
                style={[styles.textInput]}
                placeholderTextColor="black"
                onChangeText={(val) => this.onChangeText("fname", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.fname}
              </Text>
              <TextInput
                placeholder="LAST NAME"
                style={[styles.textInput]}
                placeholderTextColor="black"
                onChangeText={(val) => this.onChangeText("lname", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.lname}
              </Text>
            </View>

            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              placeholderTextColor="black"
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
            <TextInput
              placeholder="CONFIRM PASSWORD"
              style={styles.textInput}
              placeholderTextColor="black"
              secureTextEntry
              onChangeText={(val) => this.onChangeText("password2", val)}
            />
            <Text
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              {errors.password2}
            </Text>
            <RadioButton.Group
              onValueChange={(checked) => setChecked(checked)}
              value={checked}
            >
              <RadioButton.Item
                defaultChecked
                style={styles.radio}
                label="Male"
                value="male"
                color="#1F2833"
              />
              <RadioButton.Item
                style={styles.radio}
                label="Female"
                value="female"
                color="#1F2833"
              />
              <RadioButton.Item
                style={styles.radio}
                label="Other"
                value="other"
                color="#1F2833"
              />
            </RadioButton.Group>

            {/* <TapGestureHandler
            onHandlerStateChange={() =>
              this.props.navigation.navigate("successfulSignin")
            }
          > */}
            <TouchableOpacity onPress={this.signIn}>
              <Animated.View style={styles.button}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  onPress={this.signIn}
                >
                  REGISTER
                </Text>
              </Animated.View>
            </TouchableOpacity>
            {/* </TapGestureHandler> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Signin;

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
