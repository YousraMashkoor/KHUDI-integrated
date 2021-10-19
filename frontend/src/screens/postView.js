import React,{Component} from 'react';
import { TouchableOpacity, ImageBackground, View, Text, Image, Dimensions, TextInput, Alert, Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'

import * as theme from '../theme';
import Review from '../component/review'
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');


class postview extends Component{
    render(){
        return(
            
            <View style={{backgroundColor:"white",height:"100%",  flex:1}}>
                <ImageBackground
                    source={this.props.route.params.img}
                    style={styles.image}
                    imageStyle={{borderBottomLeftRadius:30, borderBottomRightRadius:30}}
                    >
                        
                        <View style={styles.contentHeader}>
                            <Text style={styles.tagline}>{this.props.route.params.name}</Text>
                            <View style={{ alignItems: 'flex-start',marginBottom:10, justifyContent: 'flex-end', paddingLeft: 20 }}>
                                    <StarRating
                                        
                                        disable={true}
                                        maxStars={5}
                                        rating={this.props.route.params.rating}
                                        starSize={25}
                                        fullStarColor='orange'
                                    />
                            </View>
                        </View>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{position:'absolute', left:20, top:40,
                            backgroundColor:theme.colors.lightblue, padding:10, borderRadius:40}}>
                            <Feather name='arrow-left' size={24} color='#fff'/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:'absolute', right:20, top:40,
                            backgroundColor:theme.colors.lightblue, padding:10, borderRadius:40}}>
                            <Feather name='heart' size={24} color='#fff'/>
                        </TouchableOpacity>

                </ImageBackground>

                <TouchableOpacity style={styles.orderbtn} onPress={() =>
              this.props.navigation.navigate("getRequirements")}>
                    <Text style={{color:theme.colors.blue, fontWeight:'bold',fontSize: 19}}>Order</Text>
                </TouchableOpacity>

                <ScrollView>
                    <Text style={{fontSize:30,color:'orange',marginTop:40,marginHorizontal:20, paddingRight:40}}>{this.props.route.params.type}</Text>
                    <Text style={styles.title}>About </Text>
                    <Text style={styles.details}>{this.props.route.params.details} </Text>                    
                    <Text style={{marginHorizontal:40, color:theme.colors.blue, fontWeight:'bold', fontSize:theme.sizes.font+7, paddingVertical:5}}>{'Category: '} {this.props.route.params.category}</Text>
                    <Text style={{marginHorizontal:40, color:theme.colors.blue, fontWeight:'bold', fontSize:theme.sizes.font+7, borderTopColor:theme.colors.lightblue , borderTopWidth: 2, paddingVertical:5}}>Price: {this.props.route.params.price}/- Pkr</Text>                   
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('profileView')} style={styles.tag}>
                        <Text style={{marginLeft:20, color:'white', fontWeight:'bold', fontSize:theme.sizes.font+7 , textTransform:'capitalize'}}>View Seller Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat')} style={styles.tag}>
                        <Text style={{marginLeft:20, color:'white', fontWeight:'bold', fontSize:theme.sizes.font+7 , textTransform:'capitalize'}}>Contact Seller</Text>
                    </TouchableOpacity>
                    <Text style={{marginHorizontal:40, color:theme.colors.blue, fontWeight:'bold', fontSize:theme.sizes.font+7, borderBottomColor:theme.colors.lightblue , borderBottomWidth: 2, paddingVertical:5}}>Reviews:</Text>                   
                    
                    <Review
                        name="Ayesha Israr"
                        review="Awsome service will surely buy again."
                        rating={5}
                    />
                    <Review
                        name="Huba Amir"
                        review="Okaish service needs a bit more improvement"
                        rating={4}
                    />

                </ScrollView>
            </View>
        )
    }
}
  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height: 380,
        justifyContent:'flex-end',
    },
    contentHeader: {
        backgroundColor: 'transparent',
        padding: 0,
        display:'flex',
        backgroundColor: '#1F2833',
        borderBottomLeftRadius: theme.sizes.radius,
        borderBottomRightRadius: theme.sizes.radius,
        justifyContent:'center',
        marginTop: -theme.sizes.padding / 2,
        
      },
      title: {
        fontSize: theme.sizes.font+10,
        fontWeight: 'bold',
        paddingLeft:20,
        marginTop:20
      },
      tagline:{
          color:'white',
          fontSize: 24,
          paddingHorizontal:14,
          alignItems:'center',
          justifyContent:'center',
          marginTop:10,
          textTransform: 'capitalize'
          
      },
      orderbtn:{
          position:'absolute',
          right:12,
          top:350,
          backgroundColor:theme.colors.lightblue,
          padding: 16,
          borderRadius:40
      },
      tag:{
        marginVertical:5,
        marginHorizontal:20,
        backgroundColor:theme.colors.blue,
        padding: 16,
        borderRadius:40

      },
      details:{
        color:theme.colors.blue,
        marginHorizontal:20, 
        fontSize:20
      }
  });

export default postview;