// This is a card memory game. Total there are 12 cards. 6 pairs of identitical value.
// Gamers are to open cards with the same value to consider a puzzle solved.
// Author: Adrian Koh
// Email: koh.adrian.2019@gmail.com
// Date: 15 May 2021

import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';

import Card from './components/card'
import Header from './components/header'
import { GAME_SETTINGS, generateCards }  from './services/helper'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //Card Data, total 12 cards, each id is in key. status: true = open, false = close. solved = true when pair is opened correctly
      cardData: [
        { key: 0, value: 1, status: false, solved: false },
        { key: 1, value: 2, status: false, solved: false },
        { key: 2, value: 3, status: false, solved: false },
        { key: 3, value: 4, status: false, solved: false },
        { key: 4, value: 5, status: false, solved: false },
        { key: 5, value: 6, status: false, solved: false },
        { key: 6, value: 7, status: false, solved: false },
        { key: 7, value: 8, status: false, solved: false },
        { key: 8, value: 9, status: false, solved: false },
        { key: 9, value: 10, status: false, solved: false },
        { key: 10, value: 11, status: false, solved: false },
        { key: 11, value: 12, status: false, solved: false },  
      ],
      steps: 0,
      clickStart: false, //to monitor the start click of a pair
      prevCard: 0, //store previous card key opened
      match: 0 //check the number of pair matches
    }

  }

  componentDidMount () {
    this.resetGameData()
  }

  //For the cards, back value contains the number. Front value is the '??'
  flipOpen(idx) {
    let tmp = this.state.cardData
    if (this.state.clickStart) {
      this.state.steps++
      //opens card first then do check
      tmp[idx].status = true // card open
      tmp[idx].solved = true 
      this.setState({cardData: tmp})
      setTimeout( () => {
        //after timeout, check result
        if (tmp[this.state.prevCard].value !== tmp[idx].value) {
          tmp[idx].status = false // card close
          tmp[idx].solved = false 
          tmp[this.state.prevCard].status = false // card close
          tmp[this.state.prevCard].solved = false 
        } else {
          this.state.match++
          if (this.state.match >= 6) this.showAlert()
        }
        this.setState({cardData: tmp})
      }, GAME_SETTINGS.cardOpenDelay)
      this.setState({clickStart: false})
    } else {
      //first click.
      tmp[idx].status = true // card open
      tmp[idx].solved = true 
      this.setState({prevCard: idx, clickStart: true})
    }
    
    this.setState({cardData: tmp})
  }

  //function to reset the game cards data
  resetGameData() {
    let cards = generateCards()
    // convert the results generated into our state
    let buffer = this.state.cardData
    cards.map ( item => {
      buffer.find( e => {
        if ((e.key === item.i) || (e.key === item.n)) {
          e.value = item.v
          e.status = false
          e.solved = false
        }
      })
    })
    this.setState({cardData: buffer, steps: 0, match: 0, clickStart: false})
  }

  displayCard (card) {
    return (
      <TouchableOpacity 
        onPress={()=> (!card.solved) ? this.flipOpen(card.key) : ''} 
        style={{ flex: 1 }} activeOpacity={1} key={card.key}>
          <Card frontValue='??' backValue={card.value} status={card.status} />
      </TouchableOpacity>
    )
  }

  showAlert () {
    alert('Restart Game')
    this.resetGameData()
  }

//static alert(title, message?, buttons?, options?)
  render() {
    const { cardData, steps, match } = this.state
    
    return (
      //(match >= 6) ? this.showAlert() :
      <View style={styles.container}>
        <Header steps={steps} />

        <View style={styles.row}>
        { //row 1
          cardData.filter( (element, indx) => { if (indx < 3) return element }).map ( (item) => {
            return this.displayCard(item)
          })
        }
        </View>
        <View style={styles.row}>
        { //row 2
          cardData.filter( (element, indx) => { if ((indx >= 3) && (indx < 6)) return element }).map ( (item) => {
            return this.displayCard(item)
          })
        }
        </View>
        <View style={styles.row}>
        { //row 3
          cardData.filter( (element, indx) => { if ((indx >= 6) && (indx < 9)) return element }).map ( (item) => {
            return this.displayCard(item)
          })
        }
        </View>
        <View style={styles.row}>
        { //row 4
          cardData.filter( (element, indx) => { if ((indx >= 9) && (indx < 12)) return element }).map ( (item) => {
            return this.displayCard(item)
          })
        }
        </View>
      </View>
    ) 
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  }
});

export default App;