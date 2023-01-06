import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import Nav from '../components/Nav'
import { _3333contract, _333contract, alienContract, vaultContract } from '../config/config'
import { useAddress} from "@thirdweb-dev/react"
import NFTs from '../components/staking-components/NFTs'
import { ethers } from 'ethers'
import NFTABI from '../config/NFTABI.json'
import { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    setBal()
  },[])

  const address = useAddress()

  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org")
  const firstContract = new ethers.Contract(_333contract, NFTABI, provider)
  const secondContract = new ethers.Contract(_3333contract, NFTABI, provider)
  const thirdContract = new ethers.Contract(alienContract, NFTABI, provider)

  const setBal = async() => {
    let x = await firstContract.balanceOf('0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E')
    let y = await secondContract.balanceOf('0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E')
    let z = await thirdContract.balanceOf('0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E')

    document.getElementById('one').innerHTML = parseInt(x)
    document.getElementById('two').innerHTML = parseInt(y)
    document.getElementById('three').innerHTML = parseInt(z)
  }


  if (!address) return <Login />

  const arr = []

  for(let i = 2251; i < 3005; i++) {
    arr.push(i)
  }

  console.log(arr)

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Head>
        <title>Horror Ape Club 333 Lottery</title>
        <link className='rounded-full' rel="icon" href="/alien.jpeg" />
      </Head>
      <Nav />

      <div className="flex-1">
      <Header name='HAC STAKING' />
      <div className='text-white text-center px-5 py-3 rounded-md border-yellow-400/20 border mx-4'>
       <h2 className='font-bold mb-5'>Total Staked</h2>

       <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center'>
        <div className='stats-container justify-between'>
          <img alt="logo" className='rounded-full w-20 h-20 mx-auto' src="/3333.jpeg" />
          <div className='font-bold'>Hac 3333 NFTs</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'><span id='one'>{0}</span>/ 3333</span>
           </div>
          </div>
        </div>
        <div className='stats-container justify-between'>
        <img alt="logo" className='rounded-full w-20 h-20 mx-auto' src="/333.jpeg" />
          <div className='font-bold'>Hac 333 NFTs</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'><span id='two'>{0}</span>/ 333</span>
           </div>
          </div>
        </div>
        <div className='stats-container justify-between'>
        <img alt="logo" className='rounded-full w-20 h-20 mx-auto' src="/alien.jpeg" />
          <div className='font-bold'>Hac Alien NFTs</div>
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
    </div>
    </div>
  );
}

export default Home
