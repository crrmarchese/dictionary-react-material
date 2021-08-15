import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import "./header.css";
import categories from '../../data/category';

const Header = ({language, setLanguage, searchWord, setSearchWord}) => {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            }, 
            type: 'dark',
        },
    });

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
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                        {/* Map over languages to show in dropdown */}
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
