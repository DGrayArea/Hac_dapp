import React, { useState } from 'react';
import { Text, Badge, Card, Image, Row, Checkbox, Tooltip, Loading, Button, Grid } from '@nextui-org/react';
import { useAddress, useContractRead, useContract, useContractWrite } from '@thirdweb-dev/react';
import toast from 'react-hot-toast'

const NftCard = ({ nftData, loading, mobileData, contract, cardName, vaultId }) => {

  const [selected, setSelected] = useState([])

  const address = useAddress()

  const { contract: stakeContract } = useContract('0xB9cAa80147D8f3cF3A4D52965406b515d5ca6797')


  const { data: isApproved, isLoading: isLoadingApproved } = useContractRead(contract, "isApprovedForAll", address, '0xB9cAa80147D8f3cF3A4D52965406b515d5ca6797')

  const { mutateAsync: setApprovalForAll, isLoading } = useContractWrite(contract, "setApprovalForAll")

  const { mutateAsync: stake, isLoading: isLoadingStake } = useContractWrite(stakeContract, "stake")

  const callStake = async () => {
    const notification = toast.loading("Staking your NFTs...");

    try {
      const data = await stake([vaultId, selected]);
      console.info("contract call successs", data);
      toast.success("NFTs Staked Successfully", {
        id: notification,
      })
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
      const data = await setApprovalForAll([ '0xB9cAa80147D8f3cF3A4D52965406b515d5ca6797', true ]);
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
   <div className='font-extrabold text-2xl text-center flex justify-center mt-5 text-amber-500 animate-bounce'>Wallet NFTs</div>
   <div className='hidden mx-auto md:items-center md:text-center md:justify-center lg:items-center lg:text-center md:ml-16 lg:ml-40 lg:justify-center md:block lg:block'>
   <Grid.Container className='mx-auto flex justify-center items-center text-center' gap={2} justify='center'>
      {nftData?.map(post => (
       <Grid xs={4} key={post.metadata.id}>
        <Checkbox color='warning' id='checkbox'>
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
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='error'>
                unstaked
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
          <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>RS</Text>
                <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                268
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          </Checkbox>
          </Grid>
      ))}
      </Grid.Container>
    </div>

    <div className='grid grid-cols-1 md:hidden space-y-3 space-x-2 justify-center text-center mr-10 items-center'>
      {mobileData?.map(post => (
       <div className='' key={post.metadata.id}>
       <Checkbox color='warning'  id='checkbox'>
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
             <Badge style={{border:"1px solid transparent"}} variant="flat" color='errorr'>
               unstaked
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
         <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>RS</Text>
               <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
               134
               </Text>
             </Row>
           </Card.Footer>
         </Card>
         </Checkbox>
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
   </>
  );
};

export default NftCard;