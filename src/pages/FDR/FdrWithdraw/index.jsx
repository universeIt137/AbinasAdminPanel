import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import MenuBar from "../../../shared/MenuBar";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { getAllDps } from "../../../services/webDashboard/dps";
import ReturnHistory from "./component/ReturnHistory";
import ReturnTable from "../../../shared/ReturnTable/ReturnTable";
import { getFdr } from "../../../services/webDashboard/fdr";

const FdrWithdraw = () => {
  const [loading, setLoading] = useState(false); // loading off
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDpsReturn, setSelectedDpsReturn] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  const dpsHistoryQuery = useQuery("depsHistory", () => getFdr(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (updateStatus) {
      dataLoad();
      setUpdateStatus(false);
    }
  }, [updateStatus]);

  const searchHandler = () => {
    const dpsHistory = dpsHistoryQuery.data?.data?.filter(
      (item) => item?.dpsNo === searchTerm
    );
    setSelectedDpsReturn(dpsHistory);
  };
  const handleTrack = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  const dataLoad = async () => {
    const allDps = await getAllDps();
    const dpsHistory = allDps?.data?.filter(
      (item) => item?.dpsNo === searchTerm
    );

    setSelectedDpsReturn(dpsHistory);
  };
  return (
    <div className="w-[90%] mx-auto mt-5">
      {loading && <Loader forProcess={true} />}
      {/* <div className=" flex my-5">
        <h1 className="text-2xl font-semibold mr-4">Search By FDR No</h1>
        <div className=" flex items-center border-2 rounded-md">
          <input
            type="text"
            className="outline-none pl-2 w-[300px]"
            placeholder="search by fdr id"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleTrack}
          />
          <Icon
            icon="tdesign:search"
            className="mx-2 cursor-pointer"
            onClick={searchHandler}
          />
        </div>
      </div> */}
      {selectedDpsReturn?.length > 0 && (
        <ReturnHistory
          selectedReturn={selectedDpsReturn}
          setUpdateStatus={setUpdateStatus}
        />
      )}
      <ReturnTable />
    </div>
  );
};

export default FdrWithdraw;
