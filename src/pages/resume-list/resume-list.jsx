import { Header } from "@ui";
import useCreateStore from "../../store/create";
import { useEffect, useState } from "react";
import { GlobalTable } from "@ui";
export default function resumeList() {
  const [data, setData] = useState([]);

  const { getAllResume } = useCreateStore();

  const getData = async () => {
    const res = await getAllResume();
    if (res.status === 200) {
      setData(res.data.resumes);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-10">
        <h1 className="text-[40px] text-center mt-10 mb-10">
          The list of each resume
        </h1>
        <GlobalTable data={data} />
      </div>
    </>
  );
}
