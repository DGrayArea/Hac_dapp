import React from 'react'
import { StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon, CodeBracketIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import LOTTERYABI from '../../config/LOTTERYABI.json'


const AdminControls = ({ contract }) => {

  const { config: Refund } = usePrepareContractWrite({
    address: contract,
    abi: LOTTERYABI,
    functionName: 'RefundAll'
  })

  const { write: RefundAll } = useContractWrite(Refund)

  const { config: Pick } = usePrepareContractWrite({
    address: contract,
    abi: LOTTERYABI,
    functionName: 'pickWinner'
  })

  const { write: pickWinner } = useContractWrite(Pick)

  const { config: restart } = usePrepareContractWrite({
    address: contract,
    abi: LOTTERYABI,
    functionName: 'restartDraw'
  })

  const { write: restartDraw } = useContractWrite(restart)

  const { config: payout } = usePrepareContractWrite({
    address: contract,
    abi: LOTTERYABI,
    functionName: 'payoutLottery'
  })

  const { write: payoutLottery } = useContractWrite(payout)


  const { config: strt } = usePrepareContractWrite({
    address: contract,
    abi: LOTTERYABI,
    functionName: 'start'
  })

  const { write: start } = useContractWrite(strt)


  const callPayout = async () => {
    const notification = toast.loading("Drawing Winner...");
    try {
      const data = await payoutLottery?.();
      console.info("contract call successs", data);
      toast.success("A winner has been selected", {
        id: notification,
      })
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Whops something went wrong!", {
        id: notification,
      })
    }
  }

    const handleDraw = async () => {
        const notification = toast.loading("Getting Random Number...");
    
        try {
          const data = await pickWinner?.();
          console.info("contract call successs", data)
           toast.success("Please wait 2-6 mins before callling draw winner", {
            id: notification,
          })
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
          const data = await RefundAll?.();
          console.info("contract call successs", data)
           toast.success("All participants successfully refunded", {
            id: notification,
          })
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
          const data = await restartDraw?.();
          console.info("contract call successs", data)
           toast.success("New lottery draw started", {
            id: notification,
          })
        } catch(ex) {
          toast.error("Whops something went wrong!", {
            id: notification,
          })
          console.log("contract call failure", ex);
        }
      }
      const hadleStartDraw = async () => {
        const notification = toast.loading("Starting Draw..");
    
        try {
            const data = await start?.();
            console.info("contract call successs", data);
          toast.success("Draw Started successfully", {
            id: notification,
          })
        } catch(ex) {
          toast.error("Whops something went wrong!", {
            id: notification,
          })
          console.log("contract call failure", ex);
        }
      }
  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-yellow-400/20 border'>
       <h2 className='font-bold'> Admin Controls</h2>

       <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
        <button onClick={handleDraw} className='admin-button'> <CodeBracketIcon className='h-6 mx-auto mb-2' />Get Random No</button>
        <button onClick={callPayout} className='admin-button'> <StarIcon className='h-6 mx-auto mb-2' />Draw Winner</button>
        <button onClick={handleRefund} className='admin-button'> <ArrowUturnDownIcon className='h-6 mx-auto mb-2' /> Refund All</button>
        <button onClick={handleRestart} className='admin-button'> <ArrowPathIcon className='h-6 mx-auto mb-2' /> Restart Draw</button>
        <button onClick={hadleStartDraw} className='admin-button'> <CurrencyDollarIcon className='h-6 mx-auto mb-2' /> Start Draw</button>
       </div>
    </div>
  )
}

export default AdminControls