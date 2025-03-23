import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "../../../../types";
import Rating from "./rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block transition-transform hover:scale-[1.02] duration-200"
    >
      <Card className="w-full max-w-sm p-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
        <CardHeader className="p-0 items-center overflow-hidden">
          <div className="h-52 w-full relative flex items-center justify-center">
            <Image
              src={product.images[0]}
              alt={product.name}
              height={300}
              width={300}
              priority={true}
              className="object-contain max-h-full transition-all duration-200"
            />
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-3 grid gap-2">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.brand}
          </div>

          <h2 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h2>

          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center">
              <Rating value={Number(product.rating)} />
            </div>
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
