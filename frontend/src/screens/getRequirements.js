import React,{Component} from 'react';
import { View, Text, Button, Dimensions, TextInput, FlatList, KeyboardAvoidingView, StyleSheet, SafeAreaView, ScrollView, ImagePickerIOS } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler, State } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window');
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);

console.disableYellowBox = true;

class getRequirements extends Component{
    render(){
        return(

        <View style={styles.container}>
            <ScrollView scrollEventThrottle={16}>
                <View>
            <KeyboardAvoidingView style={{ display: "flex" }}>
                <Text style={{
                    color: "#1F2833",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 22,
                    marginVertical: 10,
                    }}>Add your Customization </Text>
                
                <View>
                    <FlatList
                        data={[
                            { key: 'Choose your flavour: chocolate, strawbery, vanella?' },
                            { key: 'Do you want chocolate chips filling?' },
                            { key: 'Toppings: chocolate chip, banana, strawberry?'},
                            { key: 'Add nuts?' },
                            { key: 'Add coconuts?' },
                            { key: 'Add cramil crunch?' },
                            { key: 'Egg less cake?'},
                        ]}
                        renderItem={({ item }) =>
                            <View style={styles.container}>
                            <Text style={styles.item}>{item.key}</Text>
                                <KeyboardAvoidingView>
                                <TextInput
                                placeholder="Your answer here"
                                style={[styles.textInput]}
                                placeholderTextColor="black"
                                autoCompleteType="off"
                                />
                                
                                </KeyboardAvoidingView>
                            </View>
                    }/>
                </View>

                <TextInput
                keyboardType="number-pad"
                placeholder="Quote Price"
                style={[styles.textInput]}
                placeholderTextColor="black"
                autoCompleteType="cc-number"
              />
              
              <TapGestureHandler
              onHandlerStateChange={() =>
                this.props.navigation.navigate("order")
              }
            >
                    <Animated.View style={styles.button}>
                        <Text
                        style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                       >SUBMIT</Text>
                    </Animated.View>
                </TapGestureHandler>
                
            </KeyboardAvoidingView>
            </View>
            </ScrollView>
        </View>
        )
    }
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
        backgroundColor: '#1F2833',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width:2,height:2},
        shadowColor:'black',
        shadowOpacity:1,
        elevation:3
    },
    container:{
        marginVertical: 10,
        backgroundColor: 'white'
    },
    item:{
        marginHorizontal: 20,
    }

});
  

export default getRequirements;