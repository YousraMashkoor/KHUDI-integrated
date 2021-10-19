import React, { Component, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet,
  Switch,
  Picker,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import * as theme from "../theme";
import Animated, { Easing } from "react-native-reanimated";
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
// import DatePicker from 'react-native-datepicker'
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
const { width, height } = Dimensions.get("window");
// const [checked, setChecked] = React.useState('first');

import Axios from "../../axios";
import jwt_decode from "jwt-decode";

// SIGNIN FORM

class SellerSignin extends Component {
  state = { checked: "male", category: null };

  state = {
    startdatevisibility: false,
    startDateDisplay: "",
    enddatevisibility: false,
    endDateDisplay: "",
    isEnabled: false,
  };

  // state = {category};

  constructor() {
    super();
    this.state = {
      userName: "",
      cNIC: "",
      phone: "",
      location: "",
      age: "",
      language: "",
      skills: "",
      description: "",
      occupation_title: "",
      occupation_company: "",
      occupation_location: "",
      occupation_from: "",
      occupation_to: "",
      occupation_current: "",
      education_school: "",
      education_degree: "",
      education_fieldofstudy: "",
      education_from: "",
      education_to: "",
      education_current: "",
      certificate_institute: "",
      certificate_title: "",
      certificate_from: "",
      certificate_to: "",
      certificate_current: "",
      socials_website: "",
      socials_youtube: "",
      socials_instagram: "",
      socials_github: "",
      socials_linkedin: "",
      socials_facebook: "",
      socials_twitter: "",
      errors: "",
      // tokenState: "",
    };
    // this.state = {date:"2016-05-15"}
  }

  //********************************SELLER FORM*************************************** */
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  sellerForm = async () => {
    const {
      userName,
      cNIC,
      phone,
      location,
      age,
      language,
      skills,
      description,
      occupation_title,
      occupation_company,
      occupation_location,
      occupation_from,
      occupation_to,
      occupation_current,
      education_school,
      education_degree,
      education_fieldofstudy,
      education_from,
      education_to,
      education_current,
      certificate_institute,
      certificate_title,
      certificate_from,
      certificate_to,
      certificate_current,
      socials_website,
      socials_youtube,
      socials_instagram,
      socials_github,
      socials_linkedin,
      socials_facebook,
      socials_twitter,
    } = this.state;
    // AsyncStorage.getItem("jwtToken").then((value) => {
    //   console.log("Async Storage: ", value);
    //   // Axios.defaults.headers.common["authorization"] = value;
    //   axios.defaults.headers.common = { Authorization: `${value}` };
    //   setAuthToken(value);
    // });
    // console.log(Axios.defaults.headers.common["authorization"]);
    const asyncToken = await AsyncStorage.getItem("jwtToken");
    console.log("Token: ", asyncToken);
    const decodedToken = jwt_decode(asyncToken);
    console.log("Decoded Token: ", decodedToken);
    console.log("SellerForm");
    try {
      let response = await Axios.post(
        "/api/seller",
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: asyncToken,
        //   },
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: asyncToken,
          },
          // tokenState: Axios.defaults.headers.common["authorization"],
          userName: this.state.userName,
          cNIC: this.state.cNIC,
          phone: this.state.phone,
          location: this.state.location,
          age: this.state.age,
          language: this.state.language,
          skills: this.state.skills,
          description: this.state.description,
          occupation: {
            title: this.state.occupation_title,
            company: this.state.occupation_company,
          },
          // occupation: { company: this.state.occupation_company },
          occupation: { location: this.state.occupation_location },
          occupation: { from: this.state.occupation_from },
          occupation: { to: this.state.occupation_to },
          occupation: { current: this.state.occupation_checked1 },
          education: { school: this.state.education_school },
          education: { degree: this.state.education_degree },
          education: { fieldofstudy: this.state.education_fieldofstudy },
          education: { from: this.state.education_from },
          education: { to: this.state.education_to },
          education: { current: this.state.education_checked2 },
          certificate: { institute: this.state.certificate_institute },
          certificate: { title: this.state.certificate_title },
          certificate: { from: this.state.certificate_from },
          certificate: { to: this.state.certificate_to },
          certificate: { current: this.state.certificate_checked3 },
          socials: { website: this.state.socials_website },
          socials: { youtube: this.state.socials_youtube },
          socials: { instagram: this.state.socials_instagram },
          socials: { github: this.state.socials_github },
          socials: { linkedin: this.state.socials_linkedin },
          socials: { facebook: this.state.socials_facebook },
          socials: { twitter: this.state.socials_twitter },
        }
      );
      this.props.navigation.navigate("Profile2");
      console.log("Response: ", response.data);
    } catch (err) {
      console.log("Error: ", err.response.data);
      // console.warn("Error: ", err.response.data);
      this.setState({ errors: err.response.data });
    }
    console.log("In the end of SELLERFORM");
  };

  render() {
    const { errors } = this.state;
    const { checked } = this.state;
    const { category } = this.state;
    const setChecked = (checked) => this.setState({ checked });
    const setCategory = (category) => this.setState({ category });

    // **********************for OCUPATION strat date

    const onPressButtonStart = () => {
      this.setState({ startdatevisibility: true });
    };

    const onPressCancelStart = () => {
      this.setState({ startdatevisibility: false });
    };

    const handleConfirmStart = (date) => {
      this.setState({ startDateDisplay: date.toUTCString() });
    };

    // ************************for OCUPATION end date
    const onPressButtonEnd = () => {
      this.setState({ enddatevisibility: true });
    };

    const onPressCancelEnd = () => {
      this.setState({ enddatevisibility: false });
    };

    const handleConfirmEnd = (date) => {
      this.setState({ endDateDisplay: date.toUTCString() });
    };

    //********************* for OCUPATION current */
    const { checked1 } = this.state;
    const setChecked1 = (checked1) => this.setState({ checked1 });

    // **********************for EDUCATON strat date

    const onPressButtonStartEdu = () => {
      this.setState({ startedudatevisibility: true });
    };

    const onPressCancelStartEdu = () => {
      this.setState({ startedudatevisibility: false });
    };

    const handleConfirmStartEdu = (date) => {
      this.setState({ starteduDateDisplay: date.toUTCString() });
    };

    // ************************for EDUCATION end date
    const onPressButtonEndEdu = () => {
      this.setState({ endedudatevisibility: true });
    };

    const onPressCancelEndEdu = () => {
      this.setState({ endedudatevisibility: false });
    };

    const handleConfirmEndEdu = (date) => {
      this.setState({ endeduDateDisplay: date.toUTCString() });
    };

    //********************* for EDUCATION current */
    const { checked2 } = this.state;
    const setChecked2 = (checked2) => this.setState({ checked2 });

    // **********************for CERTIFICATE strat date

    const onPressButtonStartCert = () => {
      this.setState({ startcertdatevisibility: true });
    };

    const onPressCancelStartCert = () => {
      this.setState({ startcertdatevisibility: false });
    };

    const handleConfirmStartCert = (date) => {
      this.setState({ startcertDateDisplay: date.toUTCString() });
    };

    // ************************for CERIFICATE end date
    const onPressButtonEndCert = () => {
      this.setState({ endcertdatevisibility: true });
    };

    const onPressCancelEndCert = () => {
      this.setState({ endcertdatevisibility: false });
    };

    const handleConfirmEndCert = (date) => {
      this.setState({ endcertDateDisplay: date.toUTCString() });
    };

    //********************* for CERTIFICATE current */
    const { checked3 } = this.state;
    const setChecked3 = (checked3) => this.setState({ checked3 });

    return (
      <View
        style={{
          backgroundColor: "#FFF",
          height: "100%",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <ScrollView scrollEventThrottle={16}>
          <KeyboardAvoidingView style={{ display: "flex" }}>
            <Text
              style={{
                color: "#1F2833",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 22,
                marginVertical: 10,
              }}
            >
              Seller Account
            </Text>

            <Text style={{ marginLeft: 20, color: theme.colors.lightblue }}>
              Personal Info
            </Text>
            <View>
              <TextInput
                placeholder="UserName"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={40}
                onChangeText={(val) => this.onChangeText("userName", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.userName}
              </Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="CNIC"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="cc-number"
                maxLength={13}
                onChangeText={(val) => this.onChangeText("cNIC", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.cNIC}
              </Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="PHONE NO"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="tel"
                maxLength={11}
                onChangeText={(val) => this.onChangeText("phone", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.phone}
              </Text>
              <TextInput
                placeholder="ADDRESS"
                style={[styles.textArea]}
                placeholderTextColor="black"
                autoCompleteType="street-address"
                multiline={true}
                onChangeText={(val) => this.onChangeText("location", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.location}
              </Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="AGE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="cc-number"
                maxLength={3}
                onChangeText={(val) => this.onChangeText("age", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.age}
              </Text>
              <TextInput
                placeholder="LANGUAGE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                onChangeText={(val) => this.onChangeText("language", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.language}
              </Text>
              <TextInput
                placeholder="SKILLS"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                onChangeText={(val) => this.onChangeText("skills", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.skills}
              </Text>
              <TextInput
                placeholder="ABOUT ME"
                style={[styles.textArea]}
                placeholderTextColor="black"
                autoCompleteType="street-address"
                multiline={true}
                onChangeText={(val) => this.onChangeText("description", val)}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                }}
              >
                {errors.description}
              </Text>

              <Text
                style={{
                  marginHorizontal: 30,
                  alignItems: "center",
                  marginVertical: 10,
                  fontSize: 15,
                  color: "#00adf2",
                }}
              >
                Please note that the rest of the credentials are not mendarory
                but recommended!
              </Text>
              <Text
                style={{
                  marginHorizontal: 30,
                  alignItems: "center",
                  marginVertical: 3,
                  fontSize: 15,
                  color: "#00adf2",
                }}
              >
                This will help feature you as our recommended seller in the
                future.
              </Text>
              <Text
                style={{
                  marginHorizontal: 30,
                  textAlign: "center",
                  marginVertical: 3,
                  fontSize: 15,
                  color: "#00adf2",
                }}
              >
                Happy Selleing:)
              </Text>
              <View
                style={{
                  backgroundColor: "black",
                  height: 10,
                  marginBottom: 10,
                }}
              ></View>
              <Text style={{ marginLeft: 20, color: theme.colors.lightblue }}>
                Occupation
              </Text>
              <TextInput
                placeholder="TITLE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("occupation_title", val)
                }
              />
              <TextInput
                placeholder="COMPANY"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("occupation_company", val)
                }
              />
              <TextInput
                placeholder="LOCATION"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="tel"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("occupation_location", val)
                }
              />

              <Button
                style={{ color: "black" }}
                title="START DATE"
                onPress={onPressButtonStart}
              />
              <Text style={{ marginLeft: 30, fontSize: 15 }}>
                {this.state.startDateDisplay}
              </Text>
              <DateTimePickerModal
                isVisible={this.state.startdatevisibility}
                mode="date"
                onConfirm={handleConfirmStart}
                onCancel={onPressCancelStart}
              />

              <Button
                style={{ color: "black" }}
                title="END DATE"
                onPress={onPressButtonEnd}
              />
              <Text style={{ marginLeft: 30, fontSize: 15 }}>
                {this.state.endDateDisplay}
              </Text>
              <DateTimePickerModal
                isVisible={this.state.enddatevisibility}
                mode="date"
                onConfirm={handleConfirmEnd}
                onCancel={onPressCancelEnd}
              />

              <Text style={{ marginLeft: 30, marginTop: 10 }}>
                CURRENTLY WORKING HERE:{" "}
              </Text>
              <RadioButton.Group
                onValueChange={(checked1) => setChecked1(checked1)}
                value={checked1}
              >
                <RadioButton.Item
                  style={styles.radio}
                  label="Yes"
                  value="yes"
                  color="#1F2833"
                />
                <RadioButton.Item
                  style={styles.radio}
                  label="No"
                  value="no"
                  color="#1F2833"
                />
              </RadioButton.Group>

              <View
                style={{
                  backgroundColor: "black",
                  height: 10,
                  marginBottom: 10,
                }}
              ></View>
              <Text style={{ marginLeft: 20, color: theme.colors.lightblue }}>
                Education
              </Text>
              <TextInput
                placeholder="SCHOOL"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("education_school", val)
                }
              />
              <TextInput
                placeholder="DEGREE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("education_degree", val)
                }
              />

              <TextInput
                placeholder="FIELD OF STUDY"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("education_fieldofstudy", val)
                }
              />

              <Button
                style={{ color: "black" }}
                title="START DATE"
                onPress={onPressButtonStartEdu}
              />
              <Text style={{ marginLeft: 30, fontSize: 15 }}>
                {this.state.starteduDateDisplay}
              </Text>
              <DateTimePickerModal
                isVisible={this.state.startedudatevisibility}
                mode="date"
                onConfirm={handleConfirmStartEdu}
                onCancel={onPressCancelStartEdu}
              />

              <Button
                style={{ color: "black" }}
                title="END DATE"
                onPress={onPressButtonEndEdu}
              />
              <Text style={{ marginLeft: 30, fontSize: 15 }}>
                {this.state.endeduDateDisplay}
              </Text>
              <DateTimePickerModal
                isVisible={this.state.endedudatevisibility}
                mode="date"
                onConfirm={handleConfirmEndEdu}
                onCancel={onPressCancelEndEdu}
              />

              <Text style={{ marginLeft: 30, marginTop: 10 }}>
                CURRENTLY ENROLLED HERE:{" "}
              </Text>
              <RadioButton.Group
                onValueChange={(checked2) => setChecked2(checked2)}
                value={checked2}
              >
                <RadioButton.Item
                  style={styles.radio}
                  label="Yes"
                  value="yes"
                  color="#1F2833"
                />
                <RadioButton.Item
                  style={styles.radio}
                  label="No"
                  value="no"
                  color="#1F2833"
                />
              </RadioButton.Group>

              <View
                style={{
                  backgroundColor: "black",
                  height: 10,
                  marginBottom: 10,
                }}
              ></View>
              <Text style={{ marginLeft: 20, color: theme.colors.lightblue }}>
                Certificate
              </Text>
              <TextInput
                placeholder="INSTITUTE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("certificate_institute", val)
                }
              />
              <TextInput
                placeholder="TITLE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("certificate_title", val)
                }
              />

              <Button
                style={{ color: "black" }}
                title="START DATE"
                onPress={onPressButtonStartCert}
              />
              <Text style={{ marginLeft: 30, fontSize: 15 }}>
                {this.state.startcertDateDisplay}
              </Text>
              <DateTimePickerModal
                isVisible={this.state.startcertdatevisibility}
                mode="date"
                onConfirm={handleConfirmStartCert}
                onCancel={onPressCancelStartCert}
              />

              <Button
                style={{ color: "black" }}
                title="END DATE"
                onPress={onPressButtonEndCert}
              />
              <Text style={{ marginLeft: 30, fontSize: 15 }}>
                {this.state.endcertDateDisplay}
              </Text>
              <DateTimePickerModal
                isVisible={this.state.endcertdatevisibility}
                mode="date"
                onConfirm={handleConfirmEndCert}
                onCancel={onPressCancelEndCert}
              />

              <Text style={{ marginLeft: 30, marginTop: 10 }}>
                IN PROGRESS:{" "}
              </Text>
              <RadioButton.Group
                onValueChange={(checked3) => setChecked3(checked3)}
                value={checked3}
              >
                <RadioButton.Item
                  style={styles.radio}
                  label="Yes"
                  value="yes"
                  color="#1F2833"
                />
                <RadioButton.Item
                  style={styles.radio}
                  label="No"
                  value="no"
                  color="#1F2833"
                />
              </RadioButton.Group>

              <View
                style={{
                  backgroundColor: "black",
                  height: 10,
                  marginBottom: 10,
                }}
              ></View>
              <Text style={{ marginLeft: 20, color: theme.colors.lightblue }}>
                SOCIAL MEDIA
              </Text>
              <TextInput
                placeholder="WEBSITE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("socials_website", val)
                }
              />
              <TextInput
                placeholder="FACEBOOK"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("socials_facebook", val)
                }
              />
              <TextInput
                placeholder="INSTAGRAM"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("socials_instagram", val)
                }
              />

              <TextInput
                placeholder="YOUTUBE"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("socials_youtube", val)
                }
              />
              <TextInput
                placeholder="LINKEDIN"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("socials_linkedin", val)
                }
              />
              <TextInput
                placeholder="GITHUB"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) => this.onChangeText("socials_github", val)}
              />

              <TextInput
                placeholder="TWITTER"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="off"
                maxLength={11}
                onChangeText={(val) =>
                  this.onChangeText("socials_twitter", val)
                }
              />
              {/* <Switch 
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={this.state.isEnabled}
                            /> */}
              {/* <DatePicker
                                style={{ width: 200 }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2012-05-01"
                                maxDate="2030-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                                
                            /> */}

              {/* <View
                style={{
                  backgroundColor: "black",
                  height: 10,
                  marginBottom: 10,
                }}
              ></View>
              <Text style={{ marginLeft: 20, color: theme.colors.lightblue }}>
                SERVICE INFO
              </Text>
              <Text style={{ marginLeft: 30, marginTop: 10 }}>
                PRIMARY SERVICE:{" "}
              </Text>
              <Picker
                selectedValue={category}
                style={[styles.textInput]}
                onValueChange={(category) => setCategory(category)}
                value={category}
              >
                <Picker.Item label="Baking" value="baking" />
                <Picker.Item label="Stitching" value="stitching" />
                <Picker.Item label="Arts and Crafts" value="arts" />
                <Picker.Item label="Development" value="development" />
              </Picker>
              <TextInput
                placeholder="DESCRIPTION"
                style={[styles.textArea]}
                placeholderTextColor="black"
                autoCompleteType="off"
                multiline={true}
              /> */}
            </View>

            <TapGestureHandler
              onHandlerStateChange={this.sellerForm
              }
            >
            <Animated.View style={styles.button}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                // onPress={this.sellerForm}
              >
                VERIFY
              </Text>
            </Animated.View>
            </TapGestureHandler>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

export default SellerSignin;

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
  textArea: {
    height: 100,
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
    marginLeft: 30,
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
