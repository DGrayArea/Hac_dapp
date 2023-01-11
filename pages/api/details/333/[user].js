// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import NFTABI from '../../../../config/NFTABI.json'
import { _333contract } from '../../../../config/config'


export default async function handler(req, res) {
  const Y = []
  const { user } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract(_333contract, NFTABI, provider)

  const firstArr = await firstContract.walletOfOwner(user)

  const x =  firstArr.map((item) => {
    Y.push(parseInt(item))
  })
  res.send(Y)
}
