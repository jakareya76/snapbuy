"use client";

import { Cart } from "../../../../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { addItemToCart, removeItemFormCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Loader, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableCaption>View All of yours cart.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          disabled={isPending}
                          className="cursor-pointer"
                          variant="outline"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFormCart(
                                item.productId
                              );

                              if (!res.success) {
                                toast(res.message);
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="animate-spin w-4 h-4" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                        </Button>
                        <span className="px-3">{item.qty}</span>
                        <Button
                          disabled={isPending}
                          className="cursor-pointer"
                          variant="outline"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item);

                              if (!res.success) {
                                toast(res.message);
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="animate-spin w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    router.push("/shipping-address");
                  });
                }}
              >
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CartTable;
