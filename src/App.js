import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import axios from 'axios';
import './App.css';

function App() {

  // Search word user types in "Search a Word" field
  const [searchWord, setSearchWord] = useState("");
  // Store data from API (Object > data > meanings > definitions)
  const [meanings, setMeanings] = useState([]);
  // Set the Language to English on initial load
  const [language, setLanguage] = useState("en");
  // Set state for Light/Dark Mode; set lightMode to false so darkMode is the default
  const [lightMode, setLightMode] = useState(false);


  // Light/Dark Theme Switch
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);


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

  // console.log(meanings); // Returns the API Object > Data array 
  // Calls the function the first time the component is rendered to populate "Language" dropdown; In the dependency array, we need to call the API everytime we change the language, or search word.
  useEffect(() => {
    dictionaryAPI();
  }, [searchWord, language]);

  return (
    <div className="App" 
      style= {{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "#222" : "#fff",
        transition: "all 0.75s linear"
      }}
    >
    <Container className="main" maxWidth="md">
      <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10, paddingBottom: 25}}>
        <span>{lightMode ? "Dark" : "Light"} Mode</span>
        <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)}/>
      </div>
      <Header language={ language } setLanguage={ setLanguage } searchWord={ searchWord } setSearchWord={ setSearchWord } themeMode={lightMode} />
      {/* If there is a definition, render the definition. If no definition, this doesn't show. */}
      {meanings && (
      <Definitions searchWord={ searchWord } meanings={ meanings } language={ language } themeMode={lightMode} />
      )}
      
    </Container>
    </div>
  );
}

export default App;
