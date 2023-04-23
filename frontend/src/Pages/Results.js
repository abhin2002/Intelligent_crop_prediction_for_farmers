import React from 'react';

function HomePrediction(props) {
    const { data } = props;
    
    return (
        <div>
        <h1>Home Prediction</h1>
        <ul>
            {data.map(item => (
            <li key={item.id}>{item.title}</li>
            ))}
        </ul>
        </div>
    );
}

export default HomePrediction;