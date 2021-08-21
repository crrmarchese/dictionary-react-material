import React from 'react';
import './definitions.css';

const Definitions = ({ searchWord, language, definitions }) => {
    return (
        <div className="word-definitions">
            {
                searchWord === "" ? (<span className="subtitle">Start by typing a word in Search</span>) : (
                    "Something"
                )
            }
        </div>
    )
}

export default Definitions
