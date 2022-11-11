import React, { useState, useEffect } from 'react';
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'



const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
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