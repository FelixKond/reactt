import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import Form from './components/form';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useForm } from "react-hook-form";
import MyDocument from './components/MyDocument';
import DinamicPagination from './components/DinamicPagination';

interface TableDataType {
  key: string;
  name: string;
  age: number;
  sex: string;
  address: string;
  tags: string[];
}

const tableColumns: ColumnsType<TableDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

interface IMyForm {
  picture: FileList;
  name: string;
}


const tableData: TableDataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    sex: 'male', 
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    sex: 'male',
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    sex: 'female',
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Ann Bimbo',
    age: 25,
    sex: 'female',
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

interface DataType {
  country: string;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Страна',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Название учебного заведения',
    dataIndex: 'name',
    key: 'name',
  },
]

const App = () => {
  const [task, setTasks] = useState<IMyForm | null>(null);

  const { register, handleSubmit } = useForm<IMyForm>({
    mode: "onBlur",
  });

  const MyForm = (data: IMyForm) => {
    setTasks(data);
  };

  const LIMIT_LIST_SCHOOL = 10;

  const getUniversity = async (limit: number, page: number) => {
    const offset = page * 10;
    const response = await axios.get(`http://universities.hipolabs.com/search?offset=${offset}&limit=${limit}`);
    return response.data;
  }

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getUniversity(LIMIT_LIST_SCHOOL, page - 1).then((data) => setData(data))
  }, [page])

  return (
    <>
      <Table columns={tableColumns} dataSource={tableData} />
      <Table columns={columns} dataSource={data} pagination={false}/>
      <div className="buttons__wrapper">
        <Button onClick={(() => setPage(page - 1))} disabled={!(page - 1)}>Назад</Button>
        <Button>{ page }</Button>
        <Button onClick={(() => setPage(page + 1))}>Вперед</Button>
      </div>
      <Form/>
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
      <DinamicPagination></DinamicPagination>
    </>
  )
}

export default App;