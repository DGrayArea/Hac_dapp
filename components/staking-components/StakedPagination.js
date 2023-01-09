import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import React, { useState, useEffect } from 'react';
import { Text, Badge, Card, Image, Row, Container, Button, Grid } from '@nextui-org/react';
import toast from 'react-hot-toast'
import { Pagination } from '@nextui-org/react';

const StakedPagination = ({ contract, cardName, vaultId }) => {

  const nftArr = ['0x7E82F54578f03ad922F2bA61674C46b9dBdCE61d', '0xAFc7647b584730694B9606511F11F423A0816eFf', '0xE33cc98d90975Ad42e56251B0A1cd8bda9FAF003']
    const address = useAddress()
    const nft = nftArr[vaultId]
    const vaultC = '0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E'

    const { contract: vaultContract } = useContract(vaultC);

    const [selected, setSelected] = useState([])
    const [stkedNfts, setStaked] = useState([])
    const { mutateAsync: unStake } = useContractWrite(vaultContract, "unStake")
    async function callStaked() {
        if (address != undefined) {
          if (vaultId == 0) {
            const data = await fetch(`/api/staking/333/${address}`);
            const res = await data.json();
            setStaked(res);
          } else if (vaultId == 1) {
            const data = await fetch(`/api/staking/3333/${address}`);
            const res = await data.json();
            setStaked(res);
          } else if (vaultId == 2) {
            const data = await fetch(`/api/staking/aliens/${address}`);
            const res = await data.json();
            setStaked(res);
          }
        }
    }

    useEffect(() => {
      const calStk = async() => {
          if (vaultId == 0) {
            const data = await fetch(`/api/staking/333/${address}`);
            const res = await data.json();
            setStaked(res);
          } else if (vaultId == 1) {
            const data = await fetch(`/api/staking/3333/${address}`);
            const res = await data.json();
            setStaked(res);
          } else if (vaultId == 2) {
            const data = await fetch(`/api/staking/aliens/${address}`);
            const res = await data.json();
            setStaked(res);
          }
      }
      calStk()
    }, [address])

  
    callStaked();
  
    
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage, setPost] = useState(12);
      const [mobilePostsPerPage, setMobile] = useState(5);
    
      // Get current posts
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = stkedNfts?.slice(indexOfFirstPost, indexOfLastPost);
    
      const indexOfMobileLastPost = currentPage * mobilePostsPerPage;
      const indexOfMobileFirstPost = indexOfMobileLastPost - mobilePostsPerPage;
      const currentMobilePosts = stkedNfts?.slice(indexOfMobileFirstPost, indexOfMobileLastPost);
    
      // Change page
      const paginate = pageNumber => setCurrentPage(pageNumber);

      const callUnstake = async () => {
        const notification = toast.loading("Unstaking your NFTs...");
    
        try {
          const data = await unStake([ vaultId, selected ]);
          console.info("contract call successs", data);
          toast.success("NFTs Unstaked Successfully", {
            id: notification,
          })
          setTimeout(() => window.location.reload(true), 3000)
        } catch (err) {
          console.error("contract call failure", err);
          toast.error("Whops something went wrong!", {
            id: notification,
          })
        }
      }

      const callUnstakeAll = async () => {
        const notification = toast.loading("Unstaking your NFTs...");
    
        try {
          const data = await unStake([ vaultId, stkedNfts ]);
          console.info("contract call successs", data);
          toast.success("NFTs Unstaked Successfully", {
            id: notification,
          })
          setTimeout(() => window.location.reload(true), 3000)
        } catch (err) {
          console.error("contract call failure", err);
          toast.error("Whops something went wrong!", {
            id: notification,
          })
        }
      }
    
    
      const check = (id, e) => {
        const arr = [...selected]
        let i = arr.indexOf(id)
        if(arr.includes(id)) {
          arr.splice(i, 1)
          e.currentTarget.style.border = '1px solid gray';
        } else {
           arr.push(id)
           e.currentTarget.style.border = '5px solid green';
        }
        setSelected(arr)
      }

      const pageNumbers = [];
      const mobilePageNo = []
    
      for (let i = 1; i <= Math.ceil(stkedNfts?.length / postsPerPage); i++) {
        pageNumbers.push(i);
      }
    
      for (let i = 1; i <= Math.ceil(stkedNfts?.length / mobilePostsPerPage); i++) {
        mobilePageNo.push(i);
      }
    
      return (
        <div className='mx-auto mb-8'>
            <>
   <div className='font-extrabold text-2xl text-center flex justify-center mb-5 mt-5 text-amber-500 animate-bounce'>Staked NFTs</div>
   <div className='hidden md:block lg:block'>
   <Grid.Container gap={2} justify='center'>
      {currentPosts?.map((post) => {
            const getUri = async (token) => {
              if (vaultId == 0) {
                const data = await fetch(`/api/image/one/${token}`).then(
                  (res) => res.text()
                );
                const res = await data;
                await fetch(res)
                  .then((res) => res.json())
                  .then((d) => {
                    let cleanUri = d.image.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    );
                    document.getElementById(token.toString()).src = cleanUri;
                  });
              } else if (vaultId == 1) {
                const data = await fetch(`/api/image/two/${token}`).then(
                  (res) => res.text()
                );
                const res = await data;
                await fetch(res)
                  .then((res) => res.json())
                  .then((d) => {
                    let cleanUri = d.image.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    );
                    document.getElementById(token.toString()).src = cleanUri;
                  });
              } else if (vaultId == 2) {
                const data = await fetch(`/api/image/three/${token}`).then(
                  (res) => res.text()
                );
                const res = await data;
                await fetch(res)
                  .then((res) => res.json())
                  .then((d) => {
                    let cleanUri = d.image.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    );
                    document.getElementById(token.toString()).src = cleanUri;
                  });
              }
            };

            const tokenDaily = async (token) => {
              if (vaultId == 0) {
                const data = await fetch(`/api/dailyEarn/333/${token}`).then(
                  (res) => res.text()
                )
                  .then((d) => {
                    document.getElementById((parseInt(token) + 5).toString()).innerHTML = d;
                  });
              } else if (vaultId == 1) {
                const data = await fetch(`/api/dailyEarn/3333/${token}`).then(
                  (res) => res.text()
                )
                  .then((d) => {
                    document.getElementById((parseInt(token) + 5).toString()).innerHTML = d;
                  });
              } else if (vaultId == 2) {
                const data = await fetch(`/api/dailyEarn/aliens/${token}`).then(
                  (res) => res.text()
                )
                  .then((d) => {
                    document.getElementById((parseInt(token) + 5).toString()).innerHTML = d;
                  });
              }
            };

            tokenDaily(parseInt(post))

            getUri(parseInt(post));
        return (
        <>
       <Grid xs={3} key={parseInt(post)}>
        <Container css={{mr:'$36'}}>
          <Card onClick={(e) => check(parseInt(post), e)} variant='bordered' style={{margin:"auto",border:'1px solid gray'}} css={{width: '150px', height:"185px"}} isPressable>
            <Card.Body css={{ p: 0 }}>
              <div style={{position: "relative"}}>
              <Image
                src={'/image-spin.gif'}
                objectFit="fill"
                width="100%"
                height={140}
                alt={post.title}
                sizes={'18'}
                id={post.toString()}
              /> 
              <div style={{position: "absolute", top:"4px", right:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='success'>
                staked
              </Badge>
              </div>
              <div style={{position: "absolute", top:"4px", left:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
                ID {parseInt(post)}
              </Badge>
              </div>
              </div>
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
          <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>{cardName}</Text>
                <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                TPD <span id={(parseInt(post) + 5).toString()}>{0}</span>
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          </Container>
          </Grid>
          </>
        )
})}
    </Grid.Container>
    </div>

    <div className='grid grid-cols-1 md:hidden lg:hidden space-y-3 space-x-2 justify-center text-center mr-2 items-center'>
      {currentMobilePosts?.map(post => {
        const tokenId = parseInt(post)
        const getUri = async (token) => {
          if (vaultId == 0) {
            const data = await fetch(`/api/image/one/${token}`).then(
              (res) => res.text()
            );
            const res = await data;
            await fetch(res)
              .then((res) => res.json())
              .then((d) => {
                let cleanUri = d.image.replace(
                  "ipfs://",
                  "https://gateway.ipfscdn.io/ipfs/"
                );
                document.getElementById('tokenId' + token.toString()).src = cleanUri;
              });
          } else if (vaultId == 1) {
            const data = await fetch(`/api/image/two/${token}`).then(
              (res) => res.text()
            );
            const res = await data;
            await fetch(res)
              .then((res) => res.json())
              .then((d) => {
                let cleanUri = d.image.replace(
                  "ipfs://",
                  "https://gateway.ipfscdn.io/ipfs/"
                );
                document.getElementById('tokenId' + token.toString()).src = cleanUri;
              });
          } else if (vaultId == 2) {
            const data = await fetch(`/api/image/three/${token}`).then(
              (res) => res.text()
            );
            const res = await data;
            await fetch(res)
              .then((res) => res.json())
              .then((d) => {
                let cleanUri = d.image.replace(
                  "ipfs://",
                  "https://gateway.ipfscdn.io/ipfs/"
                );
                document.getElementById('tokenId' + token.toString()).src = cleanUri;
              });
          }
        };

        const tokenDaily = async (token) => {
          if (vaultId == 0) {
            const data = await fetch(`/api/dailyEarn/333/${token}`).then(
              (res) => res.text()
            )
              .then((d) => {
                document.getElementById((parseInt(token) + 51).toString()).innerHTML = d;
              });
          } else if (vaultId == 1) {
            const data = await fetch(`/api/dailyEarn/3333/${token}`).then(
              (res) => res.text()
            )
              .then((d) => {
                document.getElementById((parseInt(token) + 51).toString()).innerHTML = d;
              });
          } else if (vaultId == 2) {
            const data = await fetch(`/api/dailyEarn/aliens/${token}`).then(
              (res) => res.text()
            )
              .then((d) => {
                document.getElementById((parseInt(token) + 51).toString()).innerHTML = d;
              });
          }
        };

        tokenDaily(parseInt(post))

        getUri(parseInt(post));
      return(
        <div className='' key={post?.tokenId}>
       <Container>
         <Card onClick={(e) => check(tokenId, e)} variant='bordered' style={{margin:"auto",border:'1px solid gray'}} css={{width: '150px', height:"185px"}} isPressable>
           <Card.Body css={{ p: 0 }}>
             <div style={{position: "relative"}}>
             <Image
               src={'/image-spin.gif'}
               objectFit="fill"
               width="100%"
               height={140}
               sizes={'18'}
               id={'tokenId' + parseInt(post.toString())}
             /> 
             <div style={{position: "absolute", top:"4px", right:"4px"}}>
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='success'>
               staked
             </Badge>
             </div>
             <div style={{position: "absolute", top:"4px", left:"4px"}}>
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
               ID {tokenId}
               </Badge>
             </div>
             </div>
           </Card.Body>
           <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
          <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>{cardName}</Text>
                <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                TPD <span id={(parseInt(post) + 51).toString()}>{0}</span>
                </Text>
              </Row>
            </Card.Footer>
         </Card>
         </Container>
         </div>
      )})}
    </div>
    <div className='flex justify-center text-center mx-auto m-4 items-center'>
    <Button
            onClick={callUnstakeAll}
            css={{ dflex: "center", mt:"$18" }}
            auto
            flat
            bordered
            color="warning"
          >
            Unstake All NFTs
          </Button>
          </div>
    <div className='flex justify-center text-center mx-auto m-4 items-center'>
   <Button onPress={callUnstake} css={{dflex:"center"}} auto flat bordered color='warning'>Unstake NFTs</Button>
   </div>
      </>
   <nav className='flex text-center items-center justify-center'>
            <div className='hidden md:block'><Pagination color='warning' loop total={pageNumbers.length} onChange={(page) => paginate(pageNumbers[page -1])} initialPage={1} /></div>
            <div className='block md:hidden'><Pagination color='warning' loop total={mobilePageNo.length} onChange={(page) => paginate(mobilePageNo[page -1])} initialPage={1} /></div>
    </nav>
        </div>
      );
    };

export default StakedPagination