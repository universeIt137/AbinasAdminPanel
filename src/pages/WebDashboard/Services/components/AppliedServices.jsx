import { useEffect, useState } from "react";
import Loader from "../../../../shared/Loader";
import Table from "../../../../shared/Table/Table";
import { useQuery, useQueryClient } from "react-query";
import { getAllAppliedServices } from "../../../../services/webDashboard/service";

const AppliedServices = () => {
  const [appliedServices, setAppliedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const appliedServiceQuery = useQuery(
    "appliedService",
    () => getAllAppliedServices(),
    {
      cacheTime: 0,
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );
  const tableHeader = [
    { name: "User Name", key: "userName" },
    { name: "Service Name", key: "serviceName" },
    { name: "User Phone No.", key: "phone" },
    { name: "Date", key: "date" },
    { name: "Status", key: "status" },
  ];

  useEffect(() => {
    if (appliedServiceQuery.data?.data) {
      const tempData = appliedServiceQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          userName: item?.userName,
          serviceName: item?.serviceName,
          phone: item?.userPhone,
          date: item.createdAt.split("T")[0],
          status: item.status,
        };
      });

      setAppliedServices(tempData);
      setLoading(false);
    }
  }, [appliedServiceQuery.data?.data]);
  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div></div>
      <div className="w-[100%]">
        <Table
          title={"All Applied Service List"}
          headers={tableHeader}
          data={appliedServices ?? []}
          Status={false}
          actions={true}
        />
      </div>
    </div>
  );
};

export default AppliedServices;
