"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CartItem } from "../../../../types";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast(res.message, {
        action: {
          label: "x",
          onClick: () => console.log("Undo"),
        },
      });

      return;
    }

    toast(res.message, {
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <Button
      className="w-full mt-5 cursor-pointer"
      type="button"
      onClick={handleAddToCart}
    >
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
