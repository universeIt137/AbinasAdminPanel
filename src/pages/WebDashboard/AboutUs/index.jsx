import { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import Table from "../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  deleteSingleAboutUs,
  getAllAboutUs,
} from "../../../services/webDashboard/aboutUs";

const AboutUs = () => {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const aboutUsQuery = useQuery("abouts", () => getAllAboutUs(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteAboutsMutation = useMutation(deleteSingleAboutUs, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("abouts");
      toast.success("About Us Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Name", key: "name" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (aboutUsQuery.data?.data) {
      const tempData = aboutUsQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          name: item?.name,
          publishedDate: item?.createdAt?.split("T")[0],
        };
      });

      setAbouts(tempData);
      setLoading(false);
    }
  }, [aboutUsQuery.data?.data]);

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
          title={"All About Us List"}
          headers={tableHeader}
          data={abouts ?? []}
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

export default AboutUs;
