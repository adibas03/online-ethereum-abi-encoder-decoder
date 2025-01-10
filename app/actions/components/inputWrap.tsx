import type { AriaAttributes } from "react";

export default function inputWrap({
  children,
  ariaInvalid,
}: {
  children: React.ReactNode;
  ariaInvalid?: boolean;
}) {
  return (
    <div
      aria-invalid={ariaInvalid}
      className="mt-2 border-b border-b-gray-400 aria-invalid:border-b-red-600"
    >
      {children}
    </div>
  );
}
