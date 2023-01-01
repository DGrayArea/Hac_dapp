import React, { useState } from 'react';
import { Container, Pagination } from '@nextui-org/react';
import { Text, Badge, Card, Image, Row, Checkbox, Loading, Button, Grid } from '@nextui-org/react';
import { useAddress, useOwnedNFTs, useContractRead, useContract, useContractWrite } from '@thirdweb-dev/react';
import toast from 'react-hot-toast'

const UnstakedPagination = ({ contract, cardName, vaultId }) => {
    const address = useAddress()

    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address)
    
    const [selected, setSelected] = useState([])
  
    const { contract: stakeContract } = useContract('0x9c6E303B68a956EA3fC13648B7685841E446afe0')
  
  
    const { data: isApproved, isLoading: isLoadingApproved } = useContractRead(contract, "isApprovedForAll", address, '0x9c6E303B68a956EA3fC13648B7685841E446afe0')
  
    const { mutateAsync: setApprovalForAll } = useContractWrite(contract, "setApprovalForAll")
  
    const { mutateAsync: stake, isLoading: isLoadingStake } = useContractWrite(stakeContract, "stake")
  
    const callStake = async () => {
      const notification = toast.loading("Staking your NFTs...");
  
      try {
        const data = await stake([vaultId, selected]);
        console.info("contract call successs", data);
        toast.success("NFTs Staked Successfully", {
          id: notification,
        })
       setTimeout(() => window.location.reload(true), 3000)
      } catch (err) {
        toast.error("Whops something went wrong!", {
          id: notification,
        })
        console.error("contract call failure", err);
      }
    }
  
  
    const callApprove = async () => {
      const notification = toast.loading("Approving NFTs to Stake...");
      try {
        const data = await setApprovalForAll([ '0x9c6E303B68a956EA3fC13648B7685841E446afe0', true ]);
        console.info("contract call successs", data);
        toast.success("NFTs Approved Successfully", {
          id: notification,
        })
      } catch (err) {
        toast.error("Whops something went wrong!", {
          id: notification,
        })
        console.error("contract call failure", err);
      }
    }
    
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
        console.log(selected)
      }

      const pageNumbers = [];
      const mobilePageNo = []
    
      for (let i = 1; i <= Math.ceil(ownedNFTs?.length / postsPerPage); i++) {
        pageNumbers.push(i);
      }
    
      for (let i = 1; i <= Math.ceil(ownedNFTs?.length / mobilePostsPerPage); i++) {
        mobilePageNo.push(i);
      }

      return (
        <div className='mx-auto'>
   <div className='font-extrabold text-2xl text-center flex justify-center mt-5 text-amber-500 animate-bounce'>Wallet NFTs</div>
   <div className='hidden mx-auto ml-5 md:block lg:block'>
   <Grid.Container gap={2} justify='center'>
      {currentPosts?.map(post => (
       <Grid xs={3} key={post.metadata.id}>
        <Container css={{mr:'$36'}}>
          <Card style={{border:'1px solid gray'}} onClick={(e) => check(post.metadata.id, e)} variant='bordered' css={{width: '150px', height:"185px"}} isPressable>
            <Card.Body css={{ p: 0 }}>
              <div style={{position: "relative"}}>
              <Image
                src={post.metadata.image}
                objectFit="fill"
                width="100%"
                height={140}
                alt={post.title}
                sizes={'18'}
              /> 
              <div style={{position: "absolute", top:"4px", right:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='error'>
                unstaked
              </Badge>
              </div>
              <div style={{position: "absolute", top:"4px", left:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
                ID {post.metadata.id}
              </Badge>
              </div>
              </div>
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
          <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>RS</Text>
                <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                268
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          </Container>
          </Grid>
      ))}
      </Grid.Container>
    </div>

    <div className='grid grid-cols-1 md:hidden space-y-3 space-x-2 justify-center text-center mr-2 items-center'>
      {currentMobilePosts?.map(post => (
       <div className='' key={post.metadata.id}>
       <Container>
         <Card onClick={(e) => check(post.metadata.id, e)} variant='bordered' style={{margin:"auto", border:'1px solid gray'}} css={{width: '150px', height:"185px"}} isPressable>
           <Card.Body css={{ p: 0 }}>
             <div style={{position: "relative"}}>
             <Image
               src={post.metadata.image}
               objectFit="fill"
               width="100%"
               height={140}
               alt={post.title}
               sizes={'18'}
             /> 
             <div style={{position: "absolute", top:"4px", right:"4px"}}>
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='error'>
               unstaked
             </Badge>
             </div>
             <div style={{position: "absolute", top:"4px", left:"4px"}}>
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
               ID {post.metadata.id}
               </Badge>
             </div>
             </div>
           </Card.Body>
           <Card.Footer css={{ justifyItems: "flex-start" }}>
             <Row wrap="wrap" justify="space-between" align="center">
         <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>RS</Text>
               <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
               134
               </Text>
             </Row>
           </Card.Footer>
         </Card>
         </Container>
         </div>
      ))}
    </div>
    <div className='flex justify-center text-center mx-auto m-4 items-center'>
      {isLoadingApproved ?
         <Button onClick={callStake} css={{dflex:"center"}} auto flat bordered color='warning'>Stake NFTs</Button>
         :
         <>
         {isApproved ?
         <Button onClick={callStake} css={{dflex:"center"}} auto flat bordered color='warning'>Stake NFTs</Button>
         :
         <Button onClick={callApprove} css={{dflex:"center"}} auto flat bordered color='warning'>Approve to Stake</Button>
         }
         </>
      }
   </div>
          <nav className='flex text-center items-center justify-center'>
            <div className='hidden md:block'><Pagination color='warning' loop total={pageNumbers.length} onChange={(page) => paginate(pageNumbers[page -1])} initialPage={1} /></div>
            <div className='block md:hidden'><Pagination color='warning' loop total={mobilePageNo.length} onChange={(page) => paginate(mobilePageNo[page -1])} initialPage={1} /></div>
    </nav>
        </div>
      );
    };

export default UnstakedPagination