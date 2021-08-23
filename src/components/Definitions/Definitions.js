import React from 'react';
import './definitions.css';

// Props from App (Search Word, Language and Meaning--data from API)
const Definitions = ({ searchWord, language, meanings }) => {
    return (
        <div className="word-definitions">
            {
                searchWord === "" ? (<span className="subtitle">Start by typing a word in Search</span>) : (
                    // Map through each item in data array > meanings array
                    meanings.map((meaning) => 
                        //console.log(meaning);
                        // map through each array item in the meanings array
                         meaning.meanings.map((item) => (
                            //console.log(item);
                            item.definitions.map((def) => (
                                <div className="word-definition" style={{ backgroundColor: "white", color: "black"}}>
                                   {def.definition} 
                                   <hr style={{ backgroundColor: "black", width: "100%"}} />
                                   {def.example && (
                                       <span>
                                           <strong>Example: </strong>
                                           {def.example}
                                       </span>
                                   )

                                   }
                                </div>
                            )
                        ))
                    )
                )
            )}
        </div>
    )
}

export default Definitions
