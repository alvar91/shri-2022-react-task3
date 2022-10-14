import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../../store/selectors";
import { editTaskRequest } from "../../store/listSlice";
import TitledContainer from "../TitledContainer/TitledContainer";
import Input from "../Input/Input";
import TagSelector from "../TagSelector/TagSelector";
import Button from "../Button/Button";
import TagContainer from "../TagContainer/TagContainer";

import { TITLES } from "../../constants";

export default function EditTaskModal() {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector(selectTask);

  const [tags, setTags] = useState(task.tags);

  function deleteTag(tagToDelete) {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

  function submitHandler(data) {
    // dispatch(editTask({ id: task.id, ...data, tags, comments: task.comments }));
    dispatch(editTaskRequest({ id: task.id, ...data, tags, comments: task.comments }));
    navigate(-1);
  }

  return (
    <TitledContainer
      title={TITLES.edit}
      style={{
        width: 340,
        margin: "0 84px 64px 84px",
      }}
    >
      <Controller
        name="title"
        control={control}
        defaultValue={task.title}
        rules={{ required: true }}
        render={({ field, ref }) => (
          <Input
            isMultiline={false}
            placeholder="Название"
            style={{ marginBottom: 8 }}
            ref={ref}
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue={task.description}
        render={({ field, ref }) => (
          <Input
            isMultiline={true}
            placeholder="Описание"
            ref={ref}
            {...field}
          />
        )}
      />
      <TagContainer
        tags={tags}
        deletePossibility={true}
        deleteTag={deleteTag}
      />
      <TagSelector
        selectedTags={tags}
        setSelectedTags={setTags}
      />
      <Button onClick={handleSubmit(submitHandler)}>Сохранить</Button>
    </TitledContainer>
  );
}
