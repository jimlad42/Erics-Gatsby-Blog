import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Markdown from 'markdown-to-jsx'
import Preperation from '../components/Preperation'

const IndexPage = props => {
    const {pageContext} = props
    const {node} = pageContext
    return (
    <Layout pageTitle={ node.title }>
      Category: {node.recipeCategory[0].name}
      <p></p>
      Tags:  {node.tags.map((tag) => (
          tag.name + ", "
        ))}
      <p></p>
      { node.summary.value }
      <p></p>
      <Preperation cookTime = {node.cookingTime} prepTime = {node.preparationTime} servings = {node.numberOfServings} difficulty = {node.difficulty}/>
      <p></p>
      Ingredients: It's giving "internal server error" and returning null, I got nothing.
      <p></p>
      Cooking Instructions: 
      <Markdown>{ node.recipeInstruction.value }</Markdown>
      <img src={node.mediaImage.mediaImage.url} alt="" style="width: 100%"></img>
    </Layout>
  )
}



export const Head = () => <Seo title="Recipe Page" />

export default IndexPage