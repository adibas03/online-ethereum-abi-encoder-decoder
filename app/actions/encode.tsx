import { Form } from "react-router";
import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import Types from "app/config/types";
import type { Route } from "../+types/root";

export const clientAction = async ({
  request,
  params,
  serverAction,
  ...rest
}: Route.ClientActionArgs) => {
  console.log({
    request,
    params,
    serverAction,
    rest,
  });
  // const data = await serverAction();
  // return data;
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
              name="types"
              id="types"
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
              name="decoded"
              id="decoded"
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
