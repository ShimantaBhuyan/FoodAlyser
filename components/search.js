import React from "react"
import '../styles/main.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    title: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('l')]: {
        width: '20ch',
      },
    },
  }));

const SearchRecipe = ({handleOnSearch, sortOn, onSort}) => {
    const sortFields = [
      {
        value: 'default',
        label: 'Select'
      },
      {
        value: 'yield',
        label: 'Servings',
      },
      {
        value: 'calories',
        label: 'Calories',
      }
    ]

    const classes = useStyles()
    
    const [sortField, setSortField] = React.useState('Select');

    const handleSearch = (event) => {     
        var charCode = event.key
        if(event.nativeEvent.type === "keypress" && charCode === "Enter")
            handleOnSearch(event.target.value)
        else if(event.nativeEvent.type === "click")
            handleOnSearch(document.getElementById("searchField").value)
    }

    const handleSort = (event) => {
        setSortField(event.target.value)
        onSort(event.target.value)
    }

    const sortComp = (sortON) => {
      if(sortON) {
        return (
          <TextField
                  id="sortRecipe"
                  select
                  label="Select to sort recipes"
                  value={sortField}
                  onChange={handleSort}
                  SelectProps={{
                    native: true,
                  }}
                  variant="filled"
                >
                  {sortFields.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
        )
      }
    }

    return (
        <Card className="root">
            <CardContent>
                <p color="primary" className="title">Search for food analysis</p>  
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                    id="searchField"
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleSearch}
                    />                    
                </div>
                <Button id="searchButton" type="submit" onClick={handleSearch}>Analyse</Button>
                {sortComp(sortOn)}
            </CardContent>
        </Card>
    )
}

export default SearchRecipe