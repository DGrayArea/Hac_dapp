import { useContractRead, useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import React, { useState } from 'react';
import { Text, Badge, Card, Image, Row, Container, Loading, Button, Grid } from '@nextui-org/react';
import toast from 'react-hot-toast'
import { ethers } from 'ethers';
import ABI from '../../config/ABI'
import VAULTABI from '../../config/VAULTABI'
import { Pagination } from '@nextui-org/react';

const StakedPagination = ({ contract, cardName, vaultId }) => {
    const address = useAddress()
    const nft = '0xD84d651e4B6968FF8865cFacAF3db20b28b136a8'
    const vaultC = '0x9c6E303B68a956EA3fC13648B7685841E446afe0'

    const { contract: vaultContract } = useContract(vaultC);

    const [selected, setSelected] = useState([])
    const [stakedArr, setStakedArr] = useState([])
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
    const ethersContract = new ethers.Contract(nft, ABI, provider)
    const ethersVaultC = new ethers.Contract(vaultC, VAULTABI, provider)
    const { mutateAsync: unStake } = useContractWrite(vaultContract, "unStake")

    const { data: stkedNfts, isLoading } = useContractRead(vaultContract, "getStakedTokens", address, vaultId)
    
    console.log(stkedNfts)
    
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(12);
      const [mobilePostsPerPage] = useState(5);
    
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
    
      for (let i = 1; i <= Math.ceil(stkedNfts?.length / postsPerPage); i++) {
        pageNumbers.push(i);
      }
    
      for (let i = 1; i <= Math.ceil(stkedNfts?.length / mobilePostsPerPage); i++) {
        mobilePageNo.push(i);
      }
    
      const tokenDaily = async(id) => {
        const x = await ethersVaultC.tokenRarity(0, id);
        return x
      }
      return (
        <div className='mx-auto mb-8'>
             <>
   <div className='font-extrabold text-2xl text-center flex justify-center mb-5 mt-5 text-amber-500 animate-bounce'>Staked NFTs</div>
   <div className='hidden md:block lg:block'>
   <Grid.Container gap={2} justify='center'>
      {currentPosts?.map((post) => {
        var nftstkobj = []
          const getUri = async (token) => {
            const uri = await ethersContract.tokenURI(token);
            const parsed = await uri.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            );
             await fetch(parsed)
              .then((res) => res.json())
              .then((d) => {
                let cleanUri = d.image.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");
                 nftstkobj.push(cleanUri)
                 document.getElementById(token.toString()).src = cleanUri
              });
              return nftstkobj
          }
          getUri(parseInt(post?.tokenId))
          const daily = async() => {
            await tokenDaily(parseInt(post?.tokenId)).then(
              (d) =>
                ((d))
            );
          };
          daily()
        return (
        <>
       <Grid xs={3} key={parseInt(post.tokenId)}>
        <Container css={{mr:'$36'}}>
          <Card onClick={(e) => check(parseInt(post.tokenId), e)} variant='bordered' style={{margin:"auto",border:'1px solid gray'}} css={{width: '150px', height:"185px"}} isPressable>
            <Card.Body css={{ p: 0 }}>
              <div style={{position: "relative"}}>
              <Image
                src={''}
                objectFit="fill"
                width="100%"
                height={140}
                alt={post.title}
                sizes={'18'}
                id={post.tokenId.toString()}
              /> 
              <div style={{position: "absolute", top:"4px", right:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='success'>
                staked
              </Badge>
              </div>
              <div style={{position: "absolute", top:"4px", left:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
                ID {parseInt(post.tokenId)}
              </Badge>
              </div>
              </div>
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
          <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>{cardName}</Text>
                <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                TPD 1
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
        const tokenId = parseInt(post?.tokenId)
        var nftstkobj = []
          const getUri = async (token) => {
            const uri = await ethersContract.tokenURI(token);
            const parsed = await uri.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            );
             await fetch(parsed)
              .then((res) => res.json())
              .then((d) => {
                let cleanUri = d.image.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/");
                 nftstkobj.push(cleanUri)
                 document.getElementById('token' + token.toString()).src = cleanUri
              });
              return nftstkobj
          }
          getUri(parseInt(post?.tokenId))
      return(
        <div className='' key={post?.tokenId}>
       <Container>
         <Card onClick={(e) => check(tokenId, e)} variant='bordered' style={{margin:"auto",border:'1px solid gray'}} css={{width: '150px', height:"185px"}} isPressable>
           <Card.Body css={{ p: 0 }}>
             <div style={{position: "relative"}}>
             <Image
               src={''}
               objectFit="fill"
               width="100%"
               height={140}
               sizes={'18'}
               id={'token' + parseInt(post?.tokenId?.toString())}
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
         <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>RS</Text>
               <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
               134
               </Text>
             </Row>
           </Card.Footer>
         </Card>
         </Container>
         </div>
      )})}
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