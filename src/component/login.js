import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "../styles/login.css"
import { loginUser } from '../helper/urlHelper';
import { errorNotification, successNotification } from '../helper/notificationHelper';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isRemember, setIsRemember] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const token = await loginUser(values);
            if (isRemember) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
            successNotification('success', 'login')
            navigate('/user-list');
        } catch (e) {
            errorNotification('error', 'login')
        }
    };

    const onFinishFailed = () => {
        errorNotification('error', 'login')

    };
    
    return (
        <div className='login-main-ctnr'>
            <div className='login-form'>
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 500,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <Input prefix={<UserOutlined />} placeholder='Enter the username' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Enter the password' />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" label={null} className='check-box'>
                        <Checkbox onChange={(e) => setIsRemember(e.target.checked)}>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button className='login-btn' type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;