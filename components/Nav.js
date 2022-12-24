import React from 'react'
import { Image, Navbar, Button } from '@nextui-org/react'
import { useAddress, ConnectWallet } from '@thirdweb-dev/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

 const Nav = (/*{mint, stake, rewards, background}*/) => {
    const address = useAddress()


  return (
    <div className='bg-black'>
      <Navbar isBordered variant="static">
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
             <Navbar.Toggle aria-label="toggle navigation" />
            </div>

          &nbsp;
          &nbsp;
          &nbsp;
          <Image src='helionlogo.png' width={120} alt="" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link href='/'>
                Home
            </Navbar.Link>
          <Navbar.Content /*isActive={stake} */>
            <div className='dropdown'>
            <Button auto flat bordered className="dropbtn">Staking 
      <ChevronDownIcon className='w-4' />
    </Button>
    <div className="dropdown-content text-white rounded-xl">
      <Link className='text-white a-hover hover:text-white' href="/staking/Hac333">333 Staking</Link>
      <Link className='text-white a-hover hover:text-white' href="/staking/Hac3333">3333 Staking</Link>
      <Link className='text-white a-hover hover:text-white' href="/staking/HacAliens">Aliens Staking</Link>
    </div>
              </div>
          </Navbar.Content>
          <Navbar.Content /*isActive={stake} */>
            <div className='dropdown'>
            <Button auto flat bordered className="dropbtn">Lotteries 
      <ChevronDownIcon className='w-4' />
    </Button>
    <div className="dropdown-content text-white rounded-xl">
      <Link className='text-white a-hover hover:text-white' href="/lotteries/Hac333">333 Lottery</Link>
      <Link className='text-white a-hover hover:text-white' href="/lotteries/Hac3333">3333 Lottery</Link>
      <Link className='text-white a-hover hover:text-white' href="/lotteries/HacAliens">Aliens Lottery</Link>
    </div>
              </div>
          </Navbar.Content>
        </Navbar.Content>
        <Navbar.Content>
            <Navbar.Item>
                <ConnectWallet />
            </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem /*isActive={mint}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/"
            >
              Home &nbsp; 
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem /*isActive={stake}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/staking/Hac333"
            >
              333 Staking &nbsp;  
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem /*isActive={stake}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/staking/Hac3333"
            >
              3333 Staking &nbsp;  
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem /*isActive={stake}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/staking/HacAliens"
            >
              Aliens Staking &nbsp;  
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/lotteries/Hac333"
            >
             333 Lottery &nbsp; 
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/lotteries/Hac3333"
            >
             3333 Lottery &nbsp; 
            </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem  /*isActive={rewards}*/>
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/lotteries/HacAliens"
            >
             Aliens Lottery &nbsp; 
            </Link>
            </Navbar.CollapseItem>
      </Navbar.Collapse>
      </Navbar></div>
  )
}
export default Nav
