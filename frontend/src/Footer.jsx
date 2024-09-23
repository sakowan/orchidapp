import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-center w-full h-60 bg-colour-3 py-12 text-white">
      <div className="flex w-[75%]">
        <div className="w-1/3 flex flex-col">
          <h2 className="">Our Brand</h2>
          <div className="text-gray-200 flex flex-col text-sm">
            <a href="">About us</a>
            <a href="">Our ingredients</a>
            <a href="">Ethical sourcing</a>
          </div>
        </div>

        <div className="w-1/3 flex flex-col">
          <h2 className="">Customer Service</h2>
          <div className="text-gray-200 flex flex-col text-sm">
            <a href="">Help & FAQs</a>
            <a href="">Return & refund policy</a>
            <a href="">Shipping & tracking</a>
          </div>
        </div>


        <div className="w-1/3 flex flex-col">
          <h2 className="">Need help? Email us here</h2>
          <form>
            <input className="rounded-md my-2 h-8 bg-colour-1 p-2" placeholder="example@mail.com" type='text'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Footer