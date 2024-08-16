import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "react-query";
import { getAllDps } from "../../services/webDashboard/dps";
import SearchField from "./components/SearchField";
// import ReturnHistory from "./component/ReturnHistory";

const ReturnTable = () => {
  const [loading, setLoading] = useState(false); // loading off
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDpsReturn, setSelectedDpsReturn] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  const dpsHistoryQuery = useQuery("depsHistory", () => getAllDps(), {
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
      <SearchField
        setSearchTerm={setSearchTerm}
        handleTrack={handleTrack}
        searchHandler={searchHandler}
        searchName={"FDR"}
      />
      {/* {selectedDpsReturn?.length > 0 && (
        <ReturnHistory
          selectedReturn={selectedDpsReturn}
          setUpdateStatus={setUpdateStatus}
        />
      )} */}
    </div>
  );
};

export default ReturnTable;
