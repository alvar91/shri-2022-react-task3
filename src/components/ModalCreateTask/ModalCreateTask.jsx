import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTaskRequest } from "../../store/listSlice";
import TitledContainer from "../TitledContainer/TitledContainer";
import Input from "../Input/Input";
import TagSelector from "../TagSelector/TagSelector";
import Button from "../Button/Button";

import { selectFirstListId } from "../../store/selectors";

import { TITLES } from "../../constants";

export default function CreateTaskModal() {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstListId = useSelector(selectFirstListId);

  const params = useParams();
  const listId = params?.listId?.slice(0) ?? firstListId;
  const [tags, setTags] = useState([]);

  function submitHandler(data) {
    // dispatch(addTask({ listId, task: { ...data, tags } }));
    dispatch(addTaskRequest({ listId, task: { ...data, tags } }));
    navigate(`/`);
  }

  return (
    <TitledContainer
      title={TITLES.createTask}
      style={{
        width: 340,
        margin: "0 84px 64px 84px",
      }}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
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
        defaultValue=""
        render={({ field, ref }) => (
          <Input
            isMultiline={true}
            placeholder="Описание"
            ref={ref}
            {...field}
          />
        )}
      />
      <TagSelector
        selectedTags={tags}
        setSelectedTags={setTags}
      />
      <Button onClick={handleSubmit(submitHandler)}>Сохранить</Button>
    </TitledContainer>
  );
}
