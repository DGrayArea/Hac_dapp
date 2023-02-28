import Header from './Header'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Nav from './Nav'
import { useContractRead, useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Tooltip } from '@nextui-org/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { ethers } from 'ethers';
import TokenSaleJson from '../config/TokenSaleJson.json'
import { tokenSaleContract } from '../config/config';
import { API_URL } from '../config/config';

const TokenSale = () => {
  const { address } = useAccount()
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [ticketprice, setTicketPrice] = useState(0);
  const [funcPrice, setFuncPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0)
  const arr = []

  const contract = '0x56628775730cA381557b6B73Cf7CC54f981bB722'

  const { data: prices} = useContractRead({
    address: contract,
    abi: TokenSaleJson,
    functionName: 'getLatestPrice',
  })

  var x;

if(typeof window !== 'undefined') {
  let selected = document.getElementById('select1')
  document.getElementById('ticket-name').innerHTML = selected.value
  if(selected.value == '333'){
    x = 0
  } else if(selected.value == '3333'){
    x = 1
  } else if(selected.value == 'Alien') {
    x = 2
  }
  }
  const { config: buy } = usePrepareContractWrite({
    address: tokenSaleContract,
    abi: TokenSaleJson,
    functionName: 'buyTickets',
    args: [quantity, x],
    overrides: {
      from: address,
      value: ticketprice.toString(),
    },
  })

  const { data: stakeData, isLoading: stakeLoad, isSuccess: success, write: buyTickets } = useContractWrite(buy)

  const callBuy = async () => {
    const notification = toast.loading("Buying your Tickets...");

    try {
      const data = await buyTickets?.();
      console.log(ticketprice)
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


  async function fetchData() {
    await fetch(`${API_URL}/token/${address}`).then(x => x.json()).then(async(d) => {
     const y = (d[0])
     const x = (d[1])
     const z = (d[2])
     document.getElementById('balance').innerHTML = (parseInt(y)/1E18).toFixed(2)
     document.getElementById('balance1').innerHTML = (parseInt(x)/1E18).toFixed(2)
     document.getElementById('balance2').innerHTML = (parseInt(z)/1E18).toFixed(2)
   })
  }

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_URL}/token/${address}`).then(x => x.json()).then(async(d) => {
        const y = (d[0])
        const x = (d[1])
        const z = (d[2])
        document.getElementById('balance').innerHTML = (parseInt(y)/1E18).toFixed(2)
        document.getElementById('balance1').innerHTML = (parseInt(x)/1E18).toFixed(2)
        document.getElementById('balance2').innerHTML = (parseInt(z)/1E18).toFixed(2)
     })
    }
    fetchData()
  }, [address])
  

  fetchData()

  prices?.map((price) => {
    arr.push(parseInt(price))
  })
 
  const callSelect = () => {
    let selected = document.getElementById('select1')
     document.getElementById('ticket-name').innerHTML = selected.value
     if(selected.value == '333'){
      setFuncPrice(arr[0])
      setTicketPrice((arr[0]) * quantity)
      setPrice((arr[0]/1E18)?.toFixed(4))
      setTotalCost(((arr[0]/1E18)?.toFixed(4) * quantity)?.toFixed(3))
     } else if(selected.value == '3333'){
      setFuncPrice(arr[1])
      setTicketPrice((arr[1]) * quantity)
      setPrice((arr[1]/1E18)?.toFixed(4))
      setTotalCost(((arr[1]/1E18)?.toFixed(4) * quantity)?.toFixed(3))
     } else {
      setFuncPrice(arr[2])
      setTicketPrice((arr[2]) * quantity)
      setPrice((arr[2]/1E18)?.toFixed(4))
      setTotalCost(((arr[2]/1E18)?.toFixed(4) * quantity)?.toFixed(3))
     }
  }

  const TooltipContent = () => {
    return (
      <div>
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
      </div>
    )
  }

  const setStates = (q) => {
    setTicketPrice(funcPrice * q)
    setQuantity(q)
    setTotalCost((price * q)?.toFixed(4))
  }
  
  
    //if (!address) return <Login />
  
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Nav />
  
        <div className="flex-1">
  
        <Header name={`Horror Ape Club Ticket Sales`} />
  
        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
          <div className='stats-container'>
            <h1 className='text-xl text-white font-semibold text-center md:text-2xl'> BALANCES</h1>
          <div className='justify-center text-center p-2 grid grid-flow-row space-y-2'>
            <div className='token-stats'>
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
  
        <div className='stats-container mb-6 space-y-2'>
          <div className="stats-container">
            <div className='flex extra justify-between items-center text-white pb-2'>
              <h4 className='extra'>Price Per <span id='ticket-name'></span> Ticket</h4>
              <p className='extra'><span id='price'>{price}</span>BNB</p>
            </div>
            <div className='flex items-center'>
            <select onChange={callSelect} id='select1' className='text-white m-4 bg-[#140f06] border-[#423929] border p-2 w-[300px]' style={{height:"60px"}}>
            <option value=''></option>
            <option value='333'>333 HACT</option>
            <option value='3333'>3333 HACT</option>
            <option value='Alien'>ALIEN HACT</option>
        </select>
            </div>
  
            <div className='flex items-center space-x-2 text-white bg-[#140f06] border-[#423929] border p-4'>
              <p className='extra'>TICKETS</p>
              <input className='flex w-full bg-transparent text-right outline-none' placeholder='0' type='number' onChange={e => setStates(Number(e.currentTarget.value))} />
            </div>
  
            <div className='space-y-2 mt-5'>
              <div className='flex items-center justify-between text-yellow-400 text-sm italic font-extrabold'>
                <p className='extra'>Total cost of tickets</p>
                <p className='extra'>{totalCost} BNB</p>
              </div>
  
              <div className='flex items-center justify-between text-yellow-400 text-xs italic'>
                <p className='extra'>+ Network Fees</p>
                <p className='extra'>TBC</p>
              </div>
            </div>
            <button onClick={callBuy} className='mt-5 w-full bg-gradient-to-br from-[#F5A524] to-gray-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>Buy {quantity} tickets for {totalCost} BNB</button>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
  

export default TokenSale