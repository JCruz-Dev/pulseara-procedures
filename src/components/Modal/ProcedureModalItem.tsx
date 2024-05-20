import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const ProcedureModalItem = ({
  defaultValue,
  title,
  callback,
  inputType = "text",
  customClasses = "",
}: {
  defaultValue: string;
  title: string;
  inputType?: HTMLInputTypeAttribute;
  callback: () => UseFormRegisterReturn<"procedure">;
  customClasses?: string;
}) => {
  const inputStyles = customClasses;
  return (
    <>
      <label className="flex flex-col gap-2">
        <span className="font-modal_titles text-procedure-black-100">
          {title}
        </span>
        <input
          type={inputType}
          className={`bg-[#F6F6FB] px-4 w-full ring-2 ring-procedure-green-300 rounded h-[44px] ${inputStyles}`}
          {...callback()}
          required
          placeholder={defaultValue}
        />
      </label>
    </>
  );
};
export default ProcedureModalItem;
