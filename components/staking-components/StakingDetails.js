import React, { useEffect, useState } from 'react'
import { useContractRead, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { Button, Tooltip } from '@nextui-org/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast'
import VAULTABI from '../../config/VAULTABI.json'
import { API_URL } from '../../config/config';



const StakingDetails = ({ vaultId, address }) => {

  const contracto = '0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A'
  const [stkedNfts, setStaked] = useState([])

  const { data: daily } = useContractRead({
    address: contracto,
    abi: VAULTABI,
    functionName: 'getUserDailyEarning',
    args: [address, vaultId]
  })

  const { data: earnedRewards } = useContractRead({
    address: contracto,
    abi: VAULTABI,
    functionName: 'getUserEarnedRewards',
    args: [address, vaultId]
  })

  const { data: stakedTokens } = useContractRead({
    address: contracto,
    abi: VAULTABI,
    functionName: 'getStakedTokens',
    args: [address, vaultId]
  })

  const { config: claim } = usePrepareContractWrite({
    address: contracto,
    abi: VAULTABI,
    functionName: 'claimForVault',
    args: [vaultId, address,  stkedNfts]
  })

  const { write: claimForVault } = useContractWrite(claim)

  const callClaim = async () => {
    const notification = toast.loading("Claiming your rewards...");

    try {
      const data = await claimForVault?.();
      console.info("contract call successs", data);
      setTimeout(() => window.location.reload(true), 3000);
      setTimeout(() => {
        toast.success("Rewards Claimed Successfully", {
          id: notification,
        })
      }, 3000);
    } catch (err) {
      toast.error("Whops something went wrong!", {
        id: notification,
      })
      console.error("contract call failure", err);
    }
  }

  const dailyEarning = parseInt(daily)
  let rawR = parseInt(earnedRewards) / 1E18
  const earned = rawR.toFixed(3)

  useEffect(() => {
   async function data() {
    await fetch(`${API_URL}/token/${address}`).then(x => x.json()).then(async(d) => {
      const y = (d[vaultId])
      document.getElementById('balance').innerHTML = (parseInt(y)/1E18).toFixed(2)
    })
    if (vaultId == 0) {
      const data = await fetch(`${API_URL}/staking/333/${address}`);
      const res = await data.json();
      setStaked(res);
    } else if (vaultId == 1) {
      const data = await fetch(`${API_URL}/staking/3333/${address}`);
      const res = await data.json();
      setStaked(res);
    } else if (vaultId == 2) {
      const data = await fetch(`${API_URL}/staking/aliens/${address}`);
      const res = await data.json();
      setStaked(res);
     }
    }
    data()
  }, [address, vaultId])

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
      </p></div>
    )
  }

  return (
    <div className='stats-container mx-6 text-center'>
    <h1 className='text-2xl text-white font-semibold text-center md:text-3xl'> Your Staking Details </h1>
  <div className='flex justify-between space-y-3 flex-col md:flex-row md:justify-between p-1 md:space-x-2'>
    <div className='stats mt-3'>
      <h2 className='text-sm'>Unclaimed Rewards</h2>
      <p className='text-xl extra text-yellow-400 font-semibold'>{earned ? earned : 0} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>Daily Earning</h2>
      <p className='text-xl extra text-yellow-400 font-semibold'>{parseInt(dailyEarning) ? parseInt(dailyEarning) : 0} HACT</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>NFTs Staked</h2>
      <p className='text-xl extra text-yellow-400 font-semibold'>{stakedTokens?.length}</p>
    </div>
    <div className='stats'>
      <h2 className='text-sm'>Balance</h2>
      <p className='text-xl extra flex flex-row justify-center items-center text-center text-yellow-400 font-semibold'><span id='balance'>{0}</span>&nbsp;HACT&nbsp;<Tooltip placement='leftStart' content={ <TooltipContent /> } rounded contentColor="warning" color="invert"> <InformationCircleIcon className='w-6' /></Tooltip></p>
    </div>
  </div>
  <div className='items-center flex justify-center text-center mt-3'>
    <Button onPress={callClaim} auto flat bordered color='warning'>Claim Rewards</Button>
    </div>
</div>
  )
}

export default StakingDetails