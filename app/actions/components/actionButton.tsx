import Description from "./description";

export default function actionButton({
  children,
  errorMessage,
}: {
  children: React.ReactNode;
  errorMessage?: string;
}) {
  return (
    <div className="mt-6 flex place-content-end">
      <div className="mr-4 flex flex-col place-content-end">
        <div className="flex place-content-end">
          <button
            aria-invalid={!!errorMessage}
            className="rounded-sm border-b p-2 hover:rounded-2xl hover:bg-gray-200 hover:bg-opacity-5 aria-invalid:border-b-red-600"
          >
            {children}
          </button>
        </div>
        {errorMessage ? (
          <Description ariaInvalid={!!errorMessage}>{errorMessage}</Description>
        ) : null}
      </div>
    </div>
  );
}
