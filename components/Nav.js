import React from 'react'
import { Image, Navbar, Button } from '@nextui-org/react'
import { useAddress, ConnectWallet } from '@thirdweb-dev/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'

 const Nav = (/*{mint, stake, rewards, background}*/) => {

  const[blur, setBlur] = useState(false)

  return (
    <div className={`bg-transparent ${blur && 'opacity-40'}`}>
      <Navbar css={{
        $$navbarBackgroundColor: 'transparent',
        $$navbarBlurBackgroundColor: 'transparrent'
      }} isBordered variant="static">
                           <style jsx>{`
        .hamburger {
          display: none;
        }

        @media only screen and (max-width: 480px) {
            .hamburger{ 
                display: flex;
             }
            }
            
            @media only screen and (max-width: 770px) {
                .hamburger{ 
                    display: flex;
                 }
              }
            
              @media only screen and (max-width: 900px) {
                .hamburger{ 
                    display: flex;
                 }
                 }
      `}</style>
        <Navbar.Brand>
            <div className='hamburger'>
             <Navbar.Toggle onClick={() => setBlur(!blur)} aria-label="toggle navigation" />
            </div>

          &nbsp;
          <a href='/'><Image src='/mainlogo.png' width={120} alt="" /></a>
        </Navbar.Brand>
        &nbsp;
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link css={{color:'#F5A524'}} href='/'>
                Home
            </Navbar.Link>
          <Navbar.Content /*isActive={stake} */>
            <div className='dropdown'>
            <Button css={{color:'#F5A524'}} auto flat bordered className="dropbtn text-[#F5A524]"><span className='text-[#F5A524]'>Staking</span> 
      <ChevronDownIcon className='w-5 text-[#F5A524]' />
    </Button>
    <div className="dropdown-content text-white rounded-xl">
      <Link className='text-[#F5A524] a-hover hover:text-[#F5A524]' href="/staking/Hac333">333 Staking</Link>
      <Link className='text-[#F5A524] a-hover hover:text-[#F5A524]' href="/staking/Hac3333">3333 Staking</Link>
      <Link className='text-[#F5A524] a-hover hover:text-[#F5A524]' href="/staking/HacAliens">Aliens Staking</Link>
    </div>
              </div>
          </Navbar.Content>
          <Navbar.Content /*isActive={stake} */>
            <div className='dropdown'>
            <Button auto flat bordered className="dropbtn"><span className='text-[#F5A524]'>Lotteries </span>
      <ChevronDownIcon className='w-5 text-[#F5A524]' />
    </Button>
    <div className="dropdown-content text-white rounded-xl">
      <Link className='text-white a-hover hover:text-[#F5A524]' href="/lotteries/Hac333">333 Lottery</Link>
      <Link className='text-white a-hover hover:text-[#F5A524]' href="/lotteries/Hac3333">3333 Lottery</Link>
      <Link className='text-white a-hover hover:text-[#F5A524]' href="/lotteries/HacAliens">Aliens Lottery</Link>
    </div>
              </div>
          </Navbar.Content>
          <Navbar.Content enableCursorHighlight>
          <Navbar.Link  css={{color:'#F5A524'}} href='/tokensale'>
          TokenSale
            </Navbar.Link>
            </Navbar.Content>
        </Navbar.Content>
        <Navbar.Content>
            <Navbar.Item>
              <div className='max-w-lg'>
                <ConnectWallet />
                </div>
            </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem /*isActive={mint}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
              }}
              href="/"
            >
             <span className='text-[#F5A524]'> Home &nbsp; </span>
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem /*isActive={stake}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
              }}
              href="/staking/Hac333"
            >
              <span className='text-[#F5A524]'>333 Staking &nbsp;  </span>
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem /*isActive={stake}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
              }}
              href="/staking/Hac3333"
            >
              <span className='text-[#F5A524]'>3333 Staking &nbsp;  </span>
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem /*isActive={stake}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
              }}
              href="/staking/HacAliens"
            >
              <span className='text-[#F5A524]'>Aliens Staking &nbsp;  </span>
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
              }}
              href="/lotteries/Hac333"
            >
            <span className='text-[#F5A524]'>333 Lottery &nbsp; </span> 
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
              }}
              href="/lotteries/Hac3333"
            >
             <span className='text-[#F5A524]'>3333 Lottery &nbsp;</span> 
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
                color:'#F5A524'
              }}
              href="/lotteries/HacAliens"
            >
            <span className='text-[#F5A524]'> Aliens Lottery &nbsp; </span>
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="warning"
              css={{
                minWidth: "100%",
                color:'#F5A524'
              }}
              href="/tokensale"
            >
            <span className='text-[#F5A524]'> TokenSale &nbsp; </span>
            </Link>
            </Navbar.CollapseItem>
      </Navbar.Collapse>
      </Navbar>
      </div>
  )
}
export default Nav