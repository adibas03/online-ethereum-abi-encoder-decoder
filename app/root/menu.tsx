import { NavLink } from "react-router";
import { capitalize } from "app/utils/string";
import allActions from "app/config/actions";

export function Menu() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <header className="flex flex-col items-center gap-9">
        <div className="w-[350px] max-w-[100vw] p-4 text-center">
          {allActions.map((a) => (
            <NavLink
              to={`/${a}`}
              className="rounded border-b dark:border-gray-200 m-2 p-2"
            >
              {capitalize(a)}
            </NavLink>
          ))}
        </div>
      </header>
    </div>
  );
}
