import { Button, CustomDropdown, Input, Modal } from "@components/Common";
import React from "react";

const types = [
  {
    label: "Checkbox",
    value: "checkbox",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Text",
    value: "textarea",
  },
  {
    label: "String",
    value: "text",
  },
  {
    label: "Number",
    value: "number",
  },
];

export type ModalColumn = {
  name: string;
  init: string;
  type: "checkbox" | "date" | "text" | "number" | "textarea";
};

interface ColumnModalProps {
  closeModal: () => void;
  onSubmit: (obj: ModalColumn) => void;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ closeModal, onSubmit }) => {
  const [inputValue, setInputValue] = React.useState<ModalColumn>({
    init: "",
    type: "text",
    name: "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]:
        e.target.name === "init"
          ? inputValue.type === "checkbox"
            ? e.target.checked
              ? "Yes"
              : "No"
            : e.target.value
          : e.target.value,
    });
  };
  const handleDropdownChange = (option: any) => {
    setInputValue({
      ...inputValue,
      type: option.value,
      init: option.value === "checkbox" ? "No" : "",
    });
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
    closeModal();
  };

  return (
    <Modal
      closeModal={closeModal}
      className="flex flex-col w-[80vw] md:w-[60vw] max-h-[95vh] py-10 justify-center  overflow-x-hidden"
    >
      <h1 className="text-3xl text-black font-bold self-center">New column</h1>
      <div className="flex flex-col items-center">
        <form className="flex flex-col w-3/5 mt-3 space-y-3">
          <Input
            className="px-[10px] py-[5px]"
            onChange={handleTextChange}
            value={inputValue.name}
            name="name"
            label="Name"
            type="text"
          />

          <Input
            textarea={inputValue.type === "textarea"}
            className="px-[10px] py-[5px]"
            onChange={handleTextChange}
            value={inputValue.init}
            name="init"
            label="Initial value"
            type={inputValue.type === "textarea" ? "text" : inputValue.type}
          />

          <CustomDropdown
            label="Type"
            list={types}
            name="type"
            onChange={handleDropdownChange}
            defaultValue={inputValue.type}
          />
          <Button
            disabled={!inputValue.type || !inputValue.name}
            className="w-2/3 self-center"
            onClick={handleSubmitClick}
          >
            Add
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ColumnModal;
