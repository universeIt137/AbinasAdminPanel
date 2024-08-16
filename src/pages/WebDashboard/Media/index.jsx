import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import Table from "../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteMediaNews,
  getAllMedia,
} from "../../../services/webDashboard/media";

const Media = () => {
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mediaQuery = useQuery("media", () => getAllMedia(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteMediaMutation = useMutation(deleteMediaNews, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("media");
      toast.success("media Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Media", key: "media" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (mediaQuery.data?.data) {
      const tempData = mediaQuery.data?.data?.map((item, index) => {
        return {
          _id: item._id,
          media: `Media ${index + 1}`,
          publishedDate: item.createdAt.split("T")[0],
        };
      });

      setAllMedia(tempData);
      setLoading(false);
    }
  }, [mediaQuery.data?.data]);

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteMediaMutation.mutateAsync(id);
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
        navigate(`/web/media/${id}`);
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
          title={"All Media List"}
          headers={tableHeader}
          data={allMedia ?? []}
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

export default Media;
