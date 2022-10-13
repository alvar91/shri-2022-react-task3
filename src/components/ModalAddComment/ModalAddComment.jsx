import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TitledContainer from "../TitledContainer/TitledContainer";
import Input from "../Input/Input";
import Button from "../Button/Button";

import { TITLES } from "../../constants";

export default function ModalAddComment({ addHandler, task }) {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  function submitHandler(data) {
    addHandler(data);
    navigate(`/full/${task.id}`);
  }

  return (
    <TitledContainer
      title={TITLES.addComment}
      style={{
        width: 340,
        margin: "0 84px 64px 84px",
      }}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field, ref }) => (
          <Input
            isMultiline={false}
            placeholder="Имя"
            style={{ marginBottom: 8 }}
            ref={ref}
            {...field}
          />
        )}
      />
      <Controller
        name="text"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field, ref }) => (
          <Input
            isMultiline={true}
            placeholder="Комментарий"
            ref={ref}
            {...field}
          />
        )}
      />
      <Button onClick={handleSubmit(submitHandler)}>Сохранить</Button>
    </TitledContainer>
  );
}
