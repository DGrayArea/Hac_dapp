// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import NFTABI from '../../../../config/NFTABI.json'
import { _333contract } from '../../../../config/config'


export default async function handler(req, res) {
  const { id } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract(_333contract, NFTABI, provider)

    const raw = await firstContract.tokenURI(id)
    const x = raw.replace(
      "ipfs://",
      "https://gateway.ipfscdn.io/ipfs/"
    )

  res.send(x)
}
