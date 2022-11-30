import Header from '../Header'
import { useState } from 'react'
import Login from '../Login'
import Loading from '../Loading'
import CountdownTimer from './CountdownTimer'
import toast from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import AdminControls from './AdminControls'
import Nav from '../Nav'


const Lottery = ({ name }) => {

    const [quantity, setQuantity] = useState(1);
    const isLoading = false;
    const address = 'Ox23454t'
    const lotteryOperator = 'Ox23454t'
  
    const handleBuy = async () => {
      const notification = toast.loading("Buying your tickets...");
  
      try {
        setTimeout(() => {alert("Bought X tickets");  toast.success("Tickets purchases successfully", {
          id: notification,
        })}, 2000)
      } catch(ex) {
        toast.error("Whops something went wrong!", {
          id: notification,
        })
        console.log("contract call failure", ex);
      }
    }
  
    if (isLoading) return <Loading />
    if (!address) return <Login />
  
    return (
      <div className="bg-[#0d0613] min-h-screen flex flex-col">
        <Nav />
  
        <div className="flex-1">
  
        <Header name={`HAC ${name} LOTTERY`} />
        <Marquee className='bg-[#20112e] p-5 mb-5' gradient={false} speed={100} >
          <div className='flex space-x-2 mx-10'>
            <h4 className='text-white font-bold'>Previous winner: ...</h4>
          </div>
          </Marquee>
          {lotteryOperator === address && (
            <div className='flex justify-center'>
              <AdminControls />
              </div>
          )}
  
        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
          <div className='stats-container'>
            <h1 className='text-4xl text-white font-semibold text-center md:text-5xl'> The Next Draw </h1>
          <div className='flex justify-between p-2 space-x-2'>
            <div className='stats'>
              <h2 className='text-sm'>Total Pool</h2>
              <p className='text-xl font-semibold text-purple-300'>0.1 HACT</p>
            </div>
            <div className='stats'>
              <h2 className='text-sm'>You Own</h2>
              <p className='text-xl font-semibold text-purple-300'>100 HACT</p>
            </div>
          </div>
          {/*countdown Timer */}
          <div className='mt-5 mb-3'>
            <CountdownTimer />
          </div>
        </div>
  
        <div className='stats-container space-y-2'>
          <div className="stats-container">
            <div className='flex justify-between items-center text-white pb-2'>
              <h4>Price per ticket</h4>
              <p>10 HACT</p>
            </div>
  
            <div className='flex items-center space-x-2 text-white bg-[#0e0614] border-[#362942] border p-4'>
              <p>TICKETS</p>
              <input className='flex w-full bg-transparent text-right outline-none' type='number' min={1} max={100} value={quantity} onChange={e => setQuantity(Number(e.currentTarget.value))} />
            </div>
  
            <div className='space-y-2 mt-5'>
              <div className='flex items-center justify-between text-purple-300 text-sm italic font-extrabold'>
                <p>Total cost of ticket</p>
                <p>0.99</p>
              </div>
  
              <div className='flex items-center justify-between text-purple-300 text-xs italic'>
                <p>Service fees</p>
                <p>0.001 BNB</p>
              </div>
  
              <div className='flex items-center justify-between text-purple-300 text-xs italic'>
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>
            </div>
  
            <button onClick={handleBuy} className='mt-5 w-full bg-gradient-to-br from-[#341c49] to-gray-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'>Buy {quantity} tickets for {1} BNB</button>
          </div>
  
          <div className='stats text-center'>
            <p className='text-lg mb-2'>You have {/*user tickets*/8} tickets in this draw </p>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
  

export default Lottery