import React, { useEffect, useState } from "react";
import { Table, Button, Radio, Card, Col, Row, Popconfirm, Spin } from "antd";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  TableOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../styles/listUser.css";
import Search from "antd/es/input/Search";
import CreateOrEditUser from "./create-edit-modal";
import { successNotification } from "../helper/notificationHelper";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeUser } from "../stores/user-slice";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const ListUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.users);
  const [searchUser, setSearchUser] = useState("");
  const [viewType, setViewType] = useState("table");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisisble] = useState(false);

  const onSearch = (e) => {
    setSearchUser(e.target.value);
  };

  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

  const handleUserList = (value, type) => {
    if (!value) {
      setIsModalVisisble(true);
    } else {
      setEditingUser(value);
      setIsModalVisisble(true);
    }
  };

  const onClose = () => {
    setIsModalVisisble(false);
    setEditingUser(null);
  };

  const handleDelete = (item) => {
    dispatch(removeUser(item.id));
    successNotification("success", "delete");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem('token')
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const column = [
    {
      title: "Image",
      render: (_, src) => (
        <>
          <img src={src.avatar} className="table-img" />
        </>
      ),
    },
    {
      title: "Email",
      render: (_, item) => <a href={item.email}>{item.email}</a>,
    },
    { title: "First Name", dataIndex: "first_name" },
    { title: "Last Name", dataIndex: "last_name" },
    {
      title: "Action",
      render: (_, item) => (
        <>
          <Button
            onClick={() => handleUserList(item)}
            style={{ marginRight: 10 }}
            type="primary"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDelete(item)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="list-main-cntr">
      <div className="list-header">
        Elone Musk
        <Button
          type="primary"
          style={{ marginLeft: 10, marginRight: 40 }}
          onClick={() => handleLogout()}
          danger
        >
          <LogoutOutlined />
        </Button>
      </div>

      {loading && <Spin size="large" className="spinner" />}
      {!loading && (
        <div className="list-user-table">
          <div className="table-header">
            <h3>Users</h3>
            <div>
              <Search
                placeholder="input search text"
                allowClear
                onChange={onSearch}
                style={{
                  width: 200,
                  marginRight: 8,
                }}
              />
              <Button onClick={() => handleUserList()} type="primary">
                Create User
              </Button>
            </div>
          </div>
          <Radio.Group
            className="tabs-view"
            buttonStyle="solid"
            onChange={handleViewChange}
            value={viewType}
          >
            <Radio.Button value="table">
              <TableOutlined /> Table
            </Radio.Button>
            <Radio.Button value="list">
              <UnorderedListOutlined /> Card
            </Radio.Button>
          </Radio.Group>
          {viewType === "table" ? (
            <Table columns={column} dataSource={filteredUsers} pagination={{ pageSize: 5 }} />
          ) : (
            <div className="card-cntr">
              <Row gutter={[16, 16]}>
                {filteredUsers.map((item) => (
                  <Col span={6}>
                    <Card
                      className={
                        hoveredCard === item.id
                          ? "user-card blurred"
                          : "user-card"
                      }
                      hoverable
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <img
                        className="card-img"
                        alt="example"
                        src={item.avatar}
                      />
                      <Meta
                        title={`${item.first_name} ${item.last_name}`}
                        description={item.email}
                      />
                    </Card>
                    {hoveredCard === item.id && (
                      <div
                        className="card-actions"
                        onMouseEnter={() => setHoveredCard(item.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <Button
                          onClick={() => handleUserList(item)}
                          shape="circle"
                          type="primary"
                          icon={<EditOutlined />}
                        />
                        <Popconfirm
                          title="Delete the user"
                          description="Are you sure to delete this user?"
                          onConfirm={() => handleDelete(item)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            shape="circle"
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </div>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )}
      {isModalVisible && (
        <CreateOrEditUser
          user={editingUser}
          onClose={() => onClose()}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ListUsers;
