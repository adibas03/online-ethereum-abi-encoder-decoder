import Description from "app/actions/components/description";
import InputLabel from "app/actions/components/inputLabel";
import InputWrap from "app/actions/components/inputWrap";
import ActionButton from "app/actions/components/actionButton";
import Types from "app/config/types";

export default function Encode() {
  return (
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
        <InputLabel>Encoded data</InputLabel>
        <InputWrap>
          <textarea
            name="decoded"
            id="decoded"
            className="w-full bg-transparent border-0"
          />
        </InputWrap>
        <Description>Add the encoded data for decoding</Description>
      </div>

      <ActionButton>Decode</ActionButton>
    </div>
  );
}
