import '../styles/globals.css'
import { NextUIProvider, createTheme } from "@nextui-org/react"
import { Toaster } from 'react-hot-toast'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
      colors: {
        // background colors (light)
        background: "#00000",
        backgroundAlpha: "#00000", // used for semi-transparent backgrounds like the navbar
        backgroundContrast: "#00000",
        // brand colors
        primaryLight: "$green200",
        primaryLightHover: "$green300",
        primaryLightActive: "$green400",
        primaryLightContrast: "$green600",
        primary: "#4ADE7B",
        primaryBorder: "$green500",
        primaryBorderHover: "$green600",
        primarySolidHover: "$green700",
        primarySolidContrast: "$white",
        primaryShadow: "$green500",
  
        gradient:
          "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
        link: "#5E1DAD",
  
        // you can also create your own color
        myColor: "#845306",
  
        // ...  more colors
      },
      space: {},
      fonts: {},
    },
  });
  return (
    <div className='bg-black'>
    <NextUIProvider theme={theme}>
    <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainMainnet}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
    </NextUIProvider>
    </div>
  )
}

export default MyApp
