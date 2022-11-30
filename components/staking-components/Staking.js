import React from 'react'
import Header from '../Header'
import Nav from '../Nav'
import NftCard from './NftCard'
import StakingDetails from './StakingDetails'


const Staking = ({ name }) => {
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
        <Nav />
      <Header name={name} />
      <StakingDetails />
        <div className='nftDiv'>
        <NftCard />
        <NftCard />
        </div>
      </div>
  )
}

export default Staking