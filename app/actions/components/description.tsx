export default function description({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-xs mt-2 font-thin text-gray-200">{children}</p>;
}
