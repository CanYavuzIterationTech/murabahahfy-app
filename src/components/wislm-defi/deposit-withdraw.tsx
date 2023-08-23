import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Deposit from "./deposit";
import Withdraw from "./withdraw";

const DepositWithdraw = () => {
  return (
    
    <Tabs defaultValue="deposit" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">
        <Deposit />
      </TabsContent>
      <TabsContent value="withdraw">
        <Withdraw />
      </TabsContent>
    </Tabs>
  );
};

export default DepositWithdraw;
