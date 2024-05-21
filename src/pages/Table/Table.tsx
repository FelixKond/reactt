import React from 'react';
import { Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
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
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const tableData: TableDataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    sex: "male",
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    sex: "male",
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    sex: "female",
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Ann Bimbo",
    age: 25,
    sex: "female",
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const DataTablePage = () => {
  return <Table columns={tableColumns} dataSource={tableData} />;
};

export default DataTablePage;
