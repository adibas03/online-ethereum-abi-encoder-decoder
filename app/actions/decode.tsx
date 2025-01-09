import { useFetcher } from "react-router";
import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import Result from "app/actions/components/result";
import { FIELDS, Labels, Descriptions, Results } from "app/config/fields";
import type { Route } from "../+types/root";
import { decodeData } from "app/utils/eth";
import {
  isvalidationSubmission,
  revalidateForm,
  validateType,
  validateValueForEncode,
} from "app/utils/form";

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();

  const types = (formData.get(FIELDS.types) || "").toString();
  const encoded = (formData.get(FIELDS.encoded) || "").toString();

  const errors = {
    ...(!!types && !validateType(types) ? { [FIELDS.types]: true } : {}),
    ...(!!encoded && !validateValueForEncode(encoded, types)
      ? { [FIELDS.encoded]: true }
      : {}),
  };

  if (
    Object.keys(errors).length > 0 ||
    !types ||
    !encoded ||
    isvalidationSubmission(request.method)
  ) {
    return { errors };
  }

  try {
    const decoded = decodeData(types, encoded);

    return { decoded };
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
        <div className="mx-8 my-12">
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
              ariaInvalid={!!errors?.[FIELDS.encoded]}
              htmlFor={FIELDS.encoded}
            >
              {Labels[FIELDS.encoded]}
            </InputLabel>
            <InputWrap ariaInvalid={!!errors?.[FIELDS.encoded]}>
              <textarea
                name={FIELDS.encoded}
                id={FIELDS.encoded}
                required
                aria-invalid={!!errors?.[FIELDS.encoded]}
                className="w-full bg-transparent border-0"
                onChange={(e) => revalidateForm(e, fetcher)}
              />
            </InputWrap>
            <Description ariaInvalid={!!errors?.[FIELDS.encoded]}>
              {Descriptions[FIELDS.encoded]}
            </Description>
          </div>

          <ActionButton errorMessage={errors?.[FIELDS.button]}>
            Decode data
          </ActionButton>
        </div>
      </div>

      {!!data?.[FIELDS.decoded] ? (
        <Result label={FIELDS.decoded} description={Results[FIELDS.decoded]}>
          {data[FIELDS.decoded]}
        </Result>
      ) : null}
    </fetcher.Form>
  );
}
