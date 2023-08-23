import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SupplyTreasury from "./supply-treasury";
import WithdrawTreasury from "./withdraw-treasury";

const SupplyWithdraw = () => {
  return (
    <Tabs defaultValue="supply" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="supply">Supply</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="supply">
        <SupplyTreasury />
      </TabsContent>
      <TabsContent value="withdraw">
        <WithdrawTreasury />
      </TabsContent>
    </Tabs>
  );
};

export default SupplyWithdraw;
