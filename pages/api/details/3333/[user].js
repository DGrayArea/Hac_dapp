// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import NFTABI from '../../../../config/NFTABI.json'
import { _3333contract } from '../../../../config/config'


export default async function handler(req, res) {
  const Y = []
  const { user } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const secondContract = new ethers.Contract(_3333contract, NFTABI, provider)
  const secondArr = await secondContract.walletOfOwner(user)

  const x =  secondArr.map((item) => {
    Y.push(parseInt(item))
  })

  res.send(Y)
}
