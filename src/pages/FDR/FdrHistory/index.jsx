/* eslint-disable no-unused-vars */
import { Icon } from "@iconify/react";
import MenuBar from "../../../shared/MenuBar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { dpsStatusChange, getAllDps } from "../../../services/webDashboard/dps";
import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import { toast } from "react-toastify";

const FdrHistory = () => {
  const [loading, setLoading] = useState(false); //loading off. if use loading just initial value true
  const [allDpsHistory, setAllDpsHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();
  const dpsHistoryQuery = useQuery("depsHistory", () => getAllDps(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const dpsStatusChangeMutation = useMutation(dpsStatusChange, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("depsHistory");
      toast.success("Dps Status Change");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (dpsHistoryQuery.data?.data) {
      setAllDpsHistory(dpsHistoryQuery.data?.data);
      setLoading(false);
    }
  }, [dpsHistoryQuery.data?.data]);

  const filteredItems = allDpsHistory?.filter((item) => {
    const isNameMatch =
      !searchTerm ||
      item?.userId?.personalInformation?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return isNameMatch;
  });

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const dpsStatusHandler = async (id, data) => {
    setLoading(true);
    try {
      const tempData = {
        id,
        dpsStatus: data,
      };
      console.log(tempData);
      await dpsStatusChangeMutation.mutateAsync(tempData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-5">
      {loading && <Loader forProcess={true} />}
      <div className="flex justify-between">
        <h1 className="text-2xl mx-2 font-semibold">FDR History</h1>
        <div className="mr-3 ">
          <input
            type="text"
            placeholder="search by name"
            className="outline outline-secondary px-2 py-1 rounded-md"
            onChange={searchHandler}
          />
        </div>
      </div>

      <div className="bg-white p-2 rounded-sm">
        <div className="overflow-x-auto ">
          <table className="w-[100%]">
            {/* head */}
            <thead>
              <tr className="">
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  SL No
                </th>
                <th
                  className=" bg-customBase border-2 border-white  px-4 py-2 table-header-font w-[50px]"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  FDR No
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Member ID
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Name
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Mobile
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Duration
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white  px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Last Date
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Inst. Rate
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Total Inst. No
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Monthly Inst.
                </th>

                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Principle Amount
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Mature Amount
                </th>
                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Status
                </th>
                {/* <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Actions
                </th> */}

                <th
                  className="w-[20px] bg-customBase border-2 border-white px-4 py-2 table-header-font"
                  style={{ whiteSpace: "nowrap", wordBreak: "keep-all" }}
                >
                  Print
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-customBase" : "bg-[#D8DFE5] "
                  } `}
                >
                  <td className="h-[30px] border-2 text-base font-normal border-white p-0 m-0 table-data-font">
                    {index + 1}
                  </td>
                  <td className="border-2 border-white font-normal table-data-font">
                    {item?.dpsNo}
                  </td>
                  <td className="border-2 border-white font-normal table-data-font">
                    {item?.memberID}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.userId?.personalInformation?.name}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.userId?.personalInformation?.phone}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.duration}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.lastPayDate?.split("T")[0]}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.interestRate}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.noOfInstallment}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.monthlyInstAmount}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.principleAmount}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.matureAmount}
                  </td>
                  <td className="border-2 border-white text-base font-normal table-data-font">
                    {item?.dpsStatus}
                  </td>
                  {/* <td className=" flex justify-between items-center font-normal table-data-font px-2 ">
                    {item?.dpsStatus === "active" ? (
                      <>
                        <button data-tip="Pending">
                          <Icon
                            icon="gala:remove"
                            width={25}
                            className="bg-green-600 text-white rounded my-2 mx-1 cursor-pointer "
                            onClick={() =>
                              dpsStatusHandler(item?._id, "deactivate")
                            }
                          />
                        </button>
                        <Icon
                          icon="ic:round-close"
                          width={25}
                          className="bg-red-500 text-white rounded my-2 mx-1 cursor-pointer"
                          data-tip="Closed"
                          onClick={() => dpsStatusHandler(item?._id, "closed")}
                        />
                      </>
                    ) : item?.dpsStatus === "closed" ? (
                      <></>
                    ) : (
                      <>
                        <Icon
                          icon="charm:square-tick"
                          width={25}
                          className="bg-green-600 text-white rounded my-2 mx-1 cursor-pointer"
                          data-tip="Active"
                          onClick={() => dpsStatusHandler(item?._id, "active")}
                        />
                        <Icon
                          icon="ic:round-close"
                          width={25}
                          className="bg-red-500 text-white rounded my-2 mx-1 cursor-pointer"
                          data-tip="Closed"
                          onClick={() => dpsStatusHandler(item?._id, "closed")}
                        />
                      </>
                    )}
                  </td> */}

                  <td className=" text-white rounded-md border-2 border-white font-normal table-data-font">
                    <Icon
                      icon="material-symbols:print"
                      width={30}
                      color="black"
                      className="cursor-pointer w-[30px] mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FdrHistory;
