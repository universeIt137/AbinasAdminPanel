import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import Table from "../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteSingleConcern,
  getAllConcern,
} from "../../../services/webDashboard/ourConcern";

const OurConcern = () => {
  const [ourConcers, setOurConcers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const concernQuery = useQuery("ourConcern", () => getAllConcern(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteConcernMutation = useMutation(deleteSingleConcern, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("ourConcern");
      toast.success("Our Concern Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Name", key: "name" },
    { name: "Location", key: "location" },
    { name: "Phone", key: "phone" },
    { name: "Email", key: "email" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (concernQuery.data?.data) {
      const tempData = concernQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          name: item?.name,
          location: item?.location,
          phone: item?.contact?.phone,
          email: item?.contact?.email,
          publishedDate: item?.createdAt?.split("T")[0],
        };
      });

      setOurConcers(tempData);
      setLoading(false);
    }
  }, [concernQuery.data?.data]);

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteConcernMutation.mutateAsync(id);
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
        navigate(`/web/concern/${id}`);
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
          title={"All Our Concern List"}
          headers={tableHeader}
          data={ourConcers ?? []}
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

export default OurConcern;
