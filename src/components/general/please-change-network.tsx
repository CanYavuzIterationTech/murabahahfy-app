import { Web3NetworkSwitch } from "@web3modal/react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"







const PleaseChangeNetwork = () => {




    return (
        <Card>
        <CardHeader>
          <CardTitle> Please switch to Haqq Chain Testnet</CardTitle>
        </CardHeader>
        <CardContent>
          <Web3NetworkSwitch />
        </CardContent>
      </Card>
    )
}

export default PleaseChangeNetwork