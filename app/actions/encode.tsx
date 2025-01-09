import { useFetcher, data } from "react-router";
import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import { FIELDS, Labels, Descriptions } from "app/config/fields";
import type { Route } from "../+types/root";
import { encodeData } from "app/utils/eth";
import { validateType, validateValueForEncode } from "app/utils/form";

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

  console.log({
    errors,
    types,
    decoded,
  });

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  if (!types || !decoded) {
    return;
  }

  try {
    const encoded = encodeData(types, decoded);

    console.log({ encoded });

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

// function validateTypes() {
//   let fetcher = useFetcher();
//   console.log({ fetcher });
//   const formData =  fetcher?.formData || ()=>{};

//   if (!!validateType(types)) {
//     fetcher.data = {
//       ...fetcher.data,
//       errors: {
//         ...fetcher.data?.errors,
//         [FIELDS.types]: true,
//       },
//     };
//   }

//   return;
// }

export default function Encode() {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;

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
                onChange={(e) => fetcher.submit(e.currentTarget.form)}
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
                onChange={(e) => fetcher.submit(e.currentTarget.form)}
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
    </fetcher.Form>
  );
}
