import { NavLink } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Header() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0 border-b-2 dark:border-gray-700">
      <header className="flex flex-col items-center gap-9">
        <div className="w-[350px] max-w-[100vw] p-4 text-center">
          <img
            src={logoLight}
            alt="React Router"
            className="block w-full dark:hidden"
          />
          <img
            src={logoDark}
            alt="React Router"
            className="hidden w-full dark:block"
          />
          <NavLink to="/">Online Ethereum abi encoder and decoder</NavLink>
        </div>
      </header>
    </div>
  );
}
