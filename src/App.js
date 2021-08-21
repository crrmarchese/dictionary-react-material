import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import axios from 'axios';
import './App.css';

function App() {

  // Search word user types in "Search a Word" field
  const [searchWord, setSearchWord] = useState("");
  // Set Languages from data/category.js file to populate Languages dropdown list
  const [definitions, setDefinitions] = useState([]);
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
      // console.log(apiData);
      setDefinitions(apiData.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(definitions);
  // Calls the function the first time the component is rendered to populate "Language" dropdown; In the dependency array, we need to call the API everytime we change the language, or search word.
  useEffect(() => {
    dictionaryAPI();
  }, [searchWord, language]);

  return (
    <div className="App">
    <Container className="main" maxWidth="md">
      <Header language={ language } setLanguage={ setLanguage } searchWord={ searchWord } setSearchWord={ setSearchWord } />
      {/* if there is a definition, render the definition, if no definition, this doesn't show */}
      {definitions && (
      <Definitions searchWord={ searchWord } definitions={ definitions } language={ language }/>
      )}
      
    </Container>
    </div>
  );
}

export default App;
