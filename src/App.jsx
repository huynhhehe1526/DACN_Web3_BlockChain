import { useEffect, useState } from 'react'
import './style/App.css'

import Header from './component_page/layout/header'
import Footer from './component_page/layout/footer'
import HomePage from './component_page/page/homepage'

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}

export default App
