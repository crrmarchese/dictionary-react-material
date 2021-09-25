import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import "./header.css";
import categories from '../../data/category';

const Header = ({language, setLanguage, searchWord, setSearchWord, themeMode}) => {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: themeMode ? "#222" : "#fff",
            }, 
            type: themeMode ? "light" : "dark",
        },
    });

    // Function to clear out search word when language is changed
    const handleLanguageChange = (language) => {
        setLanguage(language);
        setSearchWord("");
    }

    return (
        <div className="header">
            <span className="title">{searchWord ? searchWord : "Word Hunt"}</span>
            <div className="inputs">
                {/* Applies theme */}
                <ThemeProvider theme={darkTheme}>
                <form noValidate autoComplete="off" className="form">
                    <TextField 
                        className="search" 
                        id="search-for-word" 
                        label="Search a Word" 
                        value={ searchWord } 
                        onChange={(e) => setSearchWord(e.target.value)} 
                    />
                    <FormControl className="select">
                        <InputLabel id="label-language">Language</InputLabel>
                        <Select
                            labelId="select-language"
                            id="select-language"
                            
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                        >
                        {/* Map over languages from data/category.js to show in dropdown */}
                        {
                            categories.map((category) => (
                            <MenuItem key={category.label} value={category.label}>{ category.value }</MenuItem>
                            ))
                        }
                        
                        </Select>
                    </FormControl>
                </form>
                </ThemeProvider>
                 
            </div>
        </div>
    )
}

export default Header
