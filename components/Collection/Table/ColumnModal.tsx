import { Button, CustomDropdown, Input, Modal } from "@components/Common";
import { useAppSelector } from "@redux/hooks";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export type ModalColumn = {
  name: string;
  init: string | boolean;
  type: "checkbox" | "date" | "string" | "number" | "text";
};

interface ColumnModalProps {
  closeModal: () => void;
  onSubmit: (obj: ModalColumn) => void;
}

const ColumnModal: React.FC<ColumnModalProps> = ({ closeModal, onSubmit }) => {
  const tableColumnNames = useAppSelector(
    (state) => state.tableSlice.columns
  ).map((obj) => obj.name.toLowerCase());

  const [error, setError] = React.useState<string>("");

  const intl = useIntl();

  const itemCheckboxIntl = intl.formatMessage({ id: "column_checkbox" });
  const itemTextIntl = intl.formatMessage({ id: "column_text" });
  const itemStringIntl = intl.formatMessage({ id: "column_string" });
  const itemNumberIntl = intl.formatMessage({ id: "column_number" });
  const itemDateIntl = intl.formatMessage({ id: "column_date" });
  const itemTypeIntl = intl.formatMessage({ id: "column_type" });
  const itemInitValueIntl = intl.formatMessage({ id: "column_init_value" });
  const itemNameIntl = intl.formatMessage({ id: "name" });
  const yesIntl = intl.formatMessage({ id: "yes" });
  const noIntl = intl.formatMessage({ id: "no" });
  const sameNameErrorIntl = intl.formatMessage({ id: "column_same_name_err" });
  const types = [
    {
      label: itemCheckboxIntl,
      value: "checkbox",
    },
    {
      label: itemDateIntl,
      value: "date",
    },
    {
      label: itemNumberIntl,
      value: "number",
    },
    {
      label: itemStringIntl,
      value: "string",
    },
    {
      label: itemTextIntl,
      value: "text",
    },
  ];

  const [inputValue, setInputValue] = React.useState<ModalColumn>({
    init: "",
    type: "string",
    name: "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]:
        e.target.name === "init"
          ? inputValue.type === "checkbox"
            ? e.target.checked
            : e.target.value
          : e.target.value,
    });
  };
  const handleDropdownChange = (option: any) => {
    setInputValue({
      ...inputValue,
      type: option.value,
      init: option.value === "checkbox" ? false : "",
    });
  };
  const validate = () => {
    if (tableColumnNames.includes(inputValue.name.toLowerCase())) {
      setError(sameNameErrorIntl);
      return false;
    }
    return true;
  };
  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    onSubmit(inputValue);
    closeModal();
  };

  return (
    <Modal
      closeModal={closeModal}
      className="flex flex-col w-[80vw] md:w-[60vw] max-h-[95vh] py-10 justify-center overflow-x-hidden"
    >
      <h1 className="text-3xl text-black font-bold self-center">
        <FormattedMessage id="new_column" />
      </h1>
      <div className="flex flex-col items-center">
        {error && <span className="text-sm text-red-600">{error}</span>}
        <form className="flex flex-col w-3/5 mt-3 space-y-3">
          <Input
            className="px-[10px] py-[5px]"
            onChange={handleTextChange}
            value={inputValue.name}
            name="name"
            label={itemNameIntl}
            type="text"
          />

          <Input
            textarea={inputValue.type === "text"}
            className="px-[10px] py-[5px]"
            onChange={handleTextChange}
            value={inputValue.init as string}
            checked={inputValue.init as boolean}
            name="init"
            label={itemInitValueIntl}
            type={
              inputValue.type === "text"
                ? "text"
                : (inputValue.type as
                    | "checkbox"
                    | "text"
                    | "date"
                    | "password"
                    | "number")
            }
          />

          <CustomDropdown
            label={itemTypeIntl}
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
            <FormattedMessage id="add" />
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ColumnModal;
