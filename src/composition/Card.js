import React from 'react';
import './Card.css';

export default function Card(props) {
    return (
        <div className="Card">
            <button 
                    onClick={()=> props.onDeleteCard(props.id)}
                    type='button'>
                delete card
            </button>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    )
}

//unsure of what purpose this serves for the solution.
Card.propTypes= {
    onDeleteCard: () => {}
}

//can I assume that 'allCards from Store is the 'prop' being passed to function Card ()?
