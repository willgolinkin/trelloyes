import React, { Component } from 'react';
import './App.css';
import List from './composition/List';

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
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
    console.log('card deleted', {cardId});
    //some issue with the reference here; cardId not being passed
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      //passes id and header as individual values
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  }; 

  handleAddRandomCard = (listId) => {
    console.log('added new card');
  
    const newCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => {
      if(list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard,
        }
      }
    })
  }
  
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

    //console.log({store});

    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onAddRandomCard={this.handleAddRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;