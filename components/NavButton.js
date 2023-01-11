import React from 'react'


const NavButton = ({title, isActive}) => {
  return (
    <button className={`${isActive && 'bg-[#361652]'} hover:bg-[#361652] text-white px-4 py-2 rounded-lg font-bold`}>
        {title}
    </button>
  )
}

export default NavButton  