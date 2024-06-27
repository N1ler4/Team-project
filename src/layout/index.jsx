import { Header } from "@ui";
import Basic from "../assets/basic.png";
import Classic from "../assets/classic.png";
import Simple from "../assets/simple.png";
import { saveDataToCookie } from "@token-service";
import { useNavigate } from "react-router-dom";

export default function index() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="grid justify-center items-center container mx-auto px-10">
        <h1 className="text-center mt-[100px] mb-[25px] text-[32px]">
          Create a new template
        </h1>
        <div className="flex gap-[10px]">
          <div
            className="w-[400px] cursor-pointer h-[600px] bg-white"
            onClick={() => (saveDataToCookie("type", "basic") , navigate("/basic"))}
          >
            <img src={Basic} alt="" className="w-full h-full" />
          </div>
          <div
            className="w-[400px] cursor-pointer h-[600px] bg-white"
            onClick={() => (saveDataToCookie("type", "classic") , navigate("/basic"))}
          >
            <img src={Classic} alt="" className="w-full h-full" />
          </div>
          <div
            className="w-[400px] cursor-pointer h-[600px] bg-white"
            onClick={() => (saveDataToCookie("type", "simple") , navigate("/basic"))}
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
