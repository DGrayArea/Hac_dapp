import React, { useState } from 'react';
import { Text, Badge, Card, Image, Row, Checkbox, Tooltip, Loading, Button, Grid } from '@nextui-org/react';
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';


const StakedCard = ({ nftData, loading, mobileData, contract, cardName, vaultId, addie }) => {

  const [selected, setSelected] = useState([])

  const { contract: vaultContract } = useContract("0xef5F57d5b7635DD7a825e6089ace9231f84C855e");
  const { data: stkedNfts, isLoading : isStakingNfts} = useContractRead(vaultContract, "getStakedTokens", addie, 0)


 // stkedNfts?.forEach((nft) => {
   // const { data: nftUri, isLoading } = useContractRead(contract, "tokenURI", parseInt(nft.tokenId))
    //console.log(parseInt(nft.tokenId), nftUri)
 // })

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
   <div className='font-extrabold text-2xl text-center flex justify-center mt-5 text-amber-500 animate-bounce'>Staked NFTs</div>
   <div className='hidden mx-auto md:items-center md:text-center md:justify-center lg:items-center lg:text-center md:ml-16 lg:ml-40 lg:justify-center md:block lg:block'>
   <Grid.Container className='mx-auto flex justify-center items-center text-center' gap={2} justify='center'>
      {nftData?.map(post => (
       <Grid xs={4} key={post.metadata.id}>
        <Checkbox color='warning' onChange={() => check(post.metadata.id)} id='checkbox'>
          <Card onClick={() => check(post.metadata.id)} variant='bordered' style={{margin:"auto"}} css={{width: '150px', height:"185px"}} isPressable>
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
              <Tooltip content={'this NFT earns 1 333HACT per day'} rounded color='warning'>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='success'>
                staked
              </Badge>
              </Tooltip>
              </div>
              <div style={{position: "absolute", top:"4px", left:"4px"}}>
              <Tooltip content={'this NFT has a rarity score of 246'} rounded color='warning'>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
                ID {post.metadata.id}
              </Badge>
              </Tooltip>
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
      ))}
    </Grid.Container>
    </div>

    <div className='mx-auto md:hidden lg:hidden flex justify-center mr-8 items-center text-center'>
    <Grid.Container gap={2} justify='center'>
      {mobileData?.map(post => (
       <Grid key={post.metadata.id}>
       <Checkbox color='warning' onChange={() => check(post.metadata.id)} id='checkbox'>
         <Card onClick={() => check(post.metadata.id)} variant='bordered' style={{margin:"auto"}} css={{width: '150px', height:"185px"}} isPressable>
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
             <Tooltip content={'this NFT earns 1 333HACT per day'} rounded color='warning'>
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='success'>
               staked
             </Badge>
             </Tooltip>
             </div>
             <div style={{position: "absolute", top:"4px", left:"4px"}}>
             <Tooltip content={'this NFT has a rarity score of 246'} rounded color='warning'>
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
               ID {post.metadata.id}
             </Badge>
             </Tooltip>
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
      ))}
    </Grid.Container>
    </div>
    <div className='flex justify-center text-center mx-auto m-4 items-center'>
   <Button css={{dflex:"center"}} auto flat bordered color='warning'>Unstake NFTs</Button>
   </div>
   </>
  );
};

export default StakedCard;