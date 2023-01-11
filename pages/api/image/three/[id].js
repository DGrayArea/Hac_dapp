// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import NFTABI from '../../../../config/NFTABI.json'
import { alienContract } from '../../../../config/config'


export default async function handler(req, res) {
  const { id } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract(alienContract, NFTABI, provider)

    const x = await firstContract.tokenURI(id)

  res.send(x)
}
