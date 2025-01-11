import { capitalize } from "~/utils/string";
import InputLabel from "./inputLabel";
import InputWrap from "./inputWrap";
import Description from "./description";

export default function Result({
  children,
  label,
  description,
}: {
  children: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="my-8 rounded-sm border border-gray-200 py-4 dark:border-gray-700 space-y-4">
      <div className="mx-6 my-8">
        <InputLabel>{capitalize(label)}</InputLabel>
        <InputWrap>
          <div
            className="text-balance break-words"
            onClick={(e) =>
              document.getSelection()?.selectAllChildren(e.target as any)
            }
          >
            {children}
          </div>
        </InputWrap>
        <Description>{description}</Description>
      </div>
    </div>
  );
}
