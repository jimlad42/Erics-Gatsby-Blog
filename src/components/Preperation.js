import * as React from 'react'
import { motion } from "framer-motion"

const Preperation = ({ prepTime, cookTime, servings, difficulty }) => {
    return (
            <motion.div animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 1.2,
                    delay: 0.4,
                    ease: [0.5, 0.71, 1, 1.1],
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>

                <div>
                    Prep time: {prepTime} Minutes
                    <p></p>
                    Difficulty: {difficulty}
                </div>
                <div>
                    Cooking Time: {cookTime} Minutes
                    <p></p>
                    Serves: {servings}
                </div>
            </motion.div>
    )
}

export default Preperation