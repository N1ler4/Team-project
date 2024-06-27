import React from "react";
import { Table, Button } from "antd";

const GlobalTable = ({ data, onDelete }) => {
  const columns = [
    {
      title: "Filename",
      dataIndex: "filename",
      key: "filename",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Job Location",
      dataIndex: "job_location",
      key: "job_location",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => onDelete(record.id)} type="primary" danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Table
        dataSource={data.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default GlobalTable;
