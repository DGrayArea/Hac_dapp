import { ConnectWallet } from "@thirdweb-dev/react"

const Login = () => {

  return (
    <div  className="bg-[#0d0613] min-h-screen flex flex-col">
      <ConnectWallet />
    </div>
  )
}

export default Login