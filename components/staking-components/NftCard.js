import React, { useState } from 'react';
import { Text, Badge, Card, Image, Row, Checkbox, Tooltip, Loading, Button } from '@nextui-org/react';

const NftCard = ({ nftData, loading, mobileData, contract, cardName }) => {

  const [selected, setSelected] = useState([])
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
   <div className='hidden md:grid md:grid-cols-3 md:space-y-6 lg:space-x-5 lg:space-y-8 md:justify-center text-center items-center md:m-8'>
      {nftData?.map(post => (
       <div className='align-middle' key={post.metadata.id}>
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
          </div>
      ))}
    </div>
    <div className='grid grid-cols-1 md:hidden space-y-3 space-x-2 justify-center text-center items-center m-8'>
      {mobileData?.map(post => (
       <div className='' key={post.metadata.id}>
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
   <Button css={{dflex:"center"}} auto flat bordered color='warning'>Stake NFTs</Button>
   </div>
   </>
  );
};

export default NftCard;