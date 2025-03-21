import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getLatestProduct,
  getFeaturedProducts,
} from "@/lib/actions/product.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

export const metadata = {
  title: "Home",
};

const HomePage = async () => {
  const latestProduct = await getLatestProduct();
  const featuredProduct = await getFeaturedProducts();

  return (
    <>
      {featuredProduct.length > 0 && <ProductCarousel data={featuredProduct} />}

      <ProductList
        data={latestProduct}
        title="Newest Arrivals"
        limit={LATEST_PRODUCTS_LIMIT}
      />
      <ViewAllProductsButton />
    </>
  );
};

export default HomePage;
