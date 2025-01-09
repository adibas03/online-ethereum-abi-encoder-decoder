export default function description({
  children,
  ariaInvalid,
}: {
  children: React.ReactNode;
  ariaInvalid?: boolean;
}) {
  return (
    <p
      aria-invalid={ariaInvalid}
      className="text-xs mt-2 font-thin text-gray-200 aria-invalid:text-red-600"
    >
      {children}
    </p>
  );
}
