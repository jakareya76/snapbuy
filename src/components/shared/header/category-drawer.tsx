import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { Menu } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Menu size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Select Category</DrawerTitle>
          <div className="space-y-1 flex flex-col items-start mt-5">
            {categories.map((category) => (
              <Button key={category.category} variant="ghost" asChild>
                <DrawerClose asChild>
                  <Link href={`/search?category=${category.category}`}>
                    {category.category} ({category._count})
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
