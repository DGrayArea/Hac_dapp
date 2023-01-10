// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import NFTABI from '../../../../config/NFTABI.json'
import { _3333contract } from '../../../../config/config'


export default async function handler(req, res) {
  const { id } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const secondContract = new ethers.Contract(_3333contract, NFTABI, provider)

    const x = await secondContract.tokenURI(id)

  res.send(x)
}
