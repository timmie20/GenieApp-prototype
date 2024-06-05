import { Link } from "react-router-dom";
import Logo from "../assets/icons/mdi_wish.svg";
import { AnimatedHamburgerBtn } from "./AnimatedHamburgerBtn";

const WaitlistNav = () => {
  return (
    <>
      <nav className="sticky top-0 mx-auto flex h-fit max-w-[1024px] justify-between bg-[#1753F5] px-4 py-2 md:h-20 md:py-4">
        <div className="inline-flex items-center gap-2">
          <img src={Logo} />
          <h4 className="text-xl font-medium text-white md:text-2xl">Genie</h4>
        </div>
        <div className="hidden items-center gap-4 text-sm text-zinc-200 md:flex">
          <Link to="https://x.com/tim_mieee?s=21" className="hover:text-white">
            TWITTER
          </Link>
          <Link to="#" className="hover:text-white">
            REQUEST A DEMO
          </Link>
        </div>
        <div className="block md:hidden">
          <AnimatedHamburgerBtn />
        </div>
      </nav>
    </>
  );
};

export default WaitlistNav;
