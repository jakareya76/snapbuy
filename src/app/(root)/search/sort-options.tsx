import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// For small screens - buttons in a row
const MobileSort = ({
  sort,
  sortOptions,
  getFilterUrl,
}: {
  sort: string;
  sortOptions: string[];
  getFilterUrl: (params: { [key: string]: string }) => string;
}) => (
  <div className="md:hidden w-full">
    <div className="flex flex-wrap gap-2 mt-2">
      {sortOptions.map((s) => (
        <Link
          key={s}
          href={getFilterUrl({ s })}
          className={`px-3 py-1 text-sm rounded-md border ${
            sort === s
              ? "bg-blue-50 border-blue-300 text-blue-600 font-medium"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          {s}
        </Link>
      ))}
    </div>
  </div>
);

// For larger screens - Dropdown with links instead of event handlers
const DesktopSort = ({
  sort,
  sortOptions,
  getFilterUrl,
}: {
  sort: string;
  sortOptions: string[];
  getFilterUrl: (params: { [key: string]: string }) => string;
}) => (
  <div className="hidden md:flex items-center">
    <span className="text-sm font-medium text-gray-700 mr-3">Sort by:</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1 bg-white">
          {sort || "Select"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((s) => (
          <Link key={s} href={getFilterUrl({ s })} passHref legacyBehavior>
            <DropdownMenuItem
              className={`cursor-pointer ${
                sort === s ? "bg-blue-50 text-blue-600 font-medium" : ""
              }`}
              asChild
            >
              <a>{s}</a>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

// Combined component that doesn't rely on client-side interactivity
const SortOptions = ({
  sort,
  sortOptions,
  getFilterUrl,
}: {
  sort: string;
  sortOptions: string[];
  getFilterUrl: (params: { [key: string]: string }) => string;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3 mb-4">
    <div className="flex items-center">
      <MobileSort
        sort={sort}
        sortOptions={sortOptions}
        getFilterUrl={getFilterUrl}
      />
      <DesktopSort
        sort={sort}
        sortOptions={sortOptions}
        getFilterUrl={getFilterUrl}
      />
    </div>
  </div>
);

export default SortOptions;
