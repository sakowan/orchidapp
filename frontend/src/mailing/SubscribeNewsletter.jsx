import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody} from "@material-tailwind/react";
import { ThemeProvider } from '@material-tailwind/react';
import { newsletterTheme } from '../constants';
import { Send } from 'lucide-react';


export const SubscribeNewsletter = ({showNewsletter}) => {
  const [open, setOpen] = useState(showNewsletter);
  useEffect(() => {
    setOpen(showNewsletter);
  }, [showNewsletter]);
  
  const handleOpen = () => setOpen(!open);

  return (
    <ThemeProvider value={newsletterTheme}>
      <Dialog open={open} handler={handleOpen} className="outline-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/images/blurries/blur6.jpg')] bg-cover bg-center opacity-60 rounded-lg" />
        <div className="relative z-10 flex">
          <div className="w-3/5 p-6 flexx items-center justify-center">
            <DialogHeader className="text-[32px] ibm-bold text-colour-5">GET 10% OFF YOUR NEXT ORDER!</DialogHeader>
            <div className="relative border border-colour-3 rounded-lg overflow-hidden">
              <input type="text" className="bg-opacity-70 h-10 w-full p-4 ibm-regular text-gray-700 focus:outline-none" placeholder="example@email.com"></input>
              <button className="absolute top-0 right-0 w-12 h-10 bg-colour-1 border-l border-colour-3 flex items-center justify-center hover:bg-white">
                <Send className="text-colour-5"/>
              </button>
            </div>
          </div>
          <div className="w-2/5">
            <img src="/src/assets/images/stock/girl9.jpg"/>
          </div>
        </div>
      </Dialog>
    </ThemeProvider>

  )
}
