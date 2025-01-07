import type { ClassType } from "react";

export default function inputLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: React.LabelHTMLAttributes<ClassDecorator>;
}) {
  return (
    <label
      htmlFor="decoded"
      className="block text-xs font-medium text-gray-300"
    >
      {children}
    </label>
  );
}
