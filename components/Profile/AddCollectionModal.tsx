import { Api } from "@api";
import { Button, ImageInput, Input, Modal } from "@components/Common";
import { Topics } from "@components/Profile";
import React from "react";
import { XCircle } from "react-bootstrap-icons";
import { FormattedMessage, useIntl } from "react-intl";

interface ModalProps {
  closeModal: () => void;
}

const AddCollectionModal: React.FC<ModalProps> = ({ closeModal }) => {
  const intl = useIntl();
  const chooseAvatarIntl = intl.formatMessage({ id: "choose_the_avatar" });
  const nameIntl = intl.formatMessage({ id: "name" });
  const descriptionIntl = intl.formatMessage({ id: "description" });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<{
    name: string;
    description: string;
    topics: string[];
    imageValue: null | File;
  }>({
    name: "",
    description: "",
    topics: [],
    imageValue: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInputValue({ ...inputValue, imageValue: e.target.files[0] });
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitClick = async () => {
    setIsLoading(true);
    const { name, description, topics, imageValue } = inputValue;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("topics", JSON.stringify(topics));
    formData.append("avatar", imageValue ?? "");
    const status = await Api().createCollection(formData);
    console.log(status);
    setIsLoading(false);
    closeModal();
  };

  const handleTopicChoose = (type: "add" | "remove", value: string) => {
    if (type == "remove") {
      setInputValue({
        ...inputValue,
        topics: inputValue.topics.filter((topic: string) => topic != value),
      });
    } else if (type == "add") {
      setInputValue({
        ...inputValue,
        topics: [...inputValue.topics, value],
      });
    }
  };

  return (
    <>
      <Modal
        closeModal={closeModal}
        className="flex flex-col w-[80vw] h-[95vh] md:h-[80vh] py-5 justify-center overflow-y-auto overflow-x-hidden"
      >
        <div className="flex flex-col md:flex-row items-center w-full py-5">
          <div className="w-1/2 mt-10 md:mt-0 md:w-1/4 md:ml-4">
            <ImageInput
              width={200}
              height={200}
              label={chooseAvatarIntl}
              onChange={handleImageChange}
              name="avatar"
            />
          </div>
          <form className="flex flex-col md:w-3/4 space-y-3 px-20">
            <Input
              name="name"
              placeholder={nameIntl}
              type="text"
              label={nameIntl}
              value={inputValue.name}
              onChange={handleTextChange}
            />
            <Input
              className="resize-none"
              textarea
              name="description"
              placeholder={descriptionIntl}
              type="text"
              label={descriptionIntl}
              value={inputValue.description}
              onChange={handleTextChange}
            />
            <Topics
              onTopicClick={handleTopicChoose}
              activeTopics={inputValue.topics}
              topics={["Future", "Science", "Big", "Shot", "Chance"]}
            />
          </form>
        </div>
        <div className="flex justify-center">
          <Button
            disabled={
              inputValue.name == "" ||
              inputValue.description == "" ||
              inputValue.topics.length == 0 ||
              isLoading
            }
            className="mt-5 "
            onClick={handleSubmitClick}
          >
            <FormattedMessage id="add" />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddCollectionModal;
