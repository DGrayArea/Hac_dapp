// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import TOKENABI from '../../../config/TOKENABI.json'


export default async function handler(req, res) {
  
  const { user } = req.query

  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract('0xceA4195AeCc3622179334e346cF526312F32D836', TOKENABI, provider)
  const secondContract = new ethers.Contract('0xD48c2F6Cd0554b32C90E70C4C493Ce253299dC68', TOKENABI, provider)
  const thirdContract = new ethers.Contract('0x120A9664D35031691eC7ee98B81F1A87ebbD1217', TOKENABI, provider)

  const firstArr = await firstContract.balanceOf(user)
  const secondArr = await secondContract.balanceOf(user)
  const thirdArr = await thirdContract.balanceOf(user)

  const x =  [parseInt(firstArr), parseInt(secondArr), parseInt(thirdArr)]

  res.send(x)
}
