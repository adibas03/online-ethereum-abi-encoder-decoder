export default function actionButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 flex place-content-end">
      <button className="mr-4 rounded-sm border-b p-2 hover:rounded-2xl hover:bg-gray-200 hover:bg-opacity-5">
        {children}
      </button>
    </div>
  );
}
