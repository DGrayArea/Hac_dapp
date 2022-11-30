import React from 'react'
import { Image, Navbar, Dropdown, Link,} from '@nextui-org/react'
import { useAddress, ConnectWallet } from '@thirdweb-dev/react'



 const Nav = (/*{mint, stake, rewards, background}*/) => {
    const address = useAddress()


  return (
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
        <Dropdown isBordered>
            <Navbar.Item>
                Home
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="autoscaling"
                showFullDescription
                description="ACME scales apps to meet user demand, automagically, based on load."
              >
                Autoscaling
              </Dropdown.Item>
              <Dropdown.Item
                key="usage_metrics"
                showFullDescription
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              >
                Usage Metrics
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                showFullDescription
                description="ACME runs on ACME, join us and others serving requests at web scale."
              >
                Production Ready
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
                showFullDescription
                description="Applications stay on the grid with high availability and high uptime guarantees."
              >
                +99% Uptime
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                showFullDescription
                description="Overcome any challenge with a supporting team ready to respond."
              >
                +Supreme Support
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Navbar.Link /*isActive={stake} */ href="/staking/Hac333">
            Staking
          </Navbar.Link>
          <Navbar.Link /*isActive={rewards}*/ href="/lotteries/Hac333">Lotteries</Navbar.Link>
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
              Staking &nbsp;  
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
             Lotteries &nbsp; 
            </Link>
            </Navbar.CollapseItem>
      </Navbar.Collapse>
      </Navbar>
  )
}
export default Nav