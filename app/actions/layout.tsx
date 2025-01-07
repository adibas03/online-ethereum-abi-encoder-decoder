import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="w-full space-y-6 px-4">
        <div></div>
        <Outlet />
      </div>
    </div>
  );
}
