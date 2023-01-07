import Header from '../Header'
import { useState } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import AdminControls from './AdminControls'
import Nav from '../Nav'
import { useContractRead, useAddress, useContractWrite } from "@thirdweb-dev/react";
import Image from 'next/image'
import TOKENABI from '../../config/TOKENABI.json'


const Lottery = ({ name, admin, contract, token, tokenString, tContract }) => {
  const address = useAddress()
  const [quantity, setQuantity] = useState(1);

  const { data: expiration } = useContractRead(contract, "expiration")
  console.log(parseInt(expiration))
  const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org")
  const ethersContract = new ethers.Contract(tContract, TOKENABI, provider)

  const { data: lotteryId } = useContractRead(contract, "lotteryID")
  const { data: prevWinner } = useContractRead(contract, "previousWinner")
  const { data: totalEntry } = useContractRead(contract, "totalEntries")
  const { data: fee } = useContractRead(contract, "fee")
  const { data: balance } = useContractRead(token, "balanceOf", address)
  const { data: userEntr } = useContractRead(contract, "userEntries", address)
  const { data: allowance } = useContractRead(token, "allowance", address, tokenString)
  const { mutateAsync: BuyTickets, isLoadingBuy } = useContractWrite(contract, "BuyTickets")
  const { data: isActive, isLoading } = useContractRead(contract, "isActive")

  const { mutateAsync: approve } = useContractWrite(token, "approve")

  const callApprove = async () => {
    const notification = toast.loading("Approving to buy...");
  
    try {
      const data = await approve([ tokenString, ethers.utils.parseUnits((10000).toString(), 'ether')]);
      console.info("contract call successs", data);
      toast.success("Token Approved successfully", {
        id: notification,
      })
    } catch (err) {
      toast.error("Whops something went wrong!", {
        id: notification,
      })
      console.error("contract call failure", err);
    }
  }

  const callBuy = async () => {
    const notification = toast.loading("Buying tickets...");
    try {
      const data = await BuyTickets([[quantity]]);
      console.info("contract call successs", data);
      toast.success("Tickets purchased successfully", {
        id: notification,
      })
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Whops something went wrong!", {
        id: notification,
      })
    }
  }

  const totalPool = (parseInt(fee)/1E18) * parseInt(totalEntry)
  let first = prevWinner?.slice(0, 6)
  let secont = prevWinner?.slice(38, 42)
  const previousWinner = address == undefined ? 0 : (first + '...' + secont)

  const bb = async() => {
    let x = 0
    if(address != undefined) {
    x = await ethersContract.balanceOf(address)
    } else {
      x = 0
    }
   return x
  }
  (bb().then(res => document.getElementById('balance').innerHTML = (parseInt(res)/1E18).toFixed(2)))
  const price = (parseInt(fee))/1E18

  const totalCost = price * quantity
  const userEntries = parseInt(userEntr)
  const allow =  parseInt(allowance) > totalCost ? false : true


  const lotteryOperator = admin
  
  
    //if (!address) return <Login />
  
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Nav />
  
        <div className="flex-1">
  
        <Header name={`HAC ${name} LOTTERY`} />
        <Marquee className='bg-[#131212] p-5 mb-5' gradient={false} speed={100} >
          <div className='flex space-x-2 mx-10'>
            <h4 className='text-white font-bold'>Previous winner:&nbsp; {previousWinner}</h4>
          </div>
          </Marquee>
          {lotteryOperator === address && (
            <div className='flex justify-center'>
              <AdminControls contract={contract} />
              </div>
          )}
  
        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
          <div className='stats-container'>
            <h1 className='text-4xl text-white font-semibold text-center md:text-5xl'> The Next Draw </h1>
          <div className='flex justify-between p-2 space-x-2'>
            <div className='stats'>
              <h2 className='text-sm'>Total Pool</h2>
              <p className='text-xl font-semibold text-yellow-400'>{totalPool} HACT</p>
            </div>
            <div className='stats'>
              <h2 className='text-sm'>You Own</h2>
              <p className='text-xl font-semibold text-yellow-400'><span id='balance'>{0}</span> HACT</p>
            </div>
          </div>
          {/*countdown Timer */}
          <div className='mt-5 mb-3'>
          </div>
        </div>
  
        <div className='stats-container space-y-2'>
          <div className="stats-container">
            <div className='flex justify-between items-center text-white pb-2'>
              <h4>Price per ticket</h4>
              <p>{price} HACT</p>
            </div>
  
            <div className='flex items-center space-x-2 text-white bg-[#140f06] border-[#423929] border p-4'>
              <p>TICKETS</p>
              <input className='flex w-full bg-transparent text-right outline-none' type='number' onChange={e => setQuantity(Number(e.currentTarget.value))} />
            </div>
  
            <div className='space-y-2 mt-5'>
              <div className='flex items-center justify-between text-yellow-400 text-sm italic font-extrabold'>
                <p>Total cost of tickets</p>
                <p>{totalCost} HACT</p>
              </div>
  
              <div className='flex items-center justify-between text-yellow-400 text-xs italic'>
                <p>Service fees</p>
                <p>0.0025 BNB</p>
              </div>
  
              <div className='flex items-center justify-between text-yellow-400 text-xs italic'>
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>
            </div>
            {isActive ?
              <>
            {allow ? 
            <button onClick={callApprove} className='mt-5 w-full bg-gradient-to-br from-[#F5A524] to-gray-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>Approve to Enter Draw</button>
            :
            <button onClick={callBuy} className='mt-5 w-full bg-gradient-to-br from-[#F5A524] to-gray-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>Buy {quantity} tickets for {totalCost} HACT</button>
            }
            </>
            :
            <button disabled={true} className='mt-5 w-full bg-gradient-to-br from-[#F5A524] to-gray-600 px-10 py-5 rounded-md text-[#F5A524] shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>Lottery Currently Closed</button>
          }
          </div>
  
          <div className='stats text-center'>
            <p className='text-lg mb-2'>You have {userEntries} tickets in this draw </p>
          </div>
        </div>
        </div>
        </div>
        <div className='text-right items-end flex justify-end mt-6 mb-4'>
        <Image width={300} height={300} src='/chainlink.jpeg' />
        </div>
      </div>
    );
  }
  

export default Lottery