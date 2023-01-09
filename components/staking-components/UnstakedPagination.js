import React, { useEffect, useState } from "react";
import { Container, Pagination } from "@nextui-org/react";
import { Text, Badge, Card, Image, Row, Button, Grid } from "@nextui-org/react";
import {
  useAddress,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import toast from "react-hot-toast";
import NFTABI from "../../config/NFTABI.json";

const UnstakedPagination = ({ contract, cardName, vaultId, tokenC }) => {
  const address = useAddress();
  const nftArr = [
    "0xceA4195AeCc3622179334e346cF526312F32D836",
    "0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68",
    "0x120A9664D35031691eC7ee98B81F1A87ebbD1217",
  ];
  const nft = nftArr[vaultId];

  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  async function calllNfts() {
    if (address != undefined) {
      if (vaultId == 0) {
        const data = await fetch(`/api/details/333/${address}`);
        const res = await data.json();
        setOwnedNFTs(res);
      } else if (vaultId == 1) {
        const data = await fetch(`/api/details/3333/${address}`);
        const res = await data.json();
        setOwnedNFTs(res);
      } else if (vaultId == 2) {
        const data = await fetch(`/api/details/aliens/${address}`);
        const res = await data.json();
        setOwnedNFTs(res);
      }
      const isApp = await fetch(`/api/approved/${address}`).then(res => res.json())
      const appRes = await isApp
      setIsApproved(appRes[vaultId]);
    }
  }

  useEffect(() => {
    const callNtt = async () => {
        if (vaultId == 0) {
          const data = await fetch(`/api/details/333/${address}`);
          const res = await data.json();
           
          setOwnedNFTs(res);
        } else if (vaultId == 1) {
          const data = await fetch(`/api/details/3333/${address}`);
          const res = await data.json();
          setOwnedNFTs(res);
        } else if (vaultId == 2) {
          const data = await fetch(`/api/details/aliens/${address}`);
          const res = await data.json();
          setOwnedNFTs(res);
        }
        const isApp = await fetch(`/api/approved/${address}`).then(res => res.json())
        const appRes = await isApp;
        setIsApproved(appRes[vaultId]);
      }
    callNtt();
  }, []);

  calllNfts();

  const { contract: stakeContract } = useContract(
    "0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E"
  );

  const { mutateAsync: stake, isLoading: isLoadingStake } = useContractWrite(
    stakeContract,
    "stake"
  );

  const callStake = async () => {
    const notification = toast.loading("Staking your NFTs...");

    try {
      const data = await stake([vaultId, selected]);
      console.info("contract call successs", data);
      toast.success("NFTs Staked Successfully", {
        id: notification,
      });
      setTimeout(() => window.location.reload(true), 3000);
    } catch (err) {
      toast.error("Whops something went wrong!", {
        id: notification,
      });
      console.error("contract call failure", err);
    }
  };

  const callStakeAll = async () => {
    const notification = toast.loading("Staking your NFTs...");

    try {
      const data = await stake([vaultId, ownedNFTs]);
      console.info("contract call successs", data);
      toast.success("All NFTs Staked Successfully", {
        id: notification,
      });
      setTimeout(() => window.location.reload(true), 3000);
    } catch (err) {
      toast.error("Whops something went wrong!", {
        id: notification,
      });
      console.error("contract call failure", err);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setP] = useState(12);
  const [mobilePostsPerPage, setM] = useState(5);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ownedNFTs?.slice(indexOfFirstPost, indexOfLastPost);

  const indexOfMobileLastPost = currentPage * mobilePostsPerPage;
  const indexOfMobileFirstPost = indexOfMobileLastPost - mobilePostsPerPage;
  const currentMobilePosts = ownedNFTs?.slice(
    indexOfMobileFirstPost,
    indexOfMobileLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const check = (id, e) => {
    const arr = [...selected];
    let i = arr.indexOf(id);
    if (arr.includes(id)) {
      arr.splice(i, 1);
      e.currentTarget.style.border = "1px solid gray";
    } else {
      arr.push(id);
      e.currentTarget.style.border = "5px solid green";
    }
    setSelected(arr);
  };

  const pageNumbers = [];
  const mobilePageNo = [];

  for (let i = 1; i <= Math.ceil(ownedNFTs?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  for (let i = 1; i <= Math.ceil(ownedNFTs?.length / mobilePostsPerPage); i++) {
    mobilePageNo.push(i);
  }

  return (
    <div className="mx-auto">
      <div className="font-extrabold text-2xl text-center flex justify-center mt-5 text-amber-500 animate-bounce">
        Wallet NFTs
      </div>
      <div className="hidden mx-auto ml-5 md:block lg:block">
        <Grid.Container gap={2} justify="center">
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

            getUri(parseInt(post));

            return (
              <Grid xs={3} key={parseInt(post)}>
                <Container css={{ mr: "$36" }}>
                  <Card
                    style={{ border: "1px solid gray" }}
                    onClick={(e) => check(parseInt(post), e)}
                    variant="bordered"
                    css={{ width: "150px", height: "185px" }}
                    isPressable
                  >
                    <Card.Body css={{ p: 0 }}>
                      <div style={{ position: "relative" }}>
                        <Image
                          src={'/image-spin.gif'}
                          objectFit="fill"
                          width="100%"
                          height={140}
                          alt={post}
                          sizes={"18"}
                          id={parseInt(post).toString()}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                          }}
                        >
                          <Badge
                            style={{ border: "1px solid transparent" }}
                            variant="flat"
                            color="error"
                          >
                            unstaked
                          </Badge>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "4px",
                            left: "4px",
                          }}
                        >
                          <Badge
                            style={{ border: "1px solid transparent" }}
                            variant="flat"
                            color="default"
                          >
                            ID {parseInt(post)}
                          </Badge>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }}>
                      <Row wrap="wrap" justify="space-between" align="center">
                        <Text
                          h4
                          size={15}
                          css={{
                            textGradient:
                              "90deg, $blue700 -40%, $purple800 50%",
                          }}
                          weight="bold"
                          b
                        >
                          RS
                        </Text>
                        <Text
                          h4
                          css={{
                            color: "$accents7",
                            fontWeight: "$semibold",
                            fontSize: "$sm",
                          }}
                        >
                          TBD
                        </Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Container>
              </Grid>
            );
          })}
        </Grid.Container>
      </div>

      <div className="grid grid-cols-1 md:hidden space-y-3 space-x-2 justify-center text-center mr-2 items-center">
        {currentMobilePosts?.map((post) => {
          const getUri = async (token) => {
            if (vaultId == 0) {
              const data = await fetch(`/api/image/one/${token}`).then((res) =>
                res.text()
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
              const data = await fetch(`/api/image/two/${token}`).then((res) =>
                res.text()
              );
              const res = await data;
              await fetch(res)
                .then((res) => res.json())
                .then((d) => {
                  let cleanUri = d.image.replace(
                    "ipfs://",
                    "https://gateway.ipfscdn.io/ipfs/"
                  );
                  console.log(cleanUri);
                  document.getElementById("token" + token.toString()).src =
                    cleanUri;
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

          getUri(parseInt(post));
          return (
            <div className="" key={parseInt(post)}>
              <Container>
                <Card
                  style={{ border: "1px solid gray" }}
                  onClick={(e) => check(parseInt(post), e)}
                  variant="bordered"
                  css={{ width: "150px", height: "185px" }}
                  isPressable
                >
                  <Card.Body css={{ p: 0 }}>
                    <div style={{ position: "relative" }}>
                      <Image
                        src={'/image-spin.gif'}
                        objectFit="fill"
                        width="100%"
                        height={140}
                        alt={post}
                        sizes={"18"}
                        id={"token" + parseInt(post).toString()}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                        }}
                      >
                        <Badge
                          style={{ border: "1px solid transparent" }}
                          variant="flat"
                          color="error"
                        >
                          unstaked
                        </Badge>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "4px",
                          left: "4px",
                        }}
                      >
                        <Badge
                          style={{ border: "1px solid transparent" }}
                          variant="flat"
                          color="default"
                        >
                          ID {parseInt(post)}
                        </Badge>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text
                        h4
                        size={15}
                        css={{
                          textGradient: "90deg, $blue700 -40%, $purple800 50%",
                        }}
                        weight="bold"
                        b
                      >
                        RS
                      </Text>
                      <Text
                        h4
                        css={{
                          color: "$accents7",
                          fontWeight: "$semibold",
                          fontSize: "$sm",
                        }}
                      >
                        TBD
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Container>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center text-center mx-auto m-4 items-center">
      <Button
            onClick={callStakeAll}
            css={{ dflex: "center", mt:"$18" }}
            auto
            flat
            bordered
            color="warning"
          >
            Stake All NFTs
          </Button>
          </div>
      <div className="flex justify-center text-center mx-auto m-4 items-center">
        {isApproved ? (
          <Button
            onClick={callStake}
            css={{ dflex: "center" }}
            auto
            flat
            bordered
            color="warning"
          >
            Stake NFTs
          </Button>
        ) : (
          <Web3Button
            contractAddress={tokenC}
            contractAbi={NFTABI}
            action={(contract) =>
              contract.call(
                "setApprovalForAll",
                "0x4d2Bfa7d1D13e6C13A08a92B32a238b2B6DFFE0E",
                true
              )
            }
          >
            Approve to Stake
          </Web3Button>
        )}
      </div>
      <nav className="flex text-center items-center justify-center">
        <div className="hidden md:block">
          <Pagination
            color="warning"
            loop
            total={pageNumbers.length}
            onChange={(page) => paginate(pageNumbers[page - 1])}
            initialPage={1}
          />
        </div>
        <div className="block md:hidden">
          <Pagination
            color="warning"
            loop
            total={mobilePageNo.length}
            onChange={(page) => paginate(mobilePageNo[page - 1])}
            initialPage={1}
          />
        </div>
      </nav>
    </div>
  );
};

export default UnstakedPagination;
