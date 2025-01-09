import { useFetcher } from "react-router";
import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import Result from "app/actions/components/result";
import { FIELDS, Labels, Descriptions, Results } from "app/config/fields";
import type { Route } from "../+types/root";
import { encodeData } from "app/utils/eth";
import {
  isvalidationSubmission,
  revalidateForm,
  validateType,
  validateValueForEncode,
} from "app/utils/form";

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();

  const types = (formData.get(FIELDS.types) || "").toString();
  const decoded = (formData.get(FIELDS.decoded) || "").toString();

  const errors = {
    ...(!!types && !validateType(types) ? { [FIELDS.types]: true } : {}),
    ...(!!decoded && !validateValueForEncode(decoded, types)
      ? { [FIELDS.decoded]: true }
      : {}),
  };

  if (
    Object.keys(errors).length > 0 ||
    !types ||
    !decoded ||
    isvalidationSubmission(request.method)
  ) {
    return { errors };
  }

  try {
    const encoded = encodeData(types, decoded);

    return { encoded };
  } catch (e: any) {
    console.error(e);
    return {
      errors: {
        [FIELDS.button]: e.message,
      },
    };
  }
};

export default function Encode() {
  let fetcher = useFetcher();
  let data = fetcher.data;
  let errors = data?.errors;

  return (
    <fetcher.Form method="post">
      <div className="mt-8 rounded-sm border border-gray-200 py-4 dark:border-gray-700 space-y-4">
        <div className="mx-6 my-12">
          <div>
            <InputLabel
              ariaInvalid={!!errors?.[FIELDS.types]}
              htmlFor={FIELDS.types}
            >
              {Labels[FIELDS.types]}
            </InputLabel>
            <InputWrap ariaInvalid={!!errors?.[FIELDS.types]}>
              <input
                type="text"
                name={FIELDS.types}
                id={FIELDS.types}
                required
                aria-invalid={!!errors?.[FIELDS.types]}
                className="w-full bg-transparent border-0"
                onChange={(e) => revalidateForm(e, fetcher)}
              />
            </InputWrap>
            <Description ariaInvalid={!!errors?.[FIELDS.types]}>
              {Descriptions[FIELDS.types]}
            </Description>
          </div>

          <div className="mt-12">
            <InputLabel
              ariaInvalid={!!errors?.[FIELDS.decoded]}
              htmlFor={FIELDS.decoded}
            >
              {Labels[FIELDS.decoded]}
            </InputLabel>
            <InputWrap ariaInvalid={!!errors?.[FIELDS.decoded]}>
              <textarea
                name={FIELDS.decoded}
                id={FIELDS.decoded}
                required
                aria-invalid={!!errors?.[FIELDS.decoded]}
                className="w-full bg-transparent border-0"
                onChange={(e) => revalidateForm(e, fetcher)}
              />
            </InputWrap>
            <Description ariaInvalid={!!errors?.[FIELDS.decoded]}>
              {Descriptions[FIELDS.decoded]}
            </Description>
          </div>

          <ActionButton errorMessage={errors?.[FIELDS.button]}>
            Encode values
          </ActionButton>
        </div>
      </div>

      {!!data?.[FIELDS.encoded] ? (
        <Result label={FIELDS.encoded} description={Results[FIELDS.encoded]}>
          {data[FIELDS.encoded]}
        </Result>
      ) : null}
    </fetcher.Form>
  );
}
