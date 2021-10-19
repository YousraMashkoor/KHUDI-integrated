import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';

class profileSetting extends Component{
    constructor (props) {
        super(props)
        this.state = {
            image:'https://api.adorable.io/avatars/80/abott@adorable.png',

        }
    }
  bs =()=> React.useRef(null);
  fall=()=> new Animated.Value(1);
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.panelButtonTitle} >Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.panelButtonTitle} onPress={() => { console.log("hello");}}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={console.log('close triggered')}
        style={styles.button}
        >
        <Text style={styles.panelButtonTitle} >Close</Text>
      </TouchableOpacity>
    </View>
  );


  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
    render(){
        return(
            
            <View style={{ backgroundColor: "white", height: "100%", justifyContent: "center", flex: 1 }}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.container}>
                        <BottomSheet
                            ref={this.bs}
                            snapPoints={[330, 0]}
                            renderContent={this.renderInner}
                            renderHeader={this.renderHeader}
                            initialSnap={1}
                            callbackNode={this.fall}
                            enabledGestureInteraction={true}
                        />
                        <Animated.View style={{
                            margin: 20,
                            opacity: Animated.add(0.1, Animated.multiply(1, 1.0)),
                        }}>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                                    <View
                                        style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <ImageBackground
                                            source={{
                                                uri: this.state.image,
                                            }}
                                            style={{ height: 100, width: 100 }}
                                            imageStyle={{ borderRadius: 15 }}>
                                            <View
                                            style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            }}>
                                                <Icon
                                                name="camera"
                                                size={35}
                                                color="#fff"
                                                style={{
                                                opacity: 0.7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                borderRadius: 10,
                                            }}
                                                />
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                                    John Doe</Text>
                            </View>

                            <View style={styles.action}>
                                <Feather name="phone" color="#1F2833" size={20} />
                                <TextInput
                                    placeholder="Phone"
                                    placeholderTextColor="#666666"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "#1F2833",
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.action}>
                                <FontAwesome name="envelope-o" color="#1F2833" size={20} />
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#666666"
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "#1F2833",
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.action}>
                                <FontAwesome name="globe" color="#1F2833" size={20} />
                                <TextInput
                                    placeholder="Country"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "#1F2833",
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.action}>
                                <Icon name="city" color="#1F2833" size={20} />
                                <TextInput
                                    placeholder="City"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "#1F2833",
                                        },
                                    ]}
                                />
                            </View>
                            <View style={styles.action}>
                                <Icon name="map-marker-outline" color="#1F2833" size={20} />
                                <TextInput
                                    placeholder="Street Address"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "#1F2833",
                                        },
                                    ]}
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => { }}>
                                <Text style={styles.panelButtonTitle}>Submit</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 20, fontWeight: 'bold', color: 'white' 
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
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
      shadowOpacity:0.2,
      elevation:3
    },
  });
  
  

export default profileSetting;