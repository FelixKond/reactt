import { Alert, Button, Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

interface IMyForm {
  name: string;
  age: number;
  country: string;
}

const FormWrapper = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const InputWrapper = styled.div`
  input {
    min-width: 500px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 15px;
    font-size: 14px;
  }
`;

const CustomLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const Form = () => {
  const [tasks, setTasks] = useState<IMyForm[]>([]);

  const saveElement: SubmitHandler<IMyForm> = (data) => {
    // здесь мы передаём новый массив, который содержит все старые элементы и новый
    // ...prev - мы получаем все элементы текущего стэйте (с помощью spread оператора)
    setTasks((prev) => [...prev, data]);
    reset();
  };

  const {
    register, // метод для регистрации вашего инпута, для дальнейшей работы с ним
    handleSubmit, // метод для получения данных формы, если валидация прошла успешна
    formState: { errors, isValid }, // errors - список ошибок валидации для всех полей формы
    reset, // метод для очистки полей формы
  } = useForm<IMyForm>({
    mode: "onBlur", // парметр onBlur - отвечает за запуск валидации при не активном состоянии поля
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FormWrapper>
        <form onSubmit={handleSubmit(saveElement)}>
          <InputWrapper>
            <CustomLabel htmlFor="name">Name</CustomLabel>
            <input
              id="name"
              placeholder="Your name..."
              {...register("name", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 7,
                  message: "Нужно больше символов",
                },
              })}
            />
          </InputWrapper>
          {errors.name && <Alert message={errors.name.message} type="error" showIcon />}
          <InputWrapper>
            <CustomLabel htmlFor="age">Age</CustomLabel>
            <input
              id="age"
              placeholder="Your age..."
              type="number"
              {...register("age", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 1,
                  message: "Нужно больше символов",
                },
              })}
            />
          </InputWrapper>
          {errors.age && <Alert message={errors.age.message} type="error" showIcon />}
          <InputWrapper>
            <CustomLabel htmlFor="country">Country</CustomLabel>
            <input
              id="country"
              placeholder="Your country..."
              {...register("country", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 3,
                  message: "Нужно больше символов",
                },
              })}
            />
          </InputWrapper>
          {errors.country && <Alert message={errors.country.message} type="error" showIcon />}
          <Button type="primary" htmlType="submit" disabled={!isValid} onClick={showModal}>
            Сохранить
          </Button>
          <Modal title="Form Result" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {tasks.map((task) => (
              <p>
                {task.name} - {task.age} - {task.country}
              </p>
            ))}
          </Modal>
        </form>
      </FormWrapper>
    </>
  );
};

export default Form;
