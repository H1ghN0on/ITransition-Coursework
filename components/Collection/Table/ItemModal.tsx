import { Button, Input, Modal, TagInput } from "@components/Common";
import { useAppSelector } from "@redux/hooks";
import React from "react";
import { Tag } from "react-tag-input";
import { FormattedMessage, useIntl } from "react-intl";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { InputLabel } from "@components/Common/Input";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"!).then((mod) => mod.default),
  { ssr: false }
) as any;

interface ItemModalProps {
  closeModal: () => void;
  onSubmit: (obj: any) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ closeModal, onSubmit }) => {
  const intl = useIntl();

  const { isForEdit, columns } = useAppSelector((state) => state.tableSlice);
  const [tags, setTags] = React.useState<Tag[]>(
    isForEdit
      ? isForEdit.tags.map((tag: Tag) => ({
          id: tag,
          text: tag,
        }))
      : []
  );

  const setInitValue = (type: string, accessor: string) => {
    if (isForEdit) {
      if (type === "checkbox") {
        return isForEdit[accessor] === "true";
      } else {
        return isForEdit[accessor];
      }
    } else {
      if (type === "checkbox") {
        return false;
      } else {
        return "";
      }
    }
  };

  const [inputValue, setInputValue] = React.useState<any>(() =>
    columns
      .map((obj) => ({
        accessor: obj.accessor,
        name: obj.name,

        value: setInitValue(obj.type, obj.accessor),
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
            input.value = e.target.checked;
          } else {
            input.value = e.target.value;
          }
        }
        return input;
      })
    );
  };

  const handleMarkdownChange = (
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(
      inputValue.map((input: any) => {
        if (input.accessor == e.target.name) {
          input.value = value;
        }

        return input;
      })
    );
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const row = inputValue.map((values: any) => ({
      accessor: values.accessor,
      value: values.value,
      type: values.type,
      name: values.name,
    }));
    const name = inputValue.find(
      (values: any) => values.accessor === "name"
    ).value;
    onSubmit({
      info: row.filter((value: any) => value.accessor !== "name"),
      name,
      tags: tags.map((tag: Tag) => tag.text),
      id: isForEdit ? isForEdit.id : 0,
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
      className="flex flex-col w-[80vw] md:w-[60vw] max-h-[95vh] py-10 justify-center overflow-x-hidden"
    >
      <h1 className="text-3xl text-black font-bold self-center">
        {isForEdit ? (
          <FormattedMessage id="edit_item" />
        ) : (
          <FormattedMessage id="add_item" />
        )}
      </h1>

      <div className="flex flex-col items-center">
        <form className="flex flex-col w-3/5 mt-3 space-y-3">
          {inputValue &&
            inputValue.map((input: any, index: number) =>
              input.type === "text" ? (
                <>
                  <InputLabel htmlFor={input.accessor}>{input.name}</InputLabel>
                  <MDEditor
                    id={input.accessor}
                    onChange={handleMarkdownChange}
                    value={input.value as string}
                    textareaProps={{
                      name: input.accessor,
                    }}
                  />
                </>
              ) : (
                <Input
                  key={index}
                  textarea={input.type === "textarea"}
                  className="px-[10px] py-[5px]"
                  onChange={handleTextChange}
                  value={input.value}
                  name={input.accessor}
                  checked={input.type === "checkbox" && input.value}
                  label={
                    input.accessor == "name"
                      ? intl.formatMessage({ id: "name" })
                      : input.name
                  }
                  type={input.type === "textarea" ? "text" : input.type}
                />
              )
            )}
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
            {isForEdit ? (
              <FormattedMessage id="edit" />
            ) : (
              <FormattedMessage id="add" />
            )}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ItemModal;
