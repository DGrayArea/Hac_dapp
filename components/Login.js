import { ConnectWallet } from "@thirdweb-dev/react"

const Login = () => {

  return (
    <div  className="bg-black min-h-screen justify-center align-middle items-center text-center flex flex-col">
      <div>
      <ConnectWallet />
      </div>
    </div>
  )
}

export default Login