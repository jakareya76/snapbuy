import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.action";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "../../../../../types";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const order = await getOrderById(id);

  const session = await auth();

  if (!order) notFound();

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === "admin" || false}
      />
    </>
  );
};

export default OrderDetailsPage;
