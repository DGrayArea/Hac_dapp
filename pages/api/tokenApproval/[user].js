// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import TOKENABI from '../../../config/TOKENABI.json'
import { _333Tokencontract, _3333Tokencontract, alienTokencontract, _333Lotterycontract, _3333Lotterycontract, alienLotterycontract } from '../../../config/config'


export default async function handler(req, res) {
  const { user } = req.query
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract(_333Tokencontract, TOKENABI, provider)
  const secondContract = new ethers.Contract(_3333Tokencontract, TOKENABI, provider)
  const thirdContract = new ethers.Contract(alienTokencontract, TOKENABI, provider)

  const firstArr = await firstContract.allowance(user, _333Lotterycontract)
  const secondArr = await secondContract.allowance(user, _3333Lotterycontract)
  const thirdArr = await thirdContract.allowance(user, alienLotterycontract)

  const x = [parseInt(firstArr), parseInt(secondArr), parseInt(thirdArr)]

  res.send(x)
}
