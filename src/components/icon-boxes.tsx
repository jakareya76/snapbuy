import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex justify-around flex-wrap gap-5 p-4">
          <div className="space-y-2">
            <ShoppingBag />
            <div className="text-sm font-bold">Free Shipping</div>
            <div className="text-sm text-muted-foreground">
              free shipping on orders above $100
            </div>
          </div>
          <div className="space-y-2">
            <DollarSign />
            <div className="text-sm font-bold">Money Back Guarante</div>
            <div className="text-sm text-muted-foreground">
              With in 30 days of purchase
            </div>
          </div>
          <div className="space-y-2">
            <WalletCards />
            <div className="text-sm font-bold">Flexible payments</div>
            <div className="text-sm text-muted-foreground">
              Pay with credit card, debit card, PayPal or COD
            </div>
          </div>
          <div className="space-y-2">
            <Headset />
            <div className="text-sm font-bold">24/7 Support</div>
            <div className="text-sm text-muted-foreground">
              Get support via email, chat or phone at any time
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
