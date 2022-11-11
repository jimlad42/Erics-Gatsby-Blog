import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import Seo from '../components/seo'
import Markdown from 'markdown-to-jsx'
import Preperation from '../components/Preperation'
import ShoppingList from '../components/shoppinglist'




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
    setIngredients(ingredientsState.concat(["Ingredient"]))
  }
  
  let clearIngredients = () => {
    localStorage.setItem('ingredients', [])
    setIngredients([])
  }


  return (
    <Layout pageTitle={node.title}>
      <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
        <div classname="Main content">
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
          Ingredients: It's giving "internal server error" and returning null, I got nothing.
          <p></p>
          Cooking Instructions:
          <Markdown>{node.recipeInstruction.value}</Markdown>
          <img src={node.mediaImage.mediaImage.url} alt=""></img>
        </div>
        <div>
          <ShoppingList addIngredient={addIngredient} clearIngredients={clearIngredients} ingredientsState={ingredientsState}></ShoppingList>
        </div>
      </div>

    </Layout>
  )
}



export const Head = () => <Seo title="Recipe Page" />

export default IndexPage