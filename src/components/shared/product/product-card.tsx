import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "../../../../types";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs ml-1">{product.rating} Star</span>
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
