import React from "react";
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
//import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import "../styles/main.css";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    marginTop: '50px !important',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    contentVisibility: 'auto'
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  boldText: {
      fontWeight: 'bold',
  },
  button: {
    fontSize: "0.875rem !important",
    minWidth: "64px !important",
    boxSizing: "border-box !important",
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif !important",
    fontWeight: "500 !important",
    lineHeight: "1.75 !important",
    borderRadius: "4px !important",
    letterSpacing: "0.02857em !important",
    textTransform: "uppercase !important"
  },
  recipeCardContent: {
    maxHeight: "300px !important",
    overflowY: "hidden !important"
  }
}));

const RecipeCard = ({recipe}) => {
    const styles = useStyles();

    const {
        button: buttonStyles, 
        ...contentStyles
    } = useBlogTextInfoContentStyles();

    const shadowStyles = useOverShadowStyles();

    const showNutrients = (event) => {
      const actionButton = event.target
      const nutrientCard = actionButton.parentNode.nextElementSibling
      if(!nutrientCard) {
        actionButton.parentNode.classList.remove("up")
        actionButton.parentNode.classList.add("down")
        //actionButton.parentNode.previousElementSibling.style.display = "block";
        if(actionButton.parentNode.previousElementSibling.classList.contains("down")) {
          actionButton.parentNode.previousElementSibling.classList.remove("down")
        }
        //actionButton.parentNode.previousElementSibling.classList.add("up")
      }
      else if(nutrientCard.classList.contains("down")) {
        if(actionButton.parentNode.classList.contains("up")) {
          actionButton.parentNode.classList.remove("up")
        }
        actionButton.parentNode.classList.add("down")
        //actionButton.parentNode.style.display = "none"
        nutrientCard.classList.remove("down")
        nutrientCard.classList.add("up")
      }
    }

    return (
    <Card className={cx(styles.root)}>
        <CardMedia
            className={styles.media}
            image={ recipe.recipe.image }
        />
        <CardContent className={styles.recipeCardContent}>
              <div className="recipeDataContent">
                <p className="servingSizeText">Serves: {recipe.recipe.yield}</p>
                <p className="recipeNameText">{recipe.recipe.label}</p>
                <p className="labelText">Calories: <span className={styles.boldText}>{(Math.round(recipe.recipe.calories * 100) / 100) + " Cal"}</span></p>
                <p className="labelText">Health Labels: <span className={styles.boldText}>
                        {recipe.recipe.healthLabels.length ? recipe.recipe.healthLabels.reduce((labels, label) => {
                        return labels + ", " + label
                        }) : "N.A."
                        }
                    </span>            
                </p>            
                <button className={styles.button, cx(shadowStyles.root)} onClick={showNutrients}>Nutrient Details</button>
              </div>
              <div className="down">           
                <p className="recipeNameText">Basic Nutrient Information</p> 
                <p className="labelText">Fats: <span className={styles.boldText}>{(Math.round(recipe.recipe.digest[0].total * 100) / 100) + " Cal"}</span></p>
                <p className="labelText">Carbs: <span className={styles.boldText}>{(Math.round(recipe.recipe.digest[1].total * 100) / 100) + " Cal"}</span></p>   
                <p className="labelText">Protein: <span className={styles.boldText}>{(Math.round(recipe.recipe.digest[2].total * 100) / 100) + " Cal"}</span></p>    
                <button className={styles.button, cx(shadowStyles.root)} onClick={showNutrients}>Back</button>  
              </div>
        </CardContent>
    </Card>
    )
}

// const Recipe = ({recipe}) => {
//     console.log(recipe)
//     var recipeImageStyle = {
//         backgroundImage: 'url("'+recipe.recipe.image+'")',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         margin: '0 auto',
//         width: '100px',
//         height: '100px',
//         borderRadius: '100px',        
//     }
//     return (
//         <Card className="recipeCard">
//             <CardContent>  
//                 <div>                    
//                     <div className="recipeImage"  style={recipeImageStyle}/>
//                     <p color="primary" className="title">{recipe.recipe.label}</p>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

export default RecipeCard