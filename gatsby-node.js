const path = require('path');

// Create a slug for each recipe and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
  
  const { createNodeField } = actions
  const slug = '/node/' + node.id; 
  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/pages/recipe.js`)

    // page building queries
    resolve(
      graphql(
        `query {
          Drupal {
            nodeRecipes(first: 100) {
              edges {
                node {
                  path
                  title
                  preparationTime
                  difficulty
                  cookingTime
                  id
                  recipeInstruction {
                    value
                  }
                  summary {
                    value
                  }
                  mediaImage {
                    mediaImage {
                      height
                      url
                      width
                    }
                  }
                  numberOfServings
                  recipeCategory {
                    name
                  }
                  tags {
                    name
                  }
                  ingredients
                }
              }
            }
          }
        }`
      ).then(result => {
        // shows during build/dev
        //console.log("RESULT");
        //console.log(result);
        if (result.errors) {
          reject(result.errors)
        }
       
        const pages = result.data.Drupal.nodeRecipes.edges; 
        pages.forEach(({ node }, index) => {
          const page_path = '/Recipes' + node.path; 
          console.log(page_path);
          createPage({
            path: `${page_path}`,
          
            component: pageTemplate,
            context: {
              node: node
            },
          })
        })
      })
    )
  });
}
