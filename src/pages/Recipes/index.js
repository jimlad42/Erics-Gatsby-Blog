import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const ReciepePage = ({ data }) => {
    console.log(data.Drupal.nodeRecipes.edges)
  return (
    <Layout pageTitle="List of Recipes">
      {
        data.Drupal.nodeRecipes.edges.map((node) => (
          <article key={node.node.id}>
            <Link to={'/Recipes' + node.node.path}>
            {node.node.title}
            </Link>
          </article>
        ))
      }
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
          }
        }
      }
    }
  }`

export const Head = () => <Seo title="The Recipes" />

export default ReciepePage