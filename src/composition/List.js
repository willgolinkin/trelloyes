import React from 'react';
import './List.css';
import Card from './Card'

//does list in app.js call the function list here?; this is the trouble spot from the smoke test
export default function List(props) {
    return (
        <section className="List">
            <header className="List-header">
                <h2>{props.header}</h2>
            </header>
            <div className="List-cards">
                    {props.cards.map((card) => (
                        <Card
                            //so where does the card come from, it isn't in store (how is it looping over lists array, how is that array being passed to the function)
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            content={card.content}
                            onDeleteCard={props.onDeleteCard}
                        />
                    ))}
                <button type="button" className="List-add-button">
                    + Add Random Card
                </button>
            </div>
      </section>
    )
}