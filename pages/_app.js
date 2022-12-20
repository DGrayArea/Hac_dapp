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
        background: "#0A0012",
        backgroundAlpha: "#0A0012", // used for semi-transparent backgrounds like the navbar
        backgroundContrast: "#0A0012",
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
        myColor: "#ff4ecd",
  
        // ...  more colors
      },
      space: {},
      fonts: {},
    },
  });
  return (

    <NextUIProvider theme={theme}>
    <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainTestnet}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
    </NextUIProvider>
  )
}

export default MyApp
