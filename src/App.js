import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import axios from 'axios';
import './App.css';

function App() {

  // Search word user types in "Search a Word" field
  const [searchWord, setSearchWord] = useState("");
  // Store data from API (Object > data > meanings > definitions)
  const [meanings, setMeanings] = useState([]);
  // Set the Language to English on initial load
  const [language, setLanguage] = useState("en");

// Set up Dictionary API
// async makes a function return a Promise
// await makes a function wait for a Promise
  const dictionaryAPI = async() => {
    // fetch data based on the user language selected and search word typed
    // In order to change the API, must use dynamic variables in the URL
    try {
      const apiData = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${language}/${searchWord}`);
      // console.log(apiData); // Returns entire API to view data included
      setMeanings(apiData.data); // Get the API Object > Data array and put it into the state
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(meanings); // Returns the API Object > Data array 
  // Calls the function the first time the component is rendered to populate "Language" dropdown; In the dependency array, we need to call the API everytime we change the language, or search word.
  useEffect(() => {
    dictionaryAPI();
  }, [searchWord, language]);

  return (
    <div className="App">
    <Container className="main" maxWidth="md">
      <Header language={ language } setLanguage={ setLanguage } searchWord={ searchWord } setSearchWord={ setSearchWord } />
      {/* If there is a definition, render the definition. If no definition, this doesn't show. */}
      {meanings && (
      <Definitions searchWord={ searchWord } meanings={ meanings } language={ language }/>
      )}
      
    </Container>
    </div>
  );
}

export default App;
