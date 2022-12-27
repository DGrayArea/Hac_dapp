import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import Nav from '../components/Nav'
import { _3333contract, _333contract, alienContract, vaultContract } from '../config/config'
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react"
import NFTs from '../components/staking-components/NFTs'

const Home = () => {

  const { contract : firstContract } = useContract(_3333contract);
  const { contract : secondContract } = useContract(_333contract);
  const { contract : thirdContract } = useContract(alienContract);

  const { data : _3333VaultBal, /*isLoading: isLdng3333VaultBal*/ } = useOwnedNFTs(firstContract, vaultContract)
  const { data : _333VaultBal, /*isLoading: isLdng333VaultBal*/ } = useOwnedNFTs(secondContract, vaultContract)
  const { data : alienVaultBal, /*isLoading: isLdngAlienVaultBal*/ } = useOwnedNFTs(thirdContract, vaultContract)

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Head>
        <title>Horror Ape Club 333 Lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <div className="flex-1">
      <Header name='HAC STAKING' />
      <div className='text-white text-center px-5 py-3 rounded-md border-yellow-400/20 border mx-4'>
       <h2 className='font-bold mb-5'>Total Staked</h2>

       <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center'>
        <div className='stats-container justify-between'>
          <Image width={20} height={20} alt="logo" className='rounded-full h-12 w-12 mx-auto' src="/Favicon.png" />
          <div className='font-bold'>Hac 3333 NFTs</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'>{_3333VaultBal?.length}/ 3333</span>
           </div>
          </div>
        </div>
        <div className='stats-container justify-between'>
          <Image width={20} height={20} alt="logo" className='rounded-full h-12 w-12 mx-auto' src="/Favicon.png" />
          <div className='font-bold'>Hac 333 NFTs</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'>{_333VaultBal?.length}/ 333</span>
           </div>
          </div>
        </div>
        <div className='stats-container justify-between'>
          <Image width={20} height={20} alt="logo" className='rounded-full h-12 w-12 mx-auto' src="/Favicon.png" />
          <div className='font-bold'>Hac Alien NFTs</div>
          <div className='mt-3'>
          <div className='stats'>  
          <span className='font-medium mr-6'>Total staked </span>
            <span className='font-bold ml-6'>{alienVaultBal?.length}/ 3000</span>
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
