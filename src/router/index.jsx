import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Auth, Profile , BasicCreate , MainCreate , Generate , ResumeList} from "@pages";
import App from "../App";
import Layout from "../layout";

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Layout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/basic" element={<BasicCreate />} />
        <Route path="/main-create" element={<MainCreate/>}/>
        <Route path="/generate" element={<Generate/>}/>
        <Route path="/resume-list" element={<ResumeList/>}/>
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
