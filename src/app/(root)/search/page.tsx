import ProductCard from "@/components/shared/product/product-card";

import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { Metadata } from "next";
import Link from "next/link";
import SortOptions from "./sort-options";

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
          <div className="flex flex-wrap items-center gap-2 py-3">
            {/* Active Filters Badge Section */}

            {category !== "all" && category !== "" && (
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
                <span className="font-medium mr-1">Category:</span>
                <span>{category}</span>
                <Link
                  href={getFilterUrl({ c: "all" })}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {price !== "all" && (
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
                <span className="font-medium mr-1">Price:</span>
                <span>{price}</span>
                <Link
                  href={getFilterUrl({ p: "all" })}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {rating !== "all" && (
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
                <span className="font-medium mr-1">Rating:</span>
                <span className="flex items-center">
                  {Array.from({ length: parseInt(rating) }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1">& up</span>
                </span>
                <Link
                  href={getFilterUrl({ r: "all" })}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {/* Clear All Button */}
            {((q !== "all" && q !== "") ||
              (category !== "all" && category !== "") ||
              rating !== "all" ||
              price !== "all") && (
              <Link
                href="/search"
                className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center"
              >
                Clear All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </Link>
            )}
          </div>

          <div>
            {/* sort */}
            <SortOptions
              sort={sort}
              sortOptions={sortOptions}
              getFilterUrl={getFilterUrl}
            />
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
