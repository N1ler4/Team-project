import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import useUserStore from "../../../store/profile";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { getUser } = useUserStore();

  const handleLogout = () => {
    deleteDataFromCookie("token");
    deleteDataFromCookie("refresh-token");
    deleteDataFromCookie("email");
    navigate("/auth");
  };

  const getData = async () => {
    const res = await getUser(getDataFromCookie("id"));
    if (res && res.status === 200) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <nutton className="w-7 h-7 bg-[#F07448] cursor-pointer rounded-full text-white grid justify-center items-center">
        {user.full_name ? user.full_name.charAt(0) : ""}
      </nutton>
    </Dropdown>
  );
};

export default ProfileMenu;
