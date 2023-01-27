import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';  
import {
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { bsc } from 'wagmi/chains'
import { NextUIProvider, createTheme } from "@nextui-org/react"
import { Toaster } from 'react-hot-toast'

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

  const { chains, provider } = configureChains(
    [bsc],
    [
      alchemyProvider({ apiKey: 'br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6' }), publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
      <Toaster />
    </NextUIProvider>
    </RainbowKitProvider>
  </WagmiConfig>
  )
}

export default MyApp
