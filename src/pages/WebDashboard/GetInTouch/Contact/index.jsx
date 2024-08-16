import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteSingleContactUs,
  getAllContactUs,
} from "../../../../services/webDashboard/getIntouch";
import Loader from "../../../../shared/Loader";
import Table from "../../../../shared/Table/Table";

const ContactUs = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrEdit, setViewOrEdit] = useState("none");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const contactUsQuery = useQuery("contactUs", () => getAllContactUs(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const deleteContactUsMutation = useMutation(deleteSingleContactUs, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("contactUs");
      toast.success("Contact Us Deleted Success");
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
    },
  });
  const tableHeader = [
    { name: "Name", key: "name" },
    { name: "Mobile", key: "mobile" },
    { name: "Email", key: "email" },
    { name: "City", key: "city" },
    { name: "published Date", key: "publishedDate" },
  ];

  useEffect(() => {
    if (contactUsQuery.data?.data) {
      const tempData = contactUsQuery.data?.data?.map((item) => {
        return {
          _id: item._id,
          name: item?.name,
          mobile: item?.mobile,
          email: item?.email,
          city: item?.city,
          publishedDate: item?.createdAt?.split("T")[0],
        };
      });

      setAllContacts(tempData);
      setLoading(false);
    }
  }, [contactUsQuery.data?.data]);

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteContactUsMutation.mutateAsync(id);
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

      <div className="w-[100%]">
        <Table
          title={"All Contact Us List"}
          headers={tableHeader}
          data={allContacts ?? []}
          Status={false}
          actions={true}
          actionName={"Actions"}
          handleActionClick={handleActionClick}
          actionValue={{ delete: true }}
        />
      </div>
    </div>
  );
};

export default ContactUs;
