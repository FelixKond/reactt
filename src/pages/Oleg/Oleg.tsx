import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useForm } from 'react-hook-form';
import MyDocument from '../../components/MyDocument';

interface IMyForm {
  picture: FileList;
  name: string;
}

const Vadim = () => {
  const [task, setTasks] = useState<IMyForm | null>(null);
  const { register, handleSubmit } = useForm<IMyForm>({
    mode: "onBlur",
  });

  const MyForm = (data: IMyForm) => {
    setTasks(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(MyForm)}>
        <input
          {...register("name", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 5,
              message: "Нужно больше символов",
            },
          })}
          placeholder="Enter name"
        />
        <input
          type="file"
          accept="image/*"
          {...register("picture", {
            required: "Изображение",
          })}
        />
        <button type="submit">Сохранить</button>
      </form>
      {task?.name && task?.picture && (
        <PDFDownloadLink document={<MyDocument name={task.name} picture={task.picture} />} fileName="lab_pdf.pdf">
          {({ loading, error }) => {
            try {
              if (loading) return "Loading document...";
              if (error) throw new Error("Error generating document");
              return "Download now!";
            } catch (error) {
              console.error("PDF generation error:", error);
              return "Error generating PDF";
            }
          }}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default Vadim;
