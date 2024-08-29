import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [newProds, setNewProds] = useState([])
  const getWhatsNew = async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL + "products")
    setNewProds(response.data)
  }
  return (
    <>
      <div className='h-screen top-[1rem] relative flex items-center justify-center'>
        {/* Background Container */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-[98%] h-[75%] bg-[url('/src/assets/images/stock/bg4.jpg')] opacity-30 bg-cover bg-center animate-zoomOut rounded-lg">
            {/* Background image */}
          </div>
        </div>

        {/* Foreground Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="pl-10 flex flex-col items-center text-center w-1/2">
            <h1 className="home-phrase">
              Introducing Orchid
            </h1>
            <h2 className='text-colour-7 animate-typewriter'>
              Explore our collection for a subtle blend of feminine grace and soft allure.
            </h2>
            <button className='my-3 w-1/4 h-[3rem] text-center text-white text-lg rounded-lg bg-colour-3 animate-pulse'>Shop Now</button>
          </div>
          <div className='h-full w-1/2 flex items-center justify-center'>
            <img className="opacity-70 h-[40rem] animate-zoomOut" src="/src/assets/images/stock/girl3.jpg"/>
            {/* <img className="h-[40rem]" src="/src/assets/images/stock/girl4.jpg"/> */}

          </div>
        </div>
      </div>
      <div className='px-4 bg-white w-full h-full flex items-center justify-center'>
        <h1 className="home-phrase !text-colour-7">
          What's New
        </h1>

      </div>
    </>
  )
}

export default Home
