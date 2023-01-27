// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers"
import TokenSaleJson from '../../config/TokenSaleJson.json'


export default async function handler(req, res) {

  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc')
  const firstContract = new ethers.Contract('0x56628775730cA381557b6B73Cf7CC54f981bB722', TokenSaleJson, provider)

  const firstArr = await firstContract.getLatestPrice()

  const x =  parseInt(firstArr[0])

  res.send(x)
}