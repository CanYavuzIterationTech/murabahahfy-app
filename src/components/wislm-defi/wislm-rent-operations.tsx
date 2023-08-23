import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SupplyTreasury from "./supply-treasury";
import WislmPayRent from "./wislm-pay-rent";
import WislmRent from "./wislm-rent";
import WithdrawTreasury from "./withdraw-treasury";

const WislmRentOp = () => {
  return (<>

    <Tabs defaultValue="rent" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="rent">Rent</TabsTrigger>
        <TabsTrigger value="pay-rent">Pay Rent</TabsTrigger>
      </TabsList>
      <TabsContent value="rent">
        <WislmRent />
      </TabsContent>
      <TabsContent value="pay-rent">
        <WislmPayRent />
      </TabsContent>
    </Tabs>
    </>
  );
};

export default WislmRentOp;
