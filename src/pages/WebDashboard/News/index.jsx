import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import Table from "../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteSingleNews,
  getAllNews,
} from "../../../services/webDashboard/news";

const News = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const newsQuery = useQuery("news", () => getAllNews(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteNewsMutation = useMutation(deleteSingleNews, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("news");
      toast.success("news Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "News Title", key: "title" },
    { name: "News Keyword", key: "keyword" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (newsQuery.data?.data) {
      const tempData = newsQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          title: item?.title,
          keyword: item?.keyword,
          publishedDate: item.createdAt.split("T")[0],
        };
      });

      setServices(tempData);
      setLoading(false);
    }
  }, [newsQuery.data?.data]);

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteNewsMutation.mutateAsync(id);
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
        navigate(`/web/news/${id}`);
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
          title={"All News List"}
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

export default News;
