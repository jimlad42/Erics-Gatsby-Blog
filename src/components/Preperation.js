import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText,
    siteTitle,
    column,
    row,
  } from './layout.module.css'
import { motion } from "framer-motion"

const Preperation = ({prepTime, cookTime, servings, difficulty}) => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
            <motion.div animate={{opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.5, 0.71, 1, 1.1],
                }}
                initial={{ opacity: 0, scale: 0.5 }}
            >
                Prep time: { prepTime } Minutes
                <p></p>                    
                Difficulty: { difficulty }
            </motion.div>
            <motion.div animate={{opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.5, 0.71, 1, 1.1],
                }}
                initial={{ opacity: 0, scale: 0.5 }}
            >
                Cooking Time: { cookTime } Minutes
                <p></p>
                Serves: {servings}
            </motion.div>
        </div>
    )
}

export default Preperation