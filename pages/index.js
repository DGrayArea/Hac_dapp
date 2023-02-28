import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import Nav from '../components/Nav'
import { _3333contract, _333contract, alienContract, vaultContract } from '../config/config'
import { useAccount } from "wagmi"
import NFTs from '../components/staking-components/NFTs'
import { useEffect } from 'react'
import { Tooltip } from '@nextui-org/react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { API_URL } from '../config/config'

const Home = () => {

  const { address, isConnecting, isDisconnected } = useAccount()


  const TooltipContent = () => {
    return (
        <p style={{
          wordWrap:'break-word',
          overflow:'scroll',
          textOverflow:'ellipsis',
          maxHeight:'15.6em',
          maxWidth: '12em',
          lineHeight:'1.8em'
        }}>
        <i>
        Please Note: Each &apos;HACT&apos; balance on a staking page is separate to each collection, and that collections stake-to-win lottery. Alien Horror Apes HACT cannot be used for Project 333 Lotteries, and vice versa
        </i>
      </p>
    )
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const setB = async() => {
        const data = await fetch(`${API_URL}/balances/vaultbal`,{signal})
        const res = await data.json()
    
        const x = parseInt(res[0])
        const y = parseInt(res[1])
        const z = parseInt(res[2])
    
        document.getElementById('one').innerHTML = parseInt(y)
        document.getElementById('two').innerHTML = parseInt(x)
        document.getElementById('three').innerHTML = parseInt(z)
        if(address != undefined) {
        await fetch(`${API_URL}/token/${address}`).then(x => x.json()).then(async(d) => {
          const y = (d[0])
          const x = (d[1])
          const z = (d[2])
          document.getElementById('balance').innerHTML = (parseInt(y)/1E18).toFixed(2)
          document.getElementById('balance1').innerHTML = (parseInt(x)/1E18).toFixed(2)
          document.getElementById('balance2').innerHTML = (parseInt(z)/1E18).toFixed(2)})
        }
        }
    setB()
    return () => {
      controller.abort()
    }
  },[address])


  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Head>
        <title>Horror Ape Club Staking</title>
        <link className='rounded-full' rel="icon" href="/Favicon.png" />
      </Head>
      <Nav />

      <div className="flex-1">
      <Header name='Horror Ape Club Staking' />
      <div className='text-white text-center px-5 py-3 rounded-md border-yellow-400/20 border mx-4'>
       <h2 className='font-bold mb-5'>Total Staked</h2>

       <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center'>
        <div className='stats-container justify-between'>
          <Image height={100} width={100} alt="logo" className='rounded-full w-20 h-20 mx-auto' src="/3333.jpeg" />
          <div className='font-bold'>HORROR APES</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'><span id='one'>{0}</span>/ 3333</span>
           </div>
          </div>
        </div>
        <div className='stats-container justify-between'>
        <Image height={100} width={100} alt="logo" className='rounded-full w-20 h-20 mx-auto' src="/333.jpeg" />
          <div className='font-bold'>PROJECT 333 APES</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'><span id='two'>{0}</span>/ 333</span>
           </div>
          </div>
        </div>
        <div className='stats-container justify-between'>
        <Image height={100} width={100} alt="logo" className='rounded-full w-20 h-20 mx-auto' src="/alien.jpeg" />
          <div className='font-bold'>ALIEN HORROR APES</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'><span id='three'>{0}</span>/ 3000</span>
           </div>
          </div>
        </div>
        </div>
        </div>
        <NFTs />
        <div className='border-yellow-400/20 border m-4' style={{borderRadius:"10px"}}>
            <h1 className='text-xl mt-3 text-white font-semibold text-center md:text-2xl'> BALANCES</h1>
          <div className='justify-center text-center p-2 grid grid-flow-row  md:grid-flow-col md:space-x-20 space-y-2'>
            <div className='token-stats mt-2'>
              <h2 className='text-sm text-center'>HORROR APES HACT</h2>
              <p className='text-md extra font-semibold text-yellow-400 flex flex-row justify-center'><span id='balance1'>{0} &nbsp;</span>&nbsp; HACT&nbsp;  <Tooltip placement='leftStart' content={ <TooltipContent /> } rounded contentColor="warning" color="invert"> <InformationCircleIcon className='w-6' /></Tooltip></p>
            </div>
            <div className='token-stats'>
              <h2 className='text-sm text-center'>PROJECT 333 HACT</h2>
              <p className='text-md extra font-semibold text-yellow-400 flex flex-row justify-center'><span id='balance'>{0} &nbsp;</span>&nbsp; 333 HACT&nbsp;  <Tooltip placement='leftStart' content={ <TooltipContent /> } rounded contentColor="warning" color="invert"> <InformationCircleIcon className='w-6' /></Tooltip></p>
            </div>
            <div className='token-stats'>
              <h2 className='text-sm text-center'>ALIEN HORROR APES HACT</h2>
              <p className='text-md extra font-semibold text-yellow-400 flex flex-row justify-center'><span id='balance2'>{0} &nbsp;</span>&nbsp;&nbsp;ALIEN HACT&nbsp;  <Tooltip placement='leftStart' content={ <TooltipContent /> } contentColor="warning" rounded color="invert"> <InformationCircleIcon className='w-6' /></Tooltip></p>
            </div>
          </div>
          {/*countdown Timer */}
          <div className='mt-5 mb-3'>
          </div>
        </div>
    </div>
    </div>
  );
}

export default Home
