import React, { useState, useEffect } from "react";

import SearchRecipe from "./search";
import RecipeCard from "./recipeCard";

import '../styles/main.css';

const App = () => {

    let [recipeQuery, setRecipeQuery] = useState("")
    let [recipeDataMsg, setRecipeDataMsg] = useState("")
    let [recipes, setRecipes] = useState({})
    
    // componentDidMount: Load recipes from json file(later from Edamam API)
    // useEffect (() => {
    //     fetchData()
    // }, [])

    const fetchData = async (value) => {
        setRecipeQuery("")        
        if(value=="")
            setRecipeDataMsg("Please enter some recipe name to search")
        else {   
            fetch(encodeURI("https://api.edamam.com/search?q=" + value + "&app_id=64d76e5e&app_key=6c46774bcd7dafb42a9ca8cee959f57b"))
            .then((res) => { 
                if(res.status == 200)
                    return res.json() 
                else {
                    setRecipeDataMsg("Recipe not found! Please check again")
                }
            })
            .then(async (data) => {
                if(data.hits.length == 0)                    
                    setRecipeDataMsg("Recipe not found! Please check again")
                else {
                    setRecipeQuery(data)  
                    setRecipeDataMsg("")
                }
            })
        }
    }

    const handleSearch = (value) => { 
        if(!recipeQuery.length && String(value).toUpperCase() != String(recipeQuery.q).toUpperCase())
            fetchData(value)
    }

    const handleSort = (value) => {
        //alert(value)
        var sortedRecipes = {...recipeQuery}
        if(value == "yield") {
            sortedRecipes.hits.sort((recipe1, recipe2) => {
                return recipe1.recipe.yield - recipe2.recipe.yield
            })
        }
        else if(value == "calories") {
            sortedRecipes.hits.sort((recipe1, recipe2) => {
                return recipe1.recipe.calories - recipe2.recipe.calories
            })
        }
        setRecipeQuery(sortedRecipes)
    }

    return (
        <div className="main">        
            <h1 id="headerText">FoodAlyser!</h1> 
            {
                recipeQuery != "" ?
                <>           
                    <SearchRecipe handleOnSearch={handleSearch} sortOn={true} onSort={handleSort}/>
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
                </>
                : (
                    <>           
                        <SearchRecipe handleOnSearch={handleSearch} />
                        <div className="recipesContainer">
                            <p className="messageText">{recipeDataMsg}</p>
                        </div>
                    </>
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