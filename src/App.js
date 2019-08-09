import React, { Component } from 'react';
import './App.css';
import List from './composition/List';
//import STORE from './STORE';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
  static defaultProps = {
    //this my answer questions about how being passed as props to other subordinate component functions
    store: {
      lists: [],
      allCards: {},
    }
  };


  constructor(props) {
    super(props)
    this.state= { store: props.store }
  }

  handleDeleteCard = (cardId) => {
    console.log('card deleted', { cardId })
    //there is some issue with the reference here; cannot get access to lists
    const { lists, allCards } = this.state.store;
    const newLists = lists.map(list => ({
      //what does the '...' do-> passes id and header as individual values
      ...list,
      cardIds: lists.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards,
      }
    })
  };

  /*handleDeleteItem = (item) => {
    console.log('handle delete item called', { item })
    const newItems = this.state.shoppingItems.filter(itm => itm !== item)
    this.setState({
      shoppingItems: newItems
    })
  }*/


  /*handleAddItem = (itemName) => {
    console.log('handle add item', { itemName })
    const newItems = [
      this.state.shoppingItems, 
      { name: itemName, checked: false }
    ]
    this.setState({
      shoppingItems: newItems
    })
  }*/

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;