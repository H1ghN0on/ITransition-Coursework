import { Api } from "@api";
import { Button, ImageInput, Input, Modal } from "@components/Common";
import { Topics } from "@components/Profile";
import { addCollection, editCollection } from "@redux/collectionsSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { TopicType } from "@types";
import router, { useRouter } from "next/router";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface ModalProps {
  closeModal: () => void;
}

const AddCollectionModal: React.FC<ModalProps> = ({ closeModal }) => {
  const router = useRouter();
  const forEdit = useAppSelector((state) => state.collectionsSlice.isForEdit);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const availableTopics = [
    { accessor: "auto", value: intl.formatMessage({ id: "auto" }) },
    { accessor: "culture", value: intl.formatMessage({ id: "culture" }) },
    { accessor: "art", value: intl.formatMessage({ id: "art" }) },
    { accessor: "property", value: intl.formatMessage({ id: "property" }) },
    { accessor: "rest", value: intl.formatMessage({ id: "rest" }) },
    { accessor: "hobby", value: intl.formatMessage({ id: "hobby" }) },
    { accessor: "buisness", value: intl.formatMessage({ id: "buisness" }) },
    { accessor: "science", value: intl.formatMessage({ id: "science" }) },
    { accessor: "job", value: intl.formatMessage({ id: "job" }) },
    { accessor: "health", value: intl.formatMessage({ id: "health" }) },
    { accessor: "society", value: intl.formatMessage({ id: "society" }) },
    { accessor: "sports", value: intl.formatMessage({ id: "sports" }) },
    { accessor: "computers", value: intl.formatMessage({ id: "computers" }) },
  ];

  const chooseAvatarIntl = intl.formatMessage({ id: "choose_the_avatar" });
  const nameIntl = intl.formatMessage({ id: "name" });
  const descriptionIntl = intl.formatMessage({ id: "description" });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  //FIX IMAGE VALUE
  const [inputValue, setInputValue] = React.useState<{
    name: string;
    description: string;
    topics: TopicType[];
    imageValue: null | File;
  }>({
    name: forEdit ? forEdit.name : "",
    description: forEdit ? forEdit.description : "",
    topics: forEdit
      ? forEdit.topics.map((topic: string) => ({
          value: intl.formatMessage({ id: topic }),
          accessor: topic,
        }))
      : [],
    imageValue: null,
  });

  const handleImageChange = (file: FileList | File[]) => {
    if (file) {
      setInputValue({ ...inputValue, imageValue: file[0] });
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
    formData.append("belongsTo", router.query.id as string);
    formData.append("name", name);
    formData.append("description", description);
    formData.append(
      "topics",
      JSON.stringify(topics.map((topic) => topic.accessor))
    );
    formData.append("avatar", imageValue ?? "");
    if (!forEdit) {
      const collection = await Api().createCollection(formData);
      if (collection) dispatch(addCollection(collection));
    } else {
      const collection = await Api().editCollection(+forEdit.id, formData);
      if (collection) dispatch(editCollection(collection));
    }
    setIsLoading(false);
    closeModal();
  };

  const handleTopicChoose = (type: "add" | "remove", value: TopicType) => {
    if (type == "remove") {
      setInputValue({
        ...inputValue,
        topics: inputValue.topics.filter(
          (topic: TopicType) => topic.accessor != value.accessor
        ),
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
              initSrc={forEdit ? forEdit.avatarURL : undefined}
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
              topics={availableTopics}
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
            {forEdit ? (
              <FormattedMessage id="edit" />
            ) : (
              <FormattedMessage id="add" />
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddCollectionModal;
