import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
    container,
    heading,
    navLinks,
    navLinkItem,
    navLinkText,
    siteTitle,
  } from './layout.module.css'
  import { motion } from "framer-motion"

  const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
    return (
      <div className={container}>
        <header className={siteTitle}>{data.site.siteMetadata.title}</header>
        <nav>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/" className={navLinkText}>
                Home
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about" className={navLinkText}>
                About
              </Link>
            </li>
            <li className={navLinkItem}>
            <Link to="/Recipes" className={navLinkText}>
              Recipes 
            </Link>
          </li>
          </ul>
        </nav>
        <main>
        <motion.h1
                animate={{opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.5, 0.71, 1, 1.1],
                }}
                initial={{ opacity: 0, scale: 0.5 }}
            >{pageTitle}</motion.h1>
          {children}
        </main>
      </div>
    )
  }
  
export default Layout