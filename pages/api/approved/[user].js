// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import NFTABI from '../../../config/NFTABI.json'
import { _3333contract, _333contract, alienContract, vaultContract } from '../../../config/config'


export default async function handler(req, res) {
  const { user } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract(_333contract, NFTABI, provider)
  const secondContract = new ethers.Contract(_3333contract, NFTABI, provider)
  const thirdContract = new ethers.Contract(alienContract, NFTABI, provider)

  const firstArr = await firstContract.isApprovedForAll(user, '0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A')
  const secondArr = await secondContract.isApprovedForAll(user, '0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A')
  const thirdArr = await thirdContract.isApprovedForAll(user, '0x60a00a6d716e2c2F896698B28dC1a7a508f0b87A')

  const x = [firstArr, secondArr, thirdArr]

  res.send(x)
}
