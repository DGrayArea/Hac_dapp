import Link from "next/link";
import { useAccount, useContractRead } from "wagmi"
import VAULTABI from '../../config/VAULTABI.json'
import { useEffect, useState } from "react";

const NFTs = () => {

  const contract = "0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A";

  const [_333Staked, set333Staked] = useState([])
  const [_3333Staked, set3333Staked] = useState([])
  const [alienStaked, setalienStaked] = useState([])

  const { address } = useAccount()


  useEffect(() => {
    const bal = async() => {
        const data = await fetch(`/api/balances/${address}`)
        const res = await data.json()
    
        const x = parseInt(res[0])
        const y = parseInt(res[1])
        const z = parseInt(res[2])
  
      document.getElementById('four').innerHTML = parseInt(y)
      document.getElementById('five').innerHTML = parseInt(x)
      document.getElementById('six').innerHTML = parseInt(z)

      const data333 = await fetch(`/api/staking/333/${address}`);
      const res333 = await data333.json();
      set333Staked(res333);
      
      const data3333 = await fetch(`/api/staking/3333/${address}`);
      const res3333 = await data3333.json();
      set3333Staked(res3333);

      const dataAlien = await fetch(`/api/staking/aliens/${address}`);
      const resAlien = await dataAlien.json();
      setalienStaked(resAlien);
      }
    bal()
  }, [address])

  const { data: e333 } = useContractRead({
    address: contract,
    abi: VAULTABI,
    functionName: 'getUserEarnedRewards',
    args: [address, 0]
  })

  const { data: e3333 } = useContractRead({
    address: contract,
    abi: VAULTABI,
    functionName: 'getUserEarnedRewards',
    args: [address, 1]
  })

  const { data: eAl } = useContractRead({
    address: contract,
    abi: VAULTABI,
    functionName: 'getUserEarnedRewards',
    args: [address, 2]
  })

  const { data: staked333Tokens } = useContractRead({
    address: contract,
    abi: VAULTABI,
    functionName: 'getStakedTokens',
    args: [address, 0]
  })

  const { data: staked3333Tokens } = useContractRead({
    address: contract,
    abi: VAULTABI,
    functionName: 'getStakedTokens',
    args: [address, 1]
  })

  const { data: stakedAlienTokens } = useContractRead({
    address: contract,
    abi: VAULTABI,
    functionName: 'getStakedTokens',
    args: [address, 2]
  })

  const earned333 =  parseInt(e333)
  const earned3333 = parseInt(e3333)
  const earnedAliens = parseInt(eAl)

  const setBal = async() => {
      const data = await fetch(`/api/balances/${address}`)
      const res = await data.json()
  
      const x = parseInt(res[0])
      const y = parseInt(res[1])
      const z = parseInt(res[2])

    document.getElementById('four').innerHTML = parseInt(y)
    document.getElementById('five').innerHTML = parseInt(x)
    document.getElementById('six').innerHTML = parseInt(z)
    const data333 = await fetch(`/api/staking/333/${address}`);
    const res333 = await data333.json();
    set333Staked(res333);
    
    const data3333 = await fetch(`/api/staking/3333/${address}`);
    const res3333 = await data3333.json();
    set3333Staked(res3333);

    const dataAlien = await fetch(`/api/staking/aliens/${address}`);
    const resAlien = await dataAlien.json();
    setalienStaked(resAlien);
  }

  setBal()

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-yellow-400/20 border mb-4 mx-4 mt-5">
      <p className="font-bold"></p>
      <div className="mt-2 mb-4">
        <div className="mx-auto text-center justify-center flex items-center">
      </div>
      </div>
      <div className="flex mb-6 flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center mt-3">
        <Link href="/staking/Hac3333">
          <div className="stats-container text-white">
          HORROR APES
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{staked3333Tokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold"><span id="four">{0}</span> NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-yellow-400 text-sm italic font-extrabold'>
              <span>You earned {(earned3333/1E18).toFixed(2)} HACT </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/staking/Hac333">
          <div className="stats-container text-white">
          PROJECT 333 APES
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{staked333Tokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold"><span id="five">{0}</span> NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-yellow-400 text-sm italic font-extrabold'>
              <span>You earned {(earned333/1E18).toFixed(2)} HACT </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/staking/HacAliens">
          <div className="stats-container text-white">
          ALIEN HORROR APES
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">{stakedAlienTokens?.length} NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold"><span id='six'>{0}</span> NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-yellow-400 text-sm italic font-extrabold'>
            <span>You earned {(earnedAliens/1E18).toFixed(2)} HACT </span>
                </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}


export default NFTs;
