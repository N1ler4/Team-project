import { Header } from "@ui";
import Basic from "../assets/basic.png";
import Classic from "../assets/classic.png";
import Simple from "../assets/simple.png";
import { saveDataToCookie, getDataFromCookie } from "@token-service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

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
    <>
      <Header />
      <div className="grid justify-center items-center container mx-auto px-10">
        <h1 className="text-center mt-[100px] mb-[25px] text-[32px]">
          Choose a new template
        </h1>
        <div className="flex gap-[10px]">
          <div
            className="w-[400px] cursor-pointer h-[600px] bg-white"
            onClick={() => (
              saveDataToCookie("type", "basic"),
              isAuthenticated ? navigate("/basic") : navigate("/auth")
            )}
          >
            <img src={Basic} alt="" className="w-full h-full" />
          </div>
          <div
            className="w-[400px] cursor-pointer h-[600px] bg-white"
            onClick={() => (
              saveDataToCookie("type", "classic"),
              isAuthenticated ? navigate("/basic") : navigate("/auth")
            )}
          >
            <img src={Classic} alt="" className="w-full h-full" />
          </div>
          <div
            className="w-[400px] cursor-pointer h-[600px] bg-white"
            onClick={() => (
              saveDataToCookie("type", "simple"),
              isAuthenticated ? navigate("/basic") : navigate("/auth")
            )}
          >
            <img src={Simple} alt="" className="w-full h-full" />
          </div>
        </div>
        {/* <div> 
          <h1>Your Template</h1>
        </div> */}
      </div>
    </>
  );
}
