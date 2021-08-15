import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import axios from 'axios';
import './App.css';

function App() {

  // Search word user types in "Search a Word" field
  const [searchWord, setSearchWord] = useState("");
  // Languages from data/category.js file to populate dropdown list
  const [definitions, setDefinitions] = useState([]);
  // 
  const [language, setLanguage] = useState("en");

// Set up Dictionary API
// async makes a function return a Promise
// await makes a function wait for a Promise
  const dictionaryAPI = async() => {
    // fetch data
    try {
      const apiData = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/plane");
      //console.log(apiData);
      setDefinitions(apiData.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(definitions);
  // Calls the function the first time the component is rendered to populate "Language" dropdown
  useEffect(() => {
    dictionaryAPI();
  }, []);

  return (
    <div className="App">
    <Container className="main" maxWidth="md">
      <Header language={ language } setLanguage={ setLanguage } searchWord={ searchWord } setSearchWord={ setSearchWord } />
    </Container>
    </div>
  );
}

export default App;
