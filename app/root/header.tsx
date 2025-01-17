import { NavLink } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import packageInfo from "package-lock.json";
import Descriptions from "app/actions/components/description";

export default function Header() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0 border-b-2 dark:border-gray-700">
      <header className="flex flex-col items-center gap-9">
        <div className="w-[350px] max-w-[100vw] p-4 text-center">
          <div className="mt-8">
            <NavLink to={`/${packageInfo.name}/`}>
              Online Ethereum abi encoder and decoder
            </NavLink>
            <Descriptions>
              web-eth@{packageInfo.packages["node_modules/web3-eth"].version}
            </Descriptions>
            <Descriptions>
              web-eth-abi@
              {packageInfo.packages["node_modules/web3-eth-abi"].version}
            </Descriptions>
          </div>
        </div>
      </header>
    </div>
  );
}
