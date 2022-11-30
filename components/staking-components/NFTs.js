import Link from "next/link";
import NavButton from "../NavButton";
import { _3333contract, _333contract, alienContract } from '../../config/config'
import { useContract, useOwnedNFTs, useAddress } from "@thirdweb-dev/react"

const NFTs = () => {

  const address = useAddress()

  const { contract : firstContract } = useContract(_3333contract);
  const { contract : secondContract } = useContract(_333contract);
  const { contract : thirdContract } = useContract(alienContract);

  const { data : _3333Bal, /*isLoading: isLdng3333VaultBal*/ } = useOwnedNFTs(firstContract, address)
  const { data : _333Bal, /*isLoading: isLdng333VaultBal*/ } = useOwnedNFTs(secondContract, address)
  const { data : alienBal, /*isLoading: isLdngAlienVaultBal*/ } = useOwnedNFTs(thirdContract, address)

  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-purple-300/20 border mx-4 mt-5">
      <p className="font-bold"></p>
      <div className="mt-2 mb-2">
      <NavButton isActive={true} title="Claim all Rewards"  />
      </div>
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center mt-3">
        <Link href="/staking/Hac3333">
          <div className="stats-container text-white">
            HAC 3333
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">120 NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold">{_3333Bal?.length} NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-purple-300 text-sm italic font-extrabold'>
              <span>You earned 0.24 HACT </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/staking/Hac333">
          <div className="stats-container text-white">
            HAC 333
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">120 NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold">{_333Bal?.length} NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-purple-300 text-sm italic font-extrabold'>
              <span>You earned 6.8 HACT </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/staking/HacAliens">
          <div className="stats-container text-white">
            HAC Alien
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <span className="font-medium">You Stake </span>
                <span className="font-bold">120 NFTs</span>
              </div>
              <div className="stats">
                <span className="font-medium">You Hold </span>
                <span className="font-bold">{alienBal?.length} NFTs</span>
              </div>
            </div>
            <div className="stats">
            <div className='text-purple-300 text-sm italic font-extrabold'>
            <span>You earned 10.8 HACT </span>
                </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NFTs;
