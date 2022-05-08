import React from "react";
import { InputLabel } from "./Input";

import { Tag, WithContext as ReactTags } from "react-tag-input";
import { FormattedMessage, useIntl } from "react-intl";

// const suggestions = COUNTRIES.map((country) => {
//   return {
//     id: country,
//     text: country,
//   };
// });

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface TagInputProps {
  tags: Tag[];

  blockClassName?: string;
  onDelete: (i: number) => void;
  onAdd: (tag: Tag) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  onAdd,
  onDelete,
  tags,
  blockClassName,
}) => {
  const intl = useIntl();

  const tagsPlaceholderIntl = intl.formatMessage({ id: "tags_placeholder" });
  return (
    <div className={`flex flex-col ${blockClassName}`}>
      <InputLabel htmlFor="tags">
        <FormattedMessage id="item_tags" />
      </InputLabel>
      <ReactTags
        name="tags"
        tags={tags}
        handleDrag={() => {}}
        delimiters={delimiters}
        handleDelete={onDelete}
        handleAddition={onAdd}
        inputFieldPosition="bottom"
        autocomplete
        placeholder={tagsPlaceholderIntl}
        inline
      />
    </div>
  );
};

export default TagInput;
