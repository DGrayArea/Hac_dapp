import React from 'react'
import { StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { useContract, useContractWrite } from "@thirdweb-dev/react";


const AdminControls = ({ contract }) => {

  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")
  const { mutateAsync: pickWinner } = useContractWrite(contract, "pickWinner")
  const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw")
  const { mutateAsync: payoutLottery } = useContractWrite(contract, "payoutLottery")

  const { mutateAsync: start } = useContractWrite(contract, "start")

  const callStart = async () => {
    try {
      const data = await start();
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }


  const callRestart = async () => {
    try {
      const data = await restartDraw();
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const callWinner = async () => {
    try {
      const data = await pickWinner();
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const callRefund = async () => {
    try {
      const data = await RefundAll();
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const callPayout = async () => {
    try {
      const data = await payoutLottery();
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

    const handleDraw = async () => {
        const notification = toast.loading("Drawing winner...");
    
        try {
          setTimeout(() => {alert("Bought X tickets");  toast.success("A winner has been selected", {
            id: notification,
          })}, 2000)
        } catch(ex) {
          toast.error("Whops something went wrong!", {
            id: notification,
          })
          console.log("contract call failure", ex);
        }
      }
      const handleRefund = async () => {
        const notification = toast.loading("Refunding all participants...");
    
        try {
          setTimeout(() => {alert("Bought X tickets");  toast.success("All participants successfully refunded", {
            id: notification,
          })}, 2000)
        } catch(ex) {
          toast.error("Whops something went wrong!", {
            id: notification,
          })
          console.log("contract call failure", ex);
        }
      }
      const handleRestart = async () => {
        const notification = toast.loading("Restarting draw..");
    
        try {
          setTimeout(() => {alert("Bought X tickets");  toast.success("New lottery draw started", {
            id: notification,
          })}, 2000)
        } catch(ex) {
          toast.error("Whops something went wrong!", {
            id: notification,
          })
          console.log("contract call failure", ex);
        }
      }
      const hadleStartDraw = async () => {
        const notification = toast.loading("Withdrawing comissions..");
    
        try {
          setTimeout(() => {alert("Bought X tickets");  toast.success("Comissions withdrawn successfully", {
            id: notification,
          })}, 2000)
        } catch(ex) {
          toast.error("Whops something went wrong!", {
            id: notification,
          })
          console.log("contract call failure", ex);
        }
      }
  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-purple-300/20 border'>
       <h2 className='font-bold'> Admin Controls</h2>
       <p className='mb-5'>Total Commissions to be withdrawn: 0.5 BNB</p>

       <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
        <button onClick={handleDraw} className='admin-button'> <StarIcon className='h-6 mx-auto mb-2' /> Draw Winner</button>
        <button onClick={handleRefund} className='admin-button'> <ArrowUturnDownIcon className='h-6 mx-auto mb-2' /> Refund All</button>
        <button onClick={handleRestart} className='admin-button'> <ArrowPathIcon className='h-6 mx-auto mb-2' /> Restart Draw</button>
        <button onClick={hadleStartDraw} className='admin-button'> <CurrencyDollarIcon className='h-6 mx-auto mb-2' /> Start Draw</button>
       </div>
    </div>
  )
}

export default AdminControls