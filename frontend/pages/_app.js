import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import Head from 'next/head'



function MyApp({ Component, pageProps }) {
  <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
  </Head>

  const [cart, setCart] = useState([])
  const [reloadKey, setReloadKey] = useState(1)

  useEffect(() => {
    console.log("I am useEffect from app.js")
  }, [])

  const addToCart=(item,qty,price)=>{
    console.log("Add to cart")
    let newCart=cart
    for (let index = 0; index < qty; index++) {
      
      newCart.push([item,price])
    }
    console.log(newCart)
    setCart(newCart)
    setReloadKey(Math.random())
    
  }
  const removeFromCart=(item,qty)=>{
    let newCart=cart
    let index=newCart.indexOf(item)
    newCart.splice(index)
    setCart(newCart)
  }
  const clearCart=(item)=>{
    setCart([])
  }
  
  
  return <><Navbar key={reloadKey} cart={cart}/><Component cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} clearCart={clearCart} {...pageProps} /><Footer/></>
}

export default MyApp
