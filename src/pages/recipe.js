import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import Seo from '../components/seo'
import Markdown from 'markdown-to-jsx'
import Preperation from '../components/Preperation'
import ShoppingList from '../components/shoppinglist'
import {
  recipe,
  ingredientList,
} from '../components/layout.module.css'




const IndexPage = props => {
  const { pageContext } = props
  const { node } = pageContext

  const [ingredientsState, setIngredients] = useState([]);
  useEffect(() => {
    let storage = localStorage.getItem('ingredients')
    if (storage) {
      storage = JSON.parse(storage)
      if (storage.length > ingredientsState.length)
        setIngredients(storage);
    }
  });

  let addIngredient = (ingredient) => {
    localStorage.setItem('ingredients', JSON.stringify(ingredientsState.concat([ingredient])))
    setIngredients(ingredientsState.concat([ingredient]))
  }

  let clearIngredients = () => {
    localStorage.setItem('ingredients', [])
    setIngredients([])
  }

  let removeIngredient = (ingredient) => {
    let newState = ingredientsState
    newState.splice(newState.indexOf(ingredient), 1)
    localStorage.setItem('ingredients', JSON.stringify(newState))
    //I don't know why passing the newstate isn't working, and by this point I don't care.
    //This works.
    setIngredients(JSON.parse(localStorage.getItem('ingredients')))
  }


  return (
    <Layout pageTitle={node.title}>
      <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
        <div className={recipe}>
          Category: {node.recipeCategory[0].name}
          <p></p>
          Tags:  {node.tags.map((tag) => (
            tag.name + ", "
          ))}
          <p></p>
          {node.summary.value}
          <p></p>
          <Preperation cookTime={node.cookingTime} prepTime={node.preparationTime} servings={node.numberOfServings} difficulty={node.difficulty} />
          <p></p>
          <div className={ingredientList}>
            Ingredients: (Click to add to shoppinglist)
            {node.ingredients.map((ingredient) => (
            <div onClick={()=>addIngredient(ingredient)}> {ingredient + ", "} </div>
            ))}
            It's giving "internal server error" and returning null, I got nothing.
          </div>
          <p></p>
          Cooking Instructions:
          <Markdown>{node.recipeInstruction.value}</Markdown>
          <img src={node.mediaImage.mediaImage.url} alt=""></img>
        </div>
        <div>
          <ShoppingList addIngredient={addIngredient} clearIngredients={clearIngredients} ingredientsState={ingredientsState} removeIngredient={removeIngredient}></ShoppingList>
        </div>
      </div>

    </Layout>
  )
}



export const Head = () => <Seo title="Recipe Page" />

export default IndexPage