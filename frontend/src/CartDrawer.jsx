import React, { useContext } from 'react';
import CartProdsMainList from './CartProdsMainList';
import { Drawer, ThemeProvider } from "@material-tailwind/react";
import { CartContext } from './CartContext';
import { drawerTheme } from "./constants";

const CartDrawer = () => {
  const { openDrawer, setOpenDrawer} = useContext(CartContext);
  const cdCloseDrawer = () => setOpenDrawer(false);
  return (
    <ThemeProvider value={drawerTheme}>
      <Drawer
        placement="right"
        open={openDrawer}
        onClose={cdCloseDrawer}
        className={openDrawer ? '!w-2/5 !max-w-none' : ''}
      >
        <CartProdsMainList/>  
      </Drawer>
    </ThemeProvider>
  );
};

export default CartDrawer;