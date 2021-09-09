import React from 'react';
import './definitions.css';

// Props from App (Search Word, Language and Meanings--data from API)
const Definitions = ({ searchWord, language, meanings }) => {
    return (
        <div className="word-definitions-container">

            {
            /* Audio file shows only if there is an audio file available in the returned data, there is a word associated with the file and the language is english */
            meanings[0] && searchWord && language === "en" && (
                <audio 
                src={ meanings[0].phonetics[0] && `https:${meanings[0].phonetics[0].audio}` }
                style={{ backgroundColor: '#fff', borderRadius: 10 }}
                controls> 
                    Sorry! Your browser doesn't support the audio element.
                </audio>
            )

            }
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
                                  <p> <strong>{ def.definition }</strong> </p>
                                  <hr style={{ backgroundColor: "black", width: "100%"}} />
                                   { def.example && (
                                       <p>
                                           <strong>Example: </strong>
                                           { def.example }
                                       </p>
                                   )}

                                   { def.synonyms && (
                                        <p>
                                           <strong>Synonyms: </strong>
                                           { def.synonyms.map((synonym) =>`${ synonym },`)}
                                       </p>
                                   )}
                                   
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
