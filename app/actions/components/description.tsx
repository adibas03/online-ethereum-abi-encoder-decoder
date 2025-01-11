export default function description({
  children,
  className,
  ariaInvalid,
}: {
  children: React.ReactNode;
  className?: string;
  ariaInvalid?: boolean;
}) {
  return (
    <p
      aria-invalid={ariaInvalid}
      className={`text-xs mt-2 font-thin text-gray-200  ${
        className || ""
      } aria-invalid:text-red-600`}
    >
      {children}
    </p>
  );
}
