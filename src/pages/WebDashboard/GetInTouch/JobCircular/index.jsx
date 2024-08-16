import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteSingleJobCircular,
  getAllJobCircular,
} from "../../../../services/webDashboard/getIntouch";
import Loader from "../../../../shared/Loader";
import Table from "../../../../shared/Table/Table";

const JobCircular = () => {
  const [jobCirculars, setJobCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const aboutUsQuery = useQuery("jobCirculars", () => getAllJobCircular(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteAboutsMutation = useMutation(deleteSingleJobCircular, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("jobCirculars");
      toast.success("job Circular Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Job title", key: "jobTitle" },
    { name: "Salary", key: "salary" },
    { name: "Experience", key: "experience" },
    { name: "Deadline", key: "deadline" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (aboutUsQuery.data?.data) {
      const tempData = aboutUsQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          jobTitle: item?.jobTitle,
          salary: item?.salary,
          experience: item?.experience,
          deadline: item?.deadline,
          publishedDate: item?.createdAt?.split("T")[0],
        };
      });

      setJobCirculars(tempData);
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
      <div>
        <button className="bg-secondary px-4 mb-5 text-xl py-2 rounded-md text-white">
          <Link to="/web/get-in-touch/job-circular/add">Add Job Circular</Link>
        </button>
      </div>
      <div className="w-[100%]">
        <Table
          title={"All Job Circular List"}
          headers={tableHeader}
          data={jobCirculars ?? []}
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

export default JobCircular;
