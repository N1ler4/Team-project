import { Header, GlobalTable } from "@ui";
import Basic from "../assets/basic.png";
import Classic from "../assets/classic.png";
import Simple from "../assets/simple.png";
import { saveDataToCookie, getDataFromCookie } from "@token-service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCreateStore from "../store/create";
import { Button } from "antd";

const IndexPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { getUserData, deleteResume } = useCreateStore();

  const checkToken = async () => {
    const token = await getDataFromCookie("token");
    const refreshToken = await getDataFromCookie("refresh-token");
    return token && refreshToken;
  };

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = await checkToken();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const res = await getUserData();
        if (res.status === 200) {
          setData(res.data);
        }
      }
    };

    fetchData();
  }, [getUserData]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteResume(id);
      if (res.status === 200) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Error deleting resume:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="grid justify-center items-center container mx-auto px-10">
        <h1 className="text-center mt-[100px] mb-[25px] text-[32px]">
          Choose a new template
        </h1>
        <div className="flex gap-[10px] flex-wrap justify-center">
          <div
            className="w-[370px] cursor-pointer h-[600px] bg-white"
            onClick={() => {
              saveDataToCookie("type", "basic");
              isAuthenticated ? navigate("/basic") : navigate("/auth");
            }}
          >
            <img src={Basic} alt="Basic Template" className="w-full h-full" />
          </div>
          <div
            className="w-[370px] cursor-pointer h-[600px] bg-white"
            onClick={() => {
              saveDataToCookie("type", "classic");
              isAuthenticated ? navigate("/basic") : navigate("/auth");
            }}
          >
            <img
              src={Classic}
              alt="Classic Template"
              className="w-full h-full"
            />
          </div>
          <div
            className="w-[370px] cursor-pointer h-[600px] bg-white"
            onClick={() => {
              saveDataToCookie("type", "simple");
              isAuthenticated ? navigate("/basic") : navigate("/auth");
            }}
          >
            <img src={Simple} alt="Simple Template" className="w-full h-full" />
          </div>
        </div>
        <div className="mt-[40px]">
          <h1 className="text-[34px] text-center">My Template</h1>
          <GlobalTable data={data} onDelete={handleDelete} />
        </div>
        <div className="grid justify-center mt-[70px]">
          <Button
            type="primary"
            style={{
              backgroundColor: "#ff445c",
              borderColor: "#ff445c",
            }}
          >
            View other people template
          </Button>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
