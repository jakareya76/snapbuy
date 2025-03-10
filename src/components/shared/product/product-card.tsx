import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "../../../../types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="w-full max-w-sm p-0">
        <CardHeader className="p-0 items-center">
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
            className="rounded-t-xl"
          />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-1 grid gap-2">
          <div className="text-xs">{product.brand}</div>

          <h2 className="text-sm font-medium">{product.name}</h2>

          <div className="flex-between gap-4">
            <p>{product.rating} Star</p>
            {product.stock > 0 ? (
              <ProductPrice value={Number(product.price)} />
            ) : (
              <p className="font-bold text-destructive">Out of Stock</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
