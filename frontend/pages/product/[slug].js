import React from 'react'
import {useRouter} from 'next/router'

function Slug({product,addToCart,removeFromCart,clearCart}) {
    const router=useRouter()
    const {slug}=router.query
    console.log(product)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="flex justify-center items-center w-full lg:w-auto">
      <img alt="ecommerce" className="rounded" src={product.attributes.image.data.attributes.name}/>
      </div>
      
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">MyShop</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.attributes.title}</h1>
        
        <p className="leading-relaxed">{product.attributes.description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">₹{product.attributes.price}</span>
          <div className="flex mx-2">
          <button onClick={()=>{addToCart(slug,1,product.attributes.price)}} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 mx-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
          <button onClick={()=>{router.push('/checkout')}} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 mx-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Checkout</button>
          </div>
        
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
export async function getServerSideProps(context) {
  console.log(context.query)
  let headers = {
    Authorization:
      "Bearer 351225235e04515293842096ee469491f4dfd56cfe25ee37ae62b89a09290c424de3877e3e34a21ab72a37c3aaecd3d0fd65a6a8620b157a8db882350b53bc4d6865755ac3ffbec36577a6da46d06f6cd72745ac1b4b3a847759c4579b0e942c2f6a7e61ebb22e540e72a3a0ade0f57b2e1da7734acb9965ba789ceb1e759590",
  };
  let a = await fetch("http://localhost:1337/api/products?filters[slug]="+context.query.slug+"&populate=*", {
    headers: headers,
  });
  let product = await a.json();
  
  return {
    props: { product: product.data[0] },
  };
}



export default Slug
