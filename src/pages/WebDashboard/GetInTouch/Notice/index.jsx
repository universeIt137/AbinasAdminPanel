/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteSingleNotice,
  getAllNotice,
} from "../../../../services/webDashboard/getIntouch";
import Loader from "../../../../shared/Loader";
import Table from "../../../../shared/Table/Table";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const noticesQuery = useQuery("notice", () => getAllNotice(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteAboutsMutation = useMutation(deleteSingleNotice, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("notice");
      toast.success("Notice Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Notice title", key: "title" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (noticesQuery.data?.data) {
      const tempData = noticesQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          title: item?.title,
          publishedDate: item?.createdAt?.split("T")[0],
        };
      });

      setNotices(tempData);
      setLoading(false);
    }
  }, [noticesQuery.data?.data]);

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteAboutsMutation.mutateAsync(id);
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
        navigate(`/web/get-in-touch/notice/${id}`);
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
      <div>
        <button className="bg-secondary px-4 mb-5 text-xl py-2 rounded-md text-white">
          <Link to="/web/get-in-touch/notice/add">Add Notice</Link>
        </button>
      </div>
      <div className="w-[100%]">
        <Table
          title={"All Notice List"}
          headers={tableHeader}
          data={notices ?? []}
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

export default Notice;
