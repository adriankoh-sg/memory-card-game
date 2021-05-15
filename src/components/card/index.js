import React, { Component } from "react";
import { View, StyleSheet, Text, Animated, Image } from "react-native";
import { GAME_SETTINGS } from '../../services/helper'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frontValue: this.props.frontValue,
            backValue:  this.props.backValue,
            flip: new Animated.Value(0)
        }
    }

    flipOpen () { //animate here
        Animated.timing(this.state.flip, {
            duration: GAME_SETTINGS.cardFlipDelay,
            toValue: !this.props.status ? 0 : 180,
            useNativeDriver: true
        }).start()  
    }

    componentDidMount() {
        this.setState({
            frontValue: this.props.frontValue,
            backValue: this.props.backValue,
        });
        this.flipOpen()
    }

    componentDidUpdate() {
        this.flipOpen()
    }

    render() {
        const { flip } = this.state
        const interpolatedValueFront =  flip.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
        });
        
        const interpolatedValueBack = flip.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
        });
        
        const rotateFront = {
            transform: [{ rotateY: interpolatedValueFront }]
        }
        
        const rotateBack = {
            transform: [{ rotateY: interpolatedValueBack } ]
        };

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.hidden, styles.front, rotateFront ]}>
                    <Image style={styles.tinyLogo} source={require('../../../assets/images/Singtel-Logo-Reverse-White.png')} />
                    {/* <Text style={styles.text}>{this.props.frontValue}</Text> */}
                </Animated.View>
                <Animated.View style={[styles.hidden, styles.back, rotateBack ]}>
                    <Text style={styles.text}>{this.props.backValue}</Text>
                </Animated.View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 3
    },
    back: {
        position: 'absolute',
        top: 0,
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#eee', 
        padding: 10, 
        borderRadius: 15, 
        borderWidth: 3, 
        borderColor: '#ccc',
        width: '100%',
        height: '100%' 
    },
    front: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#de4864', 
        padding: 10, 
        borderRadius: 15, 
        borderWidth: 3, 
        borderColor: '#ccc'       
    },
    text: {
        color: '#000',
        fontSize: 18
    },
    hidden: {
        backfaceVisibility: 'hidden'
    },
    tinyLogo: {
        width: 90,
        height: 50,
        resizeMode: 'contain'
    }
})

export default Card;
