import { Outlet } from "react-router";
import Sponsor from "app/root/sponsor";

export default function Layout() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="w-full space-y-6 px-4">
        <div className="mt-8 rounded-sm border border-gray-200 py-8 dark:border-gray-700 space-y-4">
          <Outlet />
        </div>

        <div className=" text-center mt-12 mb-12 border-t border-dashed border-gray-200 pt-3 dark:border-gray-700 space-y-4">
          <Sponsor />
        </div>
      </div>
    </div>
  );
}
