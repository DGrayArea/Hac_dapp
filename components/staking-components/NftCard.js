import { Card, Row, Text, Table, Image, Badge } from "@nextui-org/react";
import NavButton from "../NavButton";

const NftCard = () => {

  const list = [
    {
      title: "RS",
      img: "/images/fruit-1.jpeg",
      price: "5.50",
    },
    {
      title: "RS",
      img: "/images/fruit-2.jpeg",
      price: "3.00",
    },
    {
      title: "RS",
      img: "/images/fruit-3.jpeg",
      price: "10.00",
    },
    {
      title: "RS",
      img: "/images/fruit-4.jpeg",
      price: "5.30",
    },
    {
      title: "RS",
      img: "/images/fruit-5.jpeg",
      price: "15.70",
    },
    {
      title: "RS",
      img: "/images/fruit-6.jpeg",
      price: "8.00",
    },
    {
      title: "RS",
      img: "/images/fruit-7.jpeg",
      price: "7.50",
    },
    {
      title: "RS",
      img: "/images/fruit-8.jpeg",
      price: "12.20",
    },
  ];

  return (
    <div className="mx-auto flex-1 mt-5 mb-5 ml-5 mr-5">
    <Table
      bordered
      shadow={false}
      selectionMode="multiple"
      aria-label="Example static bordered collection table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      color="secondary"
    > 
    <Table.Header>
    <Table.Column><Text h2 size={18} css={{ textGradient: "120deg, $blue700 -40%, $purple800 50%", dflex:"center", fontWeight:"$extrabold"}} weight="extrabold" b>NFTS</Text></Table.Column>
    </Table.Header>
   <Table.Body>
    {list.map((item, index) => (
       <Table.Row key={index.toString()}>
         <Table.Cell>
          <Card style={{margin:"auto"}} css={{width: '150px', height:"140px"}} id={index.toString()} isPressable>
            <Card.Body css={{ p: 0 }}>
              <div style={{position: "relative"}}>
              <Image
                src={"https://nextui.org" + item.img}
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
                sizes={'18'}
              /> 
              <div style={{position: "absolute", top:"4px", right:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='primary'>
                staked
              </Badge>
              </div>
              <div style={{position: "absolute", top:"4px", left:"4px"}}>
              <Badge style={{border:"1px solid transparent"}} variant="flat" color='default'>
                ID 16
              </Badge>
              </div>
              </div>
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
          <Text h4 size={15} css={{ textGradient: "90deg, $blue700 -40%, $purple800 50%"}} weight="bold" b>{item.title}</Text>
                <Text h4 css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                  {item.price}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
          </Table.Cell>
          </Table.Row>
      ))}
      </Table.Body>
      <Table.Pagination
      style={{margin:"auto"}}
              shadow
              noMargin
              align="center"
              rowsPerPage={3}
              onPageChange={(page) => console.log({ page })}
              color="secondary"
            />
    </Table>
    <div className="mx-auto m-5 text-center" >
          <NavButton isActive={true} title='Stake' />
    </div>

    </div>

  );
}

export default NftCard
