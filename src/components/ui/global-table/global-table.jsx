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
      title: "Job Title",
      dataIndex: "job_title",
      key: "job title",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Job Type",
      dataIndex: "job_location",
      key: "job_location",
    },
  ];

  // Add Action column only if onDelete is provided
  if (onDelete) {
    columns.push({
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => onDelete(record?.id)} type="primary" danger>
          Delete
        </Button>
      ),
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <Table
        dataSource={data?.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default GlobalTable;
