import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import ShoppingList from '../../components/shoppinglist'

const ReciepePage = ({ data }) => {
  console.log(data.Drupal.nodeRecipes.edges)

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
    <Layout pageTitle="List of Recipes">
      <div style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
        <div classname="Main content">
          {

            data.Drupal.nodeRecipes.edges.map((node) => (
              <article key={node.node.id}>
                <Link to={'/Recipes' + node.node.path}>
                  {node.node.title}
                </Link>
              </article>
            ))
          }
        </div>
        <div>
          <ShoppingList addIngredient={addIngredient} clearIngredients={clearIngredients} ingredientsState={ingredientsState} removeIngredient={removeIngredient}></ShoppingList>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`query {
    Drupal {
      nodeRecipes(first: 100) {
        edges {
          node {
            path
            title
            id
          }
        }
      }
    }
  }`

export const Head = () => <Seo title="The Recipes" />

export default ReciepePage