import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import Table from "../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteSingleService,
  getAllServices,
} from "../../../services/webDashboard/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const servicessQuery = useQuery("services", () => getAllServices(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteServiceMutation = useMutation(deleteSingleService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("services");
      toast.success("service Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Service Name", key: "serviceName" },
    { name: "Service Title", key: "title" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (servicessQuery.data?.data) {
      const tempData = servicessQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          serviceName: item?.serviceName,
          title: item?.title,
          publishedDate: item.createdAt?.split("T")[0],
        };
      });

      setServices(tempData);
      setLoading(false);
    }
  }, [servicessQuery.data?.data]);

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteServiceMutation.mutateAsync(id);
      } else {
        // await updateStatusMutation.mutateAsync({ type, id });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleActionClick = async (type, id) => {
    switch (type) {
      case "edit":
        setViewOrEdit("edit");
        navigate(`/web/service/${id}`);
        break;
      case "approve":
        break;
      case "reject":
        break;
      case "delete":
        await onHandleActions("delete", id);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div></div>
      <div className="w-[100%]">
        <Table
          title={"All Service List"}
          headers={tableHeader}
          data={services ?? []}
          Status={false}
          actions={true}
          actionName={"Actions"}
          handleActionClick={handleActionClick}
          actionValue={{ edit: true, delete: true }}
        />
      </div>
    </div>
  );
};

export default Services;
