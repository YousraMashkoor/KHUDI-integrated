import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StarRating from 'react-native-star-rating'
class card extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => (
            {
                rating: this.props.rating,
                price:this.props.price,
                img:this.props.img,
                status1:this.props.status1,
                status2:this.props.status2,
                name:this.props.name,
                type:this.props.type,
                details:this.props.details}

            )} >
            
            <View style={{ width: this.props.width/1.2, height: this.props.width / 2 - 30, borderWidth: 0.5, borderColor: '#dddddd' , backgroundColor:'#FFF', marginVertical:5}}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                            source={this.props.img} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10 }}>
                        <Text style={{ fontSize: 10, color: '#b63838' }}>Seller Status: {this.props.status1}</Text>
                        <Text style={{ fontSize: 10, color: '#b63838' }}>Order Status: {this.props.status2}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{this.props.name}</Text>
                        <Text style={{ fontSize: 10 }}>{this.props.price} pkr</Text>
                        <StarRating
                            disable={true}
                            maxStars={5}
                            rating={this.props.rating}
                            starSize={10}

                        />
                    </View>
            </View>
            </TouchableOpacity>
        );
    }
}
export default card;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});