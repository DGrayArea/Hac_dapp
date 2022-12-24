import React, { useState } from 'react';
import { useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
import StakedCard from './StakedCard';
import StkPagination from './StkPagination';

const StakedPagination = ({ contract, cardName, vaultId }) => {
    const address = useAddress()

    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address)
    
    console.log(ownedNFTs, address, error)
    
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(12);
      const [mobilePostsPerPage] = useState(5);
    
      // Get current posts
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = ownedNFTs?.slice(indexOfFirstPost, indexOfLastPost);
    
      const indexOfMobileLastPost = currentPage * mobilePostsPerPage;
      const indexOfMobileFirstPost = indexOfMobileLastPost - mobilePostsPerPage;
      const currentMobilePosts = ownedNFTs?.slice(indexOfMobileFirstPost, indexOfMobileLastPost);
    
      // Change page
      const paginate = pageNumber => setCurrentPage(pageNumber);
    
      return (
        <div className='mx-auto'>
          <StakedCard contract={contract} cardName={cardName} addie={address} vauldId={vaultId}  nftData={currentPosts} loading={isLoading} mobileData={currentMobilePosts}   />
          <StkPagination
            postsPerPage={postsPerPage}
            totalPosts={ownedNFTs?.length}
            paginate={paginate}
            mobilePostsPerPage={mobilePostsPerPage}
          />
        </div>
      );
    };

export default StakedPagination