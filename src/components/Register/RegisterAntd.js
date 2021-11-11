import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../../config/firebase";
import { useDispatch } from "react-redux";
import * as auth from "../../redux/actions/index";

const LoginAntd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = (data) => {
    dispatch(auth.setUser(data));
  };
  const onFinish = (values) => {
    console.log(values);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        user.user.updateProfile({
          displayName: values.username,
        });
        const data = {
          user: user.user,
        };
        loginUser(data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { Title } = Typography;

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={12} offset={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            REGISTER
          </Title>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              REGISTER
            </Button>
            Or <Link to="/login">Login now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginAntd;
