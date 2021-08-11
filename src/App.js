import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/header/Header';
import axios from 'axios';
import './App.css';

function App() {

  const [searchWord, setSearchWord] = useState("");
  const [definitions, setDefinitions] = useState([]);

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
  // Calls the function the first time the component is rendered
  useEffect(() => {
    dictionaryAPI();
  }, []);

  return (
    <div className="App">
    <Container className="main" maxWidth="md">
      <Header />
    </Container>
    </div>
  );
}

export default App;
