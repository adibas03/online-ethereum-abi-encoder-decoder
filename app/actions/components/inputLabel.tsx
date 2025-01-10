import type { ClassType } from "react";

export default function inputLabel({
  children,
  className,
  ariaInvalid,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
  ariaInvalid?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      aria-invalid={ariaInvalid}
      className={`block text-xs font-medium text-gray-300 ${
        className || ""
      } aria-invalid:text-red-600`}
    >
      {children}
    </label>
  );
}
