import { Outlet } from "react-router-dom";
import { Header } from "@ui";

export default function index() {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  );
}
