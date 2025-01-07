import { Form } from "react-router";
import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import Types from "app/config/types";
import type { Route } from "../+types/root";
import { encodeData } from "app/utils/eth";

const FIELDS = {
  types: "types",
  decoded: "decoded",
};

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();

  const types = formData.get(FIELDS.types);
  const decoded = formData.get(FIELDS.decoded);

  const encoded = encodeData(
    (types || "").toString(),
    (decoded || "").toString()
  );

  console.log({ encoded });
};

export default function Encode() {
  return (
    <Form method="post">
      <div className="mx-8 my-12">
        <div>
          <InputLabel>Argument Types</InputLabel>
          <InputWrap>
            <input
              type="text"
              name={FIELDS.types}
              id={FIELDS.types}
              required
              className="w-full bg-transparent border-0"
            />
          </InputWrap>
          <Description>
            Add the value types, each seperated by a comma (
            {Types.slice(0, 2).join(",")}...)
          </Description>
        </div>

        <div className="mt-12">
          <InputLabel>Argument Values</InputLabel>
          <InputWrap>
            <textarea
              name={FIELDS.decoded}
              id={FIELDS.decoded}
              required
              className="w-full bg-transparent border-0"
            />
          </InputWrap>
          <Description>
            Add the values to match the number of types indicated above, each
            seperated by a comma (No spaces), use [ ] to wrap array, use " " to
            wrap values containing comma
          </Description>
        </div>

        <ActionButton>Encode values</ActionButton>
      </div>
    </Form>
  );
}
