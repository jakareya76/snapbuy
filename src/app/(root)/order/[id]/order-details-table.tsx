"use client";

import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "../../../../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  MapPin,
  Package,
  CheckCircle,
  XCircle,
  ShoppingCart,
  DollarSign,
  Truck,
  Receipt,
} from "lucide-react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import {
  createPayPalOrder,
  approvePayPalOrder,
} from "@/lib/actions/order.action";

const OrderDetailsTable = ({
  order,
  paypalClientId,
}: {
  order: Order;
  paypalClientId: string;
}) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = order;

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "Loading PayPal...";
    } else if (isRejected) {
      status = "Error Loading PayPal";
    }

    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(id);

    if (!res.success) toast.error(res.message);

    return res.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(id, data);

    if (res.success) {
      toast(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Receipt size={28} className="text-primary" />
        <h1 className="text-3xl font-bold">Order {formatId(id)}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Payment Method Card */}
          <Card className="shadow-sm hover:shadow transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-lg mb-3">{paymentMethod}</p>
              {isPaid ? (
                <Badge
                  variant="secondary"
                  className="flex items-center w-fit gap-1 px-3 py-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Paid at {formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="flex items-center w-fit gap-1 px-3 py-1"
                >
                  <XCircle className="h-4 w-4" />
                  Not Paid
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card className="shadow-sm hover:shadow transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="font-medium text-lg">{shippingAddress.fullName}</p>
              <p className="text-muted-foreground mb-3">
                {shippingAddress.streetAddress}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge
                  variant="secondary"
                  className="flex items-center w-fit gap-1 px-3 py-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="flex items-center w-fit gap-1 px-3 py-1"
                >
                  <Truck className="h-4 w-4" />
                  Not Delivered
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Order Items Card */}
          <Card className="shadow-sm hover:shadow transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderitems.map((item) => (
                      <TableRow key={item.slug} className="hover:bg-muted/30">
                        <TableCell>
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center hover:underline"
                          >
                            <div className="relative h-12 w-12 rounded overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="ml-3 font-medium">
                              {item.name}
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.qty}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Card */}
        <div>
          <Card className="shadow-sm hover:shadow transition-shadow duration-200 sticky top-4">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>Items</span>
                  </div>
                  <div className="font-medium">
                    {formatCurrency(itemsPrice)}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <span>Tax</span>
                  </div>
                  <div className="font-medium">{formatCurrency(taxPrice)}</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Shipping</span>
                  </div>
                  <div className="font-medium">
                    {formatCurrency(shippingPrice)}
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-primary">
                  <div className="flex items-center gap-2 font-bold text-lg">
                    <DollarSign className="h-5 w-5" />
                    <span>Total</span>
                  </div>
                  <div className="font-bold text-lg">
                    {formatCurrency(totalPrice)}
                  </div>
                </div>
              </div>
              {/* PayPal Payment */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons
                      createOrder={handleCreatePayPalOrder}
                      onApprove={handleApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
