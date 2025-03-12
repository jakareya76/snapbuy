import Image from "next/image";
import Link from "next/link";

import Menu from "./menu";
import { APP_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />
            <span className="hidden font-bold text-2xl ml-3 lg:block">
              Snap<span className="text-amber-500 font-mono">Buy</span>
            </span>
          </Link>
        </div>

        <Menu />
      </div>
    </header>
  );
};

export default Header;
