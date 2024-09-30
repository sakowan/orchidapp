//Why: Use local storage to store access&refresh tokens in the browser, and have a key that I can use to access in my local storage
// These are keys used to access access&refresh tokens 
export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const CSRF_TOKEN = "csrftoken";

export const drawerTheme = {
  drawer: {
    styles: {
      base: {
        drawer: {
          position: "fixed",
          zIndex: "z-[9999]",
          pointerEvents: "pointer-events-auto",
          backgroundColor: "bg-white",
          boxSizing: "box-border",
          boxShadow: "shadow-2xl shadow-blue-gray-900/10",
        },
        overlay: {
          position: "fixed",
          inset: "inset-0",
          width: "w-full",
          height: "h-full",
          pointerEvents: "pointer-events-auto",
          zIndex: "z-[9995]",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-30",
          backdropBlur: "backdrop-blur-sm",
        },
      },
    },
  },
};

export const newsletterTheme = {
  dialog: {
    defaultProps: {
      size: "md",
      dismiss: {},
      animate: {
        unmount: {},
        mount: {},
      },
      className: "",
    },
    valid: {
      sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    styles: {
      base: {
        backdrop: {
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "w-screen",
          height: "h-screen",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-25",
          backdropFilter: "backdrop-blur-sm",
        },
      },
    }
  }
}

import { ThinStar } from '@smastrom/react-rating'
export const starStyling = {
  itemShapes: ThinStar,
  activeFillColor: '#8996e3', //colour-5
  inactiveFillColor: '#D1D5DB' //gray-300
}