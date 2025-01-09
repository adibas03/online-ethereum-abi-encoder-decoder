import { useFetcher, data, Form } from "react-router";
import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import { FIELDS, Labels, Descriptions } from "app/config/fields";
import type { Route } from "../+types/root";
import { decodeData } from "app/utils/eth";

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();

  const types = formData.get(FIELDS.types);
  const encoded = formData.get(FIELDS.encoded);

  try {
    const decoded = decodeData(
      (types || "").toString(),
      (encoded || "").toString()
    );

    console.log({ decoded });
  } catch (e) {
    console.error(e);
  }
};

export default function Encode() {
  return (
    <Form method="post">
      <div className="mx-8 my-12">
        <div>
          <InputLabel htmlFor={FIELDS.types}>{Labels[FIELDS.types]}</InputLabel>
          <InputWrap>
            <input
              type="text"
              name={FIELDS.types}
              id={FIELDS.types}
              required
              className="w-full bg-transparent border-0"
            />
          </InputWrap>
          <Description>{Descriptions[FIELDS.types]}</Description>
        </div>

        <div className="mt-12">
          <InputLabel htmlFor={FIELDS.encoded}>
            {Labels[FIELDS.encoded]}
          </InputLabel>
          <InputWrap>
            <textarea
              name={FIELDS.encoded}
              id={FIELDS.encoded}
              required
              className="w-full bg-transparent border-0"
            />
          </InputWrap>
          <Description>{Descriptions[FIELDS.encoded]}</Description>
        </div>

        <ActionButton>Decode data</ActionButton>
      </div>
    </Form>
  );
}
