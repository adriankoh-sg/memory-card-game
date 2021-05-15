import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: this.props.steps
        }
    }

    componentDidMount () {
        this.setState({steps: this.props.steps})
    }

    render () {
        return (
            <View style={ styles.row }>
                <Text style={styles.typo}>STEPS: {this.props.steps}</Text>
            </View>
        )
    }
} //end of class

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5,
        height: 35
      },
    typo: {
        fontSize: 16,
        color: '#000'
    }
})
export default Header;