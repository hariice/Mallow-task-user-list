import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import "../styles/modal.css";
import { successNotification } from "../helper/notificationHelper";
import { createNewUser, editUser } from "../stores/user-slice";

const CreateOrEditUser = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onFinish = (values) => {
    if (user) {
      dispatch(editUser(user.id, values));
      successNotification("success", "update");
      onClose();
    } else {
      dispatch(createNewUser(values));
      successNotification("success", "create");
      onClose();
    }
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <Modal
      title={user ? "Edit User" : "Create New User"}
      visible={true}
      onCancel={onClose}
      footer={false}
    >
      <Form form={form} onFinish={onFinish} {...layout}>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please Enter the first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please Enter the last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please Enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Profile Image Link"
          rules={[
            { required: true, message: "Please Enter the profile image link!" },
          ]}
        >
          <Input />
        </Form.Item>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Button key="cancel" onClick={onClose} style={{ marginRight: "8px" }}>
            Cancel
          </Button>
          <Button key="submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateOrEditUser;
