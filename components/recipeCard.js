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
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
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
}));

const RecipeCard = ({recipe}) => {
    const styles = useStyles();
    const {
        button: buttonStyles, 
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    return (
    <Card className={cx(styles.root, shadowStyles.root)}>
        <CardMedia
            className={styles.media}
            image={ recipe.recipe.image }
        />
        <CardContent>
            <p className="servingSizeText">Serves: {recipe.recipe.yield}</p>
            <p className="recipeNameText">{recipe.recipe.label}</p>
            <p className="labelText">Calories: <span className={styles.boldText}>{(Math.round(recipe.recipe.calories * 100) / 100) + " kCal"}</span></p>
            <p className="labelText">Health Labels: <span className={styles.boldText}>
                    {recipe.recipe.healthLabels.reduce((labels, label) => {
                    return labels + ", " + label
                    })}
                </span>            
            </p>
            <Button className={buttonStyles}>Details</Button>
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