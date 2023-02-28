import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import React, { useState, useEffect } from "react";
import {
  Text,
  Badge,
  Card,
  Image,
  Row,
  Container,
  Button,
  Grid,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { Pagination } from "@nextui-org/react";
import VAULTABI from "../../config/VAULTABI.json";
import { API_URL } from "../../config/config";
import meta333 from "../../config/meta333.json";
import meta3333 from "../../config/meta3333.json";
import metaaliens from "../../config/metaaliens.json";

const StakedPagination = ({ cardName, vaultId }) => {
  const { address } = useAccount();
  const vaultC = "0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A";

  const [selected, setSelected] = useState([]);
  const [stkedNfts, setStaked] = useState([]);
  const [stkObj, setStkObj] = useState([]);

  const { config: unstk } = usePrepareContractWrite({
    address: vaultC,
    abi: VAULTABI,
    functionName: "unStake",
    args: [vaultId, selected, address],
  });

  const { write: unStake } = useContractWrite(unstk);

  const { config: unstkAll } = usePrepareContractWrite({
    address: vaultC,
    abi: VAULTABI,
    functionName: "unStake",
    args: [vaultId, stkedNfts, address],
  });

  const { write: unStakeAll } = useContractWrite(unstkAll);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const calStk = async () => {
      if (vaultId == 0) {
        const data = await fetch(`${API_URL}/staking/333/${address}`, {
          signal,
        });
        const res = await data.json();
        setStaked(res);
      } else if (vaultId == 1) {
        const data = await fetch(`${API_URL}/staking/3333/${address}`, {
          signal,
        });
        const res = await data.json();
        setStaked(res);
      } else if (vaultId == 2) {
        const data = await fetch(`${API_URL}/staking/aliens/${address}`, {
          signal,
        });
        const res = await data.json();
        setStaked(res);
      }
    };
    calStk();
    return () => {
      controller.abort();
    };
  }, [address, vaultId]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPost] = useState(12);
  const [mobilePostsPerPage, setMobile] = useState(6);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = stkedNfts?.slice(indexOfFirstPost, indexOfLastPost);

  /* useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const update = async () => {
      const stkuriarr = [];
      await Promise.all(
        currentPosts.map(async (post) => {
          const image = async (token) => {
            if (vaultId == 0) {
              const data = new Promise(async (resolve, reject) => {
                await fetch(`${API_URL}/image/333/${token}`,{signal})
                  .then((res) => res.text())
                  .then((result) => {
                    resolve(result);
                  });
              });

              return data;
            } else if (vaultId == 1) {
              const data = new Promise(async (resolve, reject) => {
                await fetch(`${API_URL}/image/333/${token}`,{signal})
                  .then((res) => res.text())
                  .then((result) => {
                    resolve(result);
                  });
              });

              return data;
            } else if (vaultId == 2) {
              const data = new Promise(async (resolve, reject) => {
                await fetch(`${API_URL}/image/aliens/${token}`,{signal})
                  .then((res) => res.text())
                  .then((result) => {
                    resolve(result);
                  });
              });

              return data;
            }
          };
          const img = image(parseInt(post)).then((res) => {
            let obj = {
              id: parseInt(post),
              image: res,
            };
            console.log(obj)
            setStkObj([...stkObj, obj]);
          });
        })
      );
    };
    update()
    return() => controller.abort()
  }, [address, vaultId]);

  console.log(stkObj);*/

  const indexOfMobileLastPost = currentPage * mobilePostsPerPage;
  const indexOfMobileFirstPost = indexOfMobileLastPost - mobilePostsPerPage;
  const currentMobilePosts = stkedNfts?.slice(
    indexOfMobileFirstPost,
    indexOfMobileLastPost
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const callUnstake = async () => {
    const notification = toast.loading("Unstaking your NFTs...");

    try {
      const data = await unStake?.();
      console.info("contract call successs", data);
      setTimeout(() => {
        toast.success("NFTs Unstaked Successfully", {
          id: notification,
        });
        window.location.reload(true)
      }, 3000);
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Whops something went wrong!", {
        id: notification,
      });
    }
  };

  const callUnstakeAll = async () => {
    const notification = toast.loading("Unstaking your NFTs...");

    try {
      const data = await unStakeAll?.();
      console.info("contract call successs", data);
      setTimeout(() => {
        toast.success("NFTs Unstaked Successfully", {
          id: notification,
        });
        window.location.reload(true)
      }, 6000);
    } catch (err) {
      console.error("contract call failure", err);
      toast.error("Whops something went wrong!", {
        id: notification,
      });
    }
  };

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

  for (let i = 1; i <= Math.ceil(stkedNfts?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  for (let i = 1; i <= Math.ceil(stkedNfts?.length / mobilePostsPerPage); i++) {
    mobilePageNo.push(i);
  }

  return (
    <div className="mx-auto mb-8">
      <>
        <div className="font-extrabold text-2xl text-center flex justify-center mb-5 mt-5 text-amber-500 animate-bounce">
          Staked NFTs
        </div>
        <div className="hidden md:block lg:block">
          <Grid.Container gap={2} justify="center">
            {currentPosts?.map((post) => {
              const tokenDaily = async (token) => {
                if (vaultId == 0) {
                  const data = await fetch(`${API_URL}/dearn/333/${token}`)
                    .then((res) => res.text())
                    .then((d) => {
                      document.getElementById(
                        (parseInt(token) + 5).toString()
                      ).innerHTML = d;
                    });
                } else if (vaultId == 1) {
                  const data = await fetch(`${API_URL}/dearn/3333/${token}`)
                    .then((res) => res.text())
                    .then((d) => {
                      document.getElementById(
                        (parseInt(token) + 5).toString()
                      ).innerHTML = d;
                    });
                } else if (vaultId == 2) {
                  const data = await fetch(`${API_URL}/dearn/aliens/${token}`)
                    .then((res) => res.text())
                    .then((d) => {
                      document.getElementById(
                        (parseInt(token) + 5).toString()
                      ).innerHTML = d;
                    });
                }
              };
              const image = async (token) => {
                if (vaultId == 0) {
                  let data = meta333[token].image;
                  return data;
                } else if (vaultId == 1) {
                  let data = meta3333[token].image;
                  return data;
                } else if (vaultId == 2) {
                  let data = metaaliens[token].image;
                  return data;
                }
              };

              tokenDaily(parseInt(post));
              const imge = image(parseInt(post) - 1).then((res) => {
                let x = res.replace("ipfs://", "https://ipfs.io/ipfs/");
                document.getElementById(post.toString()).src = x;
              });
              return (
                <Grid xs={3} key={parseInt(post)}>
                  <Container css={{ mr: "$36" }}>
                    <Card
                      onClick={(e) => check(parseInt(post), e)}
                      variant="bordered"
                      style={{ margin: "auto", border: "1px solid gray" }}
                      css={{ width: "150px", height: "185px" }}
                      isPressable
                    >
                      <Card.Body css={{ p: 0 }}>
                        <div style={{ position: "relative" }}>
                          <Image
                            src={"/image-spin.gif"}
                            objectFit="fill"
                            width="100%"
                            height={140}
                            alt={post}
                            sizes={"18"}
                            id={post.toString()}
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
                              color="success"
                            >
                              staked
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
                            {cardName}
                          </Text>
                          <Text
                            h4
                            css={{
                              color: "$accents7",
                              fontWeight: "$semibold",
                              fontSize: "$sm",
                            }}
                          >
                            TPD{" "}
                            <span id={(parseInt(post) + 5).toString()}>
                              {0}
                            </span>
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
        <div className="md:hidden justify-center text-center mr-2 items-center">
          <Grid.Container className="grid grid-cols-2  md:hidden space-y-3 space-x-2 justify-center text-center mr-2 items-center">
            {currentMobilePosts?.map((post) => {
              const tokenId = parseInt(post);

              const tokenDaily = async (token) => {
                if (vaultId == 0) {
                  const data = await fetch(`${API_URL}/dearn/333/${token}`)
                    .then((res) => res.text())
                    .then((d) => {
                      document.getElementById(
                        (parseInt(token) + 51).toString()
                      ).innerHTML = d;
                    });
                } else if (vaultId == 1) {
                  const data = await fetch(`${API_URL}/dearn/3333/${token}`)
                    .then((res) => res.text())
                    .then((d) => {
                      document.getElementById(
                        (parseInt(token) + 51).toString()
                      ).innerHTML = d;
                    });
                } else if (vaultId == 2) {
                  const data = await fetch(`${API_URL}/dearn/aliens/${token}`)
                    .then((res) => res.text())
                    .then((d) => {
                      document.getElementById(
                        (parseInt(token) + 51).toString()
                      ).innerHTML = d;
                    });
                }
              };

              tokenDaily(parseInt(post));
              const image = async (token) => {
                if (vaultId == 0) {
                  let data = meta333[token].image;
                  return data;
                } else if (vaultId == 1) {
                  let data = meta3333[token].image;
                  return data;
                } else if (vaultId == 2) {
                  let data = metaaliens[token].image;
                  return data;
                }
              };

              const imge = image(parseInt(post) - 1).then((res) => {
                let x = res.replace("ipfs://", "https://ipfs.io/ipfs/");
                document.getElementById("tokenId" + post.toString()).src = x;
              });
              return (
                <div className="mt-3" key={parseInt(post)}>
                  <Grid xs={2}>
                    <Card
                      onClick={(e) => check(tokenId, e)}
                      variant="bordered"
                      style={{ margin: "auto", border: "1px solid gray" }}
                      css={{ width: "150px", height: "185px" }}
                      isPressable
                    >
                      <Card.Body css={{ p: 0 }}>
                        <div style={{ position: "relative" }}>
                          <Image
                            src={"/image-spin.gif"}
                            objectFit="fill"
                            width="100%"
                            alt={post}
                            height={140}
                            sizes={"18"}
                            id={"tokenId" + parseInt(post.toString())}
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
                              color="success"
                            >
                              staked
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
                              ID {tokenId}
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
                            {cardName}
                          </Text>
                          <Text
                            h4
                            css={{
                              color: "$accents7",
                              fontWeight: "$semibold",
                              fontSize: "$sm",
                            }}
                          >
                            TPD{" "}
                            <span id={(parseInt(post) + 51).toString()}>
                              {0}
                            </span>
                          </Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                </div>
              );
            })}
          </Grid.Container>
        </div>
        <div className="flex justify-center text-center mx-auto m-4 items-center">
          <Button
            onClick={callUnstakeAll}
            css={{ dflex: "center", mt: "$18" }}
            auto
            flat
            bordered
            color="warning"
          >
            Unstake All NFTs
          </Button>
        </div>
        <div className="flex justify-center text-center mx-auto m-4 items-center">
          <Button
            onPress={callUnstake}
            css={{ dflex: "center" }}
            auto
            flat
            bordered
            color="warning"
          >
            Unstake Selected NFTs
          </Button>
        </div>
      </>
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

export default StakedPagination;
