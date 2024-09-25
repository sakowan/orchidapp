import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-center w-full h-60 bg-colour-0 py-12 text-colour-6">
      <div className="flex w-[75%]">
        <div className="w-1/3 flex flex-col">
          <h2 className="">Our Brand</h2>
          <div className="text-colour-4 flex flex-col text-sm">
            <a className="hover:cursor-pointer" href="">About us</a>
            <a className="hover:cursor-pointer" href="">Our ingredients</a>
            <a className="hover:cursor-pointer" href="">Ethical sourcing</a>
          </div>
        </div>

        <div className="w-1/3 flex flex-col">
          <h2 className="">Customer Service</h2>
          <div className="text-colour-4 flex flex-col text-sm">
            <a className="hover:cursor-pointer" href="">Help & FAQs</a>
            <a className="hover:cursor-pointer" href="">Return & refund policy</a>
            <a className="hover:cursor-pointer" href="">Shipping & tracking</a>
          </div>
        </div>


        <div className="w-1/3 flex flex-col">
          <h2 className="">Need help? Email us here</h2>
          <form>
            <input className="rounded-md my-2 h-9 w-[70%] bg-white p-2 custom-placeholder focus:outline-none" placeholder="example@mail.com" type='text'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Footer