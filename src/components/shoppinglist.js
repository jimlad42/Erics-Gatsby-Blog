import React, { useState } from 'react';
import {
    shoppingList,
} from './layout.module.css'





const ShoppingList = ({ addIngredient, clearIngredients, ingredientsState, removeIngredient }) => {

    const [textBox, setTextBox] = useState("");

    function handleChange(e) {
        setTextBox(e.target.value)
    }
    function addValue() {
        if (textBox.length > 0) {
            addIngredient(textBox);
            setTextBox("");
        }
    }

    return (
        <div className={shoppingList}>
            <div>
                <p>You have {ingredientsState.length} items in your shopping list.</p>
                {
                    ingredientsState.map((ingredient) => (
                        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                            <div>{ingredient}</div>
                            <div><button onClick={()=>{removeIngredient(ingredient)}}>
                                Remove
                            </button>
                            </div>
                        </div>
                            ))
                }
                            <input type="text" onChange={handleChange} value={textBox} />
                            <button onClick={addValue}>
                                Add Value
                            </button>
                            <button onClick={clearIngredients}>
                                Clear List
                            </button>
                        </div>
        </div>
            )
}

            export default ShoppingList