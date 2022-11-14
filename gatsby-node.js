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

// I assume that ingredients needs to be set to a different variable type.
// However, I'm not sure how.  This code gives the error:
// Schema must contain uniquely named types but contains multiple types named "DrupalGraqhQL_NodeRecipe"
/* 
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type DrupalGraqhQL_NodeRecipe implements DrupalGraqhQL_Node {
      ingredients: String
    }
  `
  createTypes(typeDefs)
}
 */

//Okay, so the imported schema's after creatSchemaCustomization...
/* 
exports.createSchemaCustomization = ({ actions: { createTypes, printTypeDefinitions } }) => {
  printTypeDefinitions({ path: './typeDefs.txt' });
}; 
*/

//And with this, we have resolved the error.
//Also it still only gives "null"
//One moment, I need to find a void to scream into because I found another dead end.
//(Asking questions scary, I may have some social anxiety issues.  Easier to just keep trying.)
//For now, I'll at least use a default value to make it easier to make it functional.
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DrupalGraqhQL_NodeRecipe: {
      ingredients: {
        type: "[String]",
        resolve(source, args, context, info) {
          return ["debug ingredient 1", "debug ingredient 2", "debug ingredient 3"]
          // return context.nodeModel.getNodeById({
          //   id: source.DrupalGraqhQL_NodeRecipe,
          //   type: "[String]",
          // })
        },
      },
    },
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
        // console.log("RESULT");
        // console.log(result);
        if (result.errors) {
          reject(result.errors)
        }
       
        const pages = result.data.Drupal.nodeRecipes.edges; 
        pages.forEach(({ node }, index) => {
          const page_path = '/Recipes' + node.path; 
          console.log(page_path);
          console.log(node.ingredients)
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
