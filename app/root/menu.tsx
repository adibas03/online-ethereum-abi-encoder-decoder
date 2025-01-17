import { NavLink } from "react-router";
import PackageJson from "../../package.json";
import { capitalize } from "app/utils/string";
import allActions from "app/config/actions";

export default function Menu() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <header className="flex flex-col items-center gap-9">
        <div className="w-[350px] max-w-[100vw] p-4 text-center">
          {allActions.map((a) => (
            <NavLink
              key={a}
              to={`/${PackageJson.name}/${a}`}
              className={({ isActive }) =>
                [
                  isActive ? "dark:border-gray-200" : "dark:border-gray-700",
                  "rounded border-b  m-2 p-2",
                ].join(" ")
              }
            >
              {capitalize(a)}
            </NavLink>
          ))}
        </div>
      </header>
    </div>
  );
}
