import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'


export function Button2() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    let storage = localStorage.getItem('ingredients')
    if(storage){
      storage = JSON.parse(storage)
      if(storage.length > ingredients.length)
        setIngredients(storage);
    }
  });

  let click = () => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients.concat(["Ingredient"])))
    setIngredients(ingredients.concat(["Ingredient"]))
  }

  let click2 = () => {
    localStorage.setItem('ingredients', [])
    setIngredients([])
  }

  return (
    <div>
      <p>You clicked {ingredients.length} times</p>
      {
        ingredients.map((ingredient) => (
          <p>{ingredient}</p>
        ))
      }
      <button onClick={click}>
        Click me
      </button>
      <button onClick={click2}>
        Click me
      </button>
    </div>
  );
}


const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <Button2></Button2>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Sprite, an adorable feyish cat sleeping on her throne."
        src="../images/Sprite.jpg"
      />
    </Layout>
  )

  
}

export const Head = () => <Seo title="Home Page" />

export default IndexPage