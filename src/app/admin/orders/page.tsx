import { auth } from "@/auth";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.action";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - Orders",
};

const AdminOrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { page = 1, query: searchText } = await searchParams;

  const sessoin = await auth();

  if (sessoin?.user.role !== "admin") throw new Error("User is not authorized");

  const orders = await getAllOrders({
    page: Number(page),
    limit: 12,
    query: searchText,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders</h1>
        {searchText && (
          <div>
            Filtered by <i>&quot; {searchText}&quot;</i>{" "}
            <Link href="/admin/orders">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{formatId(item.id)}</TableCell>
                  <TableCell>
                    {formatDateTime(item.createdAt).dateTime}
                  </TableCell>
                  <TableCell>{item.user.name}</TableCell>
                  <TableCell>{formatCurrency(item.totalPrice)}</TableCell>
                  <TableCell>
                    {item.isPaid && item.paidAt
                      ? formatDateTime(item.paidAt).dateTime
                      : "Not Paid"}
                  </TableCell>
                  <TableCell>
                    {item.isDelivered && item.deliveredAt
                      ? formatDateTime(item.deliveredAt).dateTime
                      : "Not Delivered"}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button>
                      <Link href={`/order/${item.id}`}>Details</Link>
                    </Button>
                    <DeleteDialog id={item.id} action={deleteOrder} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination page={Number(page || 1)} totalPages={orders.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
