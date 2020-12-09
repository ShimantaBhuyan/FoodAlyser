import React, { useState, useEffect } from "react";

import SearchRecipe from "./search";
import RecipeCard from "./recipeCard";

import '../styles/main.css';

const App = () => {

    let [recipeQuery, setRecipeQuery] = useState("")
    let [recipeDataMsg, setRecipeDataMsg] = useState("")
    let [recipes, setRecipe] = useState({})
    
    // componentDidMount: Load recipes from json file(later from Edamam API)
    // useEffect (() => {
    //     fetchData()
    // }, [])

    const fetchData = async (value) => {
        setRecipeQuery("")
        console.log("Value entered: " + value)
        if(value == "dal makhani") 
            fetch("./dalmakhani.json")
            .then((res) => res.json())
            .then(async (data) => {
                console.log(data)
                await setRecipeQuery(data)  
                setRecipeDataMsg("")
            })
        else{
            if(value=="")
                setRecipeDataMsg("Please enter some recipe name to search")
            else
                setRecipeDataMsg("Recipe not found! Please check again")
        }
    }

    const handleSearch = (value) => { 
        console.log(String(recipeQuery.q).toUpperCase())
        if(!recipeQuery.length && String(value).toUpperCase() != String(recipeQuery.q).toUpperCase())
            fetchData(value)
    }

    return (
        <div className="main">        
            <h1 id="headerText">FoodAlyser!</h1>            
            <SearchRecipe handleOnSearch={handleSearch}/>
            {
                recipeQuery != "" ?
                <div className="recipesContainer">
                    {
                        recipeDataMsg == "" ? 
                            recipeQuery.hits.map((recipeItem, index) => {
                                return (
                                    <RecipeCard recipe={recipeItem} key={index} />
                                )                
                            }) 
                        : <p className="messageText">{recipeDataMsg}</p>
                    }
                </div> 
                : (
                    <div className="recipesContainer">
                        <p className="messageText">{recipeDataMsg}</p>
                    </div>
                )
                // recipeQuery != "" ?             
                // <div className="recipesContainer">
                // {
                //     recipeQuery.hits.map((recipeItem, index) => {
                //         return (
                //             <RecipeCard recipe={recipeItem} key={index}/>
                //         )                
                //     })   
                // }          
                // </div>
                // : recipeDataMsg
            }
            <div id="iconsAttribution">
                Icons by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
            <div id="edamam-badge" data-color="transparent"></div>
        </div>
    )
}

export default App;