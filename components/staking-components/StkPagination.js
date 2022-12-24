import React from 'react';
import { Pagination } from '@nextui-org/react';

const StkPagination = ({ postsPerPage, totalPosts, paginate, mobilePostsPerPage }) => {
  const pageNumbers = [];
  const mobilePageNo = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  for (let i = 1; i <= Math.ceil(totalPosts / mobilePostsPerPage); i++) {
    mobilePageNo.push(i);
  }

  return (
    <nav className='flex text-center items-center justify-center'>
            <div className='hidden md:block'><Pagination color='warning' loop total={pageNumbers.length} onChange={(page) => paginate(pageNumbers[page -1])} initialPage={1} /></div>
            <div className='block md:hidden'><Pagination color='warning' loop total={mobilePageNo.length} onChange={(page) => paginate(mobilePageNo[page -1])} initialPage={1} /></div>
    </nav>
  );
};

export default StkPagination;