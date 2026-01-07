import React from 'react'
import Header from './1. Header/Header'
import Section from './2. Section/Section'
import Article from './3. Article/Article'
import Article2 from './4. Article2/Article2'
import { AppProvider } from '../context/AppContext'



export default function Wrap() {
  return (
    <AppProvider>
      <div
          style={{
              width : '80%',
              margin : '30px auto',
          }}
      >
        <Header />
        <Section />
        <Article />
        <Article2 />
      </div>
    </AppProvider>
  )
}