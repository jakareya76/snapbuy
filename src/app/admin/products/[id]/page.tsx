import ProductForm from "@/components/admin/product-form";
import { getProductById } from "@/lib/actions/product.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Update Product",
};

const AdminUpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <h2 className="h2-bold">Update Product</h2>
      <div className="my-8">
        <ProductForm type="Update" product={product} productId={product.id} />
      </div>
    </div>
  );
};

export default AdminUpdateProductPage;
