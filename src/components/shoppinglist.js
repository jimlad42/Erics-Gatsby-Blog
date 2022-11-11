import * as React from 'react'

const ShoppingList = ({ addIngredient, clearIngredients, ingredientsState }) => {
    return (
        <div style={{border: "3px solid #73AD21", margin: "20px", textAlign: "center"}}>
            <div>
                <p>You have {ingredientsState.length} items in your shopping list.</p>
                {
                    ingredientsState.map((ingredient) => (
                        <p>{ingredient}</p>
                    ))
                }
                <button onClick={() => addIngredient("ingredient")}>
                    Add Default
                </button>
                <button onClick={clearIngredients}>
                    Clear List
                </button>
            </div>
        </div>
    )
            }

export default ShoppingList