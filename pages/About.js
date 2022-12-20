import NftPagination from "../components/staking-components/NftPagination";
import { useContract, ConnectWallet } from "@thirdweb-dev/react";
import Nav from "../components/Nav";



const About = () => {

    const {contract} = useContract('0x1604Be4764993e1d9aD37358a918C910B4D37096')

    return (
        <div>
            <Nav />
            <NftPagination contract={contract} cardName={'HAC 333'} />
        </div>
    )
}
  
  export default About;