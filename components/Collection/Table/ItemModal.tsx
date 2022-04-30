import { Button, Input, Modal, TagInput } from "@components/Common";
import { useAppSelector } from "@redux/hooks";
import React from "react";
import { Tag } from "react-tag-input";

interface ItemModalProps {
  closeModal: () => void;
  onSubmit: (obj: any) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ closeModal, onSubmit }) => {
  const { isForEdit, columns } = useAppSelector((state) => state.tableSlice);

  const [tags, setTags] = React.useState<Tag[]>(
    isForEdit
      ? isForEdit.tags.map((tag: Tag) => ({
          id: tag,
          text: tag,
        }))
      : []
  );

  const [inputValue, setInputValue] = React.useState<any>(() =>
    columns
      .map((obj) => ({
        accessor: obj.accessor,
        name: obj.name,
        value: isForEdit
          ? isForEdit[obj.accessor]
          : obj.type === "checkbox"
          ? "No"
          : "",
        type: obj.type,
      }))
      .filter(
        (obj) =>
          obj.accessor != "id" &&
          obj.accessor !== "add" &&
          obj.accessor !== "tags"
      )
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(
      inputValue.map((input: any) => {
        if (input.accessor == e.target.name) {
          if (input.type === "checkbox") {
            input.value = e.target.checked ? "Yes" : "No";
          } else {
            input.value = e.target.value;
          }
        }
        return input;
      })
    );
  };
  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const row = inputValue.map((values: any) => [
      values.accessor,
      values.value,
    ]);

    onSubmit({
      ...Object.fromEntries(row),
      tags: tags.map((tag: Tag) => tag.text),
      id: isForEdit ? isForEdit.id : 1488228,
    });

    closeModal();
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  return (
    <Modal
      closeModal={closeModal}
      className="flex flex-col w-[80vw] md:w-[60vw] max-h-[95vh] py-10 justify-center  overflow-x-hidden"
    >
      <h1 className="text-3xl text-black font-bold self-center">
        {isForEdit ? "Edit column" : "New column"}
      </h1>
      <div className="flex flex-col items-center">
        <form className="flex flex-col w-3/5 mt-3 space-y-3">
          {inputValue &&
            inputValue.map((input: any, index: number) => (
              <Input
                key={index}
                textarea={input.type === "textarea"}
                className="px-[10px] py-[5px]"
                onChange={handleTextChange}
                value={input.value}
                name={input.accessor}
                checked={input.type === "checkbox" && input.value === "Yes"}
                label={input.name}
                type={input.type === "textarea" ? "text" : input.type}
              />
            ))}
          <TagInput
            onAdd={handleAddition}
            onDelete={handleDelete}
            tags={tags}
          />
          <Button
            disabled={!inputValue[0].value || tags.length === 0}
            className="w-2/3 self-center"
            onClick={handleSubmitClick}
          >
            {isForEdit ? "Edit" : "Add"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ItemModal;
