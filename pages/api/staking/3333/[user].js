// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import VAULTABI from '../../../../config/VAULTABI.json'
import { vaultContract } from '../../../../config/config'


export default async function handler(req, res) {
  const Y = []
  const { user } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract(vaultContract, VAULTABI, provider)

  const firstArr = await firstContract.getStakedTokens(user, 1)

  const x =  firstArr.map((item) => {
    Y.push(parseInt(item.tokenId))
  })

  res.send(Y)
}
