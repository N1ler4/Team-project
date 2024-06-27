import React, { useState, useEffect } from "react";
import { Menu } from "@ui";
import { useNavigate } from "react-router-dom";
import { getDataFromCookie } from "@token-service";
import logo from "../../../assets/logo-no-background.png";

export default function Index() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mainNavigate = () => {
    navigate("/");
  };

  const checkToken = async () => {
    const token = await getDataFromCookie("token");
    const refreshToken = await getDataFromCookie("refresh-token");
    return token && refreshToken;
  };

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = await checkToken();
      setIsAuthenticated(authenticated);
    };
    fetchData();
  }, []);

  return (
    <header className="container mx-auto px-10 py-3">
      <nav className="flex justify-between items-center flex-wrap">
        <div className="flex gap-2 items-center flex-wrap">
          <img
            src={logo}
            alt=""
            onClick={mainNavigate}
            className="text-[18px] h-[40px] w-auto cursor-pointer"
          />
        </div>
        {isAuthenticated ? (
          <Menu />
        ) : (
          <button
            className="w-[80px] h-[40px] bg-[#F07448] rounded-2xl text-white"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
