import React from 'react'
import Header from '../Header'
import Nav from '../Nav'
import StakedPagination from './StakedPagination'
import StakingDetails from './StakingDetails'
import UnstakedPagination from './UnstakedPagination'


const Staking = ({ name, user, vaultId, contract, cardName }) => {
  return (
    <div className="bg-[#0d0613] min-h-screen flex flex-col">
            <style jsx>{`
        .nftDiv {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        }
        @media only screen and (max-width: 480px) {
            .nftDiv{ 
                display: block;
             }
            }
            
            @media only screen and (max-width: 770px) {
                .nftDiv{ 
                    display: block;
                 }
              }
            
              @media only screen and (max-width: 900px) {
                .nftDiv{ 
                    display: block;
                  }
                  @media only screen and (max-width: 1000px) {
                    .nftDiv{ 
                        display: block;
                      }
                 }
      `}</style>
      <Header name={name} />
      <StakingDetails user={user} vaultId={vaultId} />
        <div className='nftDiv'>
          <UnstakedPagination contract={contract} cardName={cardName} />
        <StakedPagination contract={contract} cardName={cardName} />
        </div>
      </div>
  )
}

export default Staking