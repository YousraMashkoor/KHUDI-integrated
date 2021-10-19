import React,{Component} from 'react';
import { View, Text, Dimensions,  KeyboardAvoidingView, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating'

class review extends Component{
    render(){
        return(
            
            <View style={{backgroundColor:"white",height:"100%", justifyContent:"center", flex:1}}>
                <KeyboardAvoidingView behavior="padding">
                    <Text style={styles.title}>{this.props.name}</Text>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-end', paddingLeft: 40 }}>
                                    <StarRating
                                        
                                        disable={true}
                                        maxStars={5}
                                        rating={this.props.rating}
                                        starSize={15}
                                        fullStarColor='orange'
                                    />
                            </View>
                    <Text style={styles.textInput}>{this.props.review}</Text>
                    
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput:{
        color:'black',

        borderRadius:25,
        borderWidth:0.5,
        marginHorizontal:40,
        marginVertical:5,
        borderColor:'white',
        opacity:0.5,
        alignItems:'center',
        justifyContent:'center',
      },
    title:{
        color:'black',
        borderRadius:25,
        borderWidth:0.5,
        marginHorizontal:40,
        marginTop:5,
        borderColor:'white',
        opacity:0.5,
        alignItems:'center',
        justifyContent:'center',
        fontSize:20
      },

});
  

export default review;