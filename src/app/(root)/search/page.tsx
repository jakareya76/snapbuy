import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];

const ratings = [4, 3, 2, 1];

const sortOptions = ["newest", "lowest", "highest", "rating"];

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    page = "1",
    price = "all",
    rating = "all",
    sort = "newest",
  } = await searchParams;

  //Construct the filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="filter-container divide-y divide-gray-200">
          {/* Category Section */}
          <div className="py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Category</h3>
            <div className="mt-2">
              <ul className="space-y-2">
                <li>
                  <Link
                    className={`text-sm hover:text-blue-600 transition-colors ${
                      category === "all" || category === ""
                        ? "font-semibold text-blue-600"
                        : "text-gray-700"
                    }`}
                    href={getFilterUrl({ c: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((x) => (
                  <li key={x.category}>
                    <Link
                      className={`text-sm hover:text-blue-600 transition-colors ${
                        category === x.category
                          ? "font-semibold text-blue-600"
                          : "text-gray-700"
                      }`}
                      href={getFilterUrl({ c: x.category })}
                    >
                      {x.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price Section */}
          <div className="py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Price</h3>
            <div className="mt-2">
              <ul className="space-y-2">
                <li>
                  <Link
                    className={`text-sm hover:text-blue-600 transition-colors ${
                      price === "all"
                        ? "font-semibold text-blue-600"
                        : "text-gray-700"
                    }`}
                    href={getFilterUrl({ p: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {prices.map((p) => (
                  <li key={p.value}>
                    <Link
                      className={`text-sm hover:text-blue-600 transition-colors ${
                        price === p.value
                          ? "font-semibold text-blue-600"
                          : "text-gray-700"
                      }`}
                      href={getFilterUrl({ p: p.value })}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rating Section */}
          <div className="py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Rating</h3>
            <div className="mt-2">
              <ul className="space-y-2">
                <li>
                  <Link
                    className={`text-sm hover:text-blue-600 transition-colors ${
                      rating === "all"
                        ? "font-semibold text-blue-600"
                        : "text-gray-700"
                    }`}
                    href={getFilterUrl({ r: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {ratings.map((r) => (
                  <li key={r}>
                    <Link
                      className={`flex items-center text-sm hover:text-blue-600 transition-colors ${
                        rating === r.toString()
                          ? "font-semibold text-blue-600"
                          : "text-gray-700"
                      }`}
                      href={getFilterUrl({ r: `${r}` })}
                    >
                      <div className="flex mr-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= r ? "text-yellow-400" : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span>& up</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:col-span-4">
        {/* filter area */}
        <div className="flex-between flex-col my-4 md:flex-row">
          <div className="flex items-center gap-2">
            <p>{q !== "all" && q !== "" && "Query: " + q}</p>
            <p>
              {category !== "all" && category !== "" && "Category: " + category}
            </p>
            <p>{price !== "all" && "Price: " + price}</p>
            <p>{rating !== "all" && "Rating: " + rating + " stars & up"}</p>

            <p>
              &nbsp;{" "}
              {(q !== "all" && q !== "") ||
              (category !== "all" && category !== "") ||
              rating !== "all" ||
              price !== "all" ? (
                <Button variant="outline" asChild>
                  <Link href="/search">Clear</Link>
                </Button>
              ) : null}
            </p>
          </div>
          <div>
            {/* sort */}
            Sort By{" "}
            {sortOptions.map((s) => (
              <Link
                key={s}
                className={`mx-2 hover:text-blue-600 transition-colors ${
                  sort === s ? "font-semibold text-blue-600" : "text-gray-700"
                }`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}

          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
