import React, { useState } from 'react';
import { Text, Badge, Card, Image, Row, Checkbox, Loading, Button, Grid } from '@nextui-org/react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import toast from 'react-hot-toast'
import { ethers } from 'ethers';
import ABI from '../../config/ABI'


const StakedCard = ({ nftData, loading, mobileData, contract, cardName, vaultId, addie }) => {

  const nft = '0xD84d651e4B6968FF8865cFacAF3db20b28b136a8'

  const [selected, setSelected] = useState([])
  const [stakedArr, setStakedArr] = useState([])
  const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
  const ethersContract = new ethers.Contract(nft, ABI, provider)

  const { contract: vaultContract } = useContract("0x76F69BE8739b4B0D8A23c498b880614aA01bA91B");
  const { data: stkedNfts, isLoading : isLoadingStaked} = useContractRead(vaultContract, "getStakedTokens", addie, 0)
  const { mutateAsync: unStake, isLoading } = useContractWrite(vaultContract, "unStake")

  const callUnstake = async () => {
    const notification = toast.loading("Claiming your rewards...");

    try {
      const data = await unStake([ 0, selected ]);
      console.info("contract call successs", data);
      toast.success("NFTs Unstaked Successfully", {
        id: notification,
      })
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Whops something went wrong!", {
        id: notification,
      })
    }
  }


  if (loading) {
    return <div className='mt-16 mx-auto m-6'><Loading css={{dflex:"center"}} size='xl' color="warning" textColor="warning">
    
  </Loading></div>;
  }

  const check = (id) => {
    const arr = [...selected]
    let i = arr.indexOf(id)
    arr.includes(id) ? arr.splice(i, 1) :  arr.push(id)
    setSelected(arr)
    console.log(selected)
  }

  return (
   <>
   <div className='font-extrabold text-2xl text-center flex justify-center mb-5 mt-5 text-amber-500 animate-bounce'>Staked NFTs</div>
   <div className='hidden mx-auto md:items-center md:text-center md:justify-center lg:items-center lg:text-center md:ml-16 lg:ml-40 lg:justify-center md:block lg:block'>
   <Grid.Container className='mx-auto flex justify-center items-center text-center' gap={2} justify='center'>
      {nftData?.map((post) => {
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
          getUri(parseInt(post.tokenId))
        return (
        <>
       <Grid xs={4} key={parseInt(post.tokenId)}>
        <Checkbox color='warning' id='checkbox'>
          <Card onClick={() => check(parseInt(post.tokenId))} variant='bordered' style={{margin:"auto"}} css={{width: '150px', height:"185px"}} isPressable>
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
                {'1 TPD'}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          </Checkbox>
          </Grid>
          </>
        )
})}
    </Grid.Container>
    </div>

    <div className='mx-auto md:hidden lg:hidden flex justify-center mr-8 items-center text-center'>
    <Grid.Container className='mx-auto flex justify-center items-center text-center' gap={2} justify='center'>
      {nftData?.map((post) => {
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
          getUri(parseInt(post.tokenId))
        return (
        <>
       <Grid xs={4} key={parseInt(post.tokenId)}>
        <Checkbox color='warning' id='checkbox'>
          <Card onClick={() => check(parseInt(post.tokenId))} variant='bordered' style={{margin:"auto"}} css={{width: '150px', height:"185px"}} isPressable>
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
                {'1 TPD'}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          </Checkbox>
          </Grid>
          </>
        )
})}
    </Grid.Container>
    </div>
    <div className='flex justify-center text-center mx-auto m-4 items-center'>
   <Button onPress={callUnstake} css={{dflex:"center"}} auto flat bordered color='warning'>Unstake NFTs</Button>
   </div>
   </>
  );
};

export default StakedCard;