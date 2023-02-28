import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Nav() {
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <Head>
        <title>Horror Ape Club Staking</title>
        <meta name="description" content="Horror Ape Club Staking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="w-full bg-black shadow">
        <div className="md:justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <Image src="/mainlogo.png" width={120} height={200} alt="" />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <div className="items-center hidden justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <div
                  className="text-white a-hover p-2"
                  style={{ borderRadius: "10px" }}
                >
                  <Link href="/">
                    <span className="text-[#F5A524]">Home</span>
                  </Link>
                </div>
                <div className="dropdown">
                  <Button
                    css={{ color: "#F5A524" }}
                    auto
                    flat
                    bordered
                    className="dropbtn text-[#F5A524]"
                  >
                    <span className="text-[#F5A524]">Staking</span>
                    <ChevronDownIcon className="w-5 text-[#F5A524]" />
                  </Button>
                  <div className="dropdown-content text-white rounded-xl">
                    <Link
                      className="text-[#F5A524] a-hover hover:text-[#F5A524]"
                      href="/staking/Hac333"
                    >
                      333 Staking
                    </Link>
                    <Link
                      className="text-[#F5A524] a-hover hover:text-[#F5A524]"
                      href="/staking/Hac3333"
                    >
                      3333 Staking
                    </Link>
                    <Link
                      className="text-[#F5A524] a-hover hover:text-[#F5A524]"
                      href="/staking/HacAliens"
                    >
                      Aliens Staking
                    </Link>
                  </div>
                </div>
                <div className="dropdown">
                  <Button auto flat bordered className="dropbtn">
                    <span className="text-[#F5A524]">Lotteries </span>
                    <ChevronDownIcon className="w-5 text-[#F5A524]" />
                  </Button>
                  <div className="dropdown-content text-white rounded-xl">
                    <Link
                      className="text-white a-hover hover:text-[#F5A524]"
                      href="/lotteries/Hac333"
                    >
                      333 Lottery
                    </Link>
                    <Link
                      className="text-white a-hover hover:text-[#F5A524]"
                      href="/lotteries/Hac3333"
                    >
                      3333 Lottery
                    </Link>
                    <Link
                      className="text-white a-hover hover:text-[#F5A524]"
                      href="/lotteries/HacAliens"
                    >
                      Aliens Lottery
                    </Link>
                  </div>
                </div>
                <div
                  className="text-[#F5A524] a-hover p-2"
                  style={{ borderRadius: "10px" }}
                >
                  <Link href="/tokensale">
                    <span className="text-[#F5A524]">TokenSale</span>
                  </Link>
                </div>
                <div className="m-4 ml-11">
                  <ConnectButton />
                </div>
              </div>


              <div className="grid grid-cols-1 justify-center items-center text-center space-y-8 md:hidden">
                <div
                >
                  <Link
                  className="a-hover p-2"
                  style={{ borderRadius: "10px" }}
                   href="/">
                    <span className="text-[#F5A524]">Home</span>
                  </Link>
                </div>
                  <div>
                    <Link
                      style={{ borderRadius: "10px" }}
                      className="text-[#F5A524] a-hover p-2 hover:text-[#F5A524]"
                      href="/staking/Hac333"
                    >
                      333 Staking
                    </Link>
                    </div>
                    <div>
                    <Link
                      style={{ borderRadius: "10px" }}
                      className="text-[#F5A524] a-hover p-2 hover:text-[#F5A524]"
                      href="/staking/Hac3333"
                    >
                      3333 Staking
                    </Link>
                    </div>
                    <div>
                    <Link
                      style={{ borderRadius: "10px" }}
                      className="text-[#F5A524] a-hover p-2 hover:text-[#F5A524]"
                      href="/staking/HacAliens"
                    >
                      Aliens Staking
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-[#F5A524] p-2 a-hover hover:text-[#F5A524]"
                      href="/lotteries/Hac333"
                      style={{ borderRadius: "10px" }}
                    >
                      333 Lottery
                    </Link>
                    </div>
                    <div>
                    <Link
                      className="text-[#F5A524] a-hover p-2 hover:text-[#F5A524]"
                      href="/lotteries/Hac3333"
                      style={{ borderRadius: "10px" }}
                    >
                      3333 Lottery
                    </Link>
                    </div>
                    <div>
                    <Link
                      className="text-[#F5A524] p-2 a-hover hover:text-[#F5A524]"
                      href="/lotteries/HacAliens"
                      style={{ borderRadius: "10px" }}
                    >
                      Aliens Lottery
                    </Link>
                  </div>
                <div
                >
                  <Link
                  className="a-hover p-2"
                  style={{ borderRadius: "10px" }}
                   href="/tokensale">
                    <span className="text-[#F5A524]">TokenSale</span>
                  </Link>
                </div>
                <div className="flex justify-center text-center items-center m-auto w-28">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr className="text-[#F5A524]" />
    </div>
  );
}
