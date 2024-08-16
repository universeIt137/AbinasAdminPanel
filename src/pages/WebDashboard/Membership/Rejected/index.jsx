import { useEffect, useState } from "react";
import Table from "../../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteMemberShip,
  getMemberShip,
  updateMemberShipStatus,
} from "../../../../services/webDashboard/memberShip";
import Loader from "../../../../shared/Loader";
import { toast } from "react-toastify";

const RejectedMembership = () => {
  const [allPendingMembers, setAllPendingMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();
  const memberShipQuery = useQuery("meberships", () => getMemberShip(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  const updateStatusMutation = useMutation(updateMemberShipStatus, {
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries("meberships");
      toast.success("Membership Form Pending Success");
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    },
  });
  const deleteMemberShipMutation = useMutation(deleteMemberShip, {
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries("meberships");
      toast.success("Membership Form Deleted Success");
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (memberShipQuery.data?.data?.result) {
      const pendingData = memberShipQuery.data?.data?.result?.filter(
        (item) => item.status === "rejected"
      );
      const tempData = pendingData?.map((item, index) => {
        return {
          _id: item._id,
          memno: "1234",
          name: item.personalInformation?.name,
          phone: item.personalInformation?.phone,
          fathersName: item.personalInformation?.fathersName,
          mothersName: item.personalInformation?.mothersName,
          bnmcRegistrationNo: item.licensingAbility?.bnmcRegistrationNo,
          nidNumber: item.personalInformation?.nidNumber,
          status: item?.status,
        };
      });
      setAllPendingMembers(tempData);
      setLoading(false);
    }
  }, [memberShipQuery.data?.data?.result]);

  const tableHeader = [
    { name: "Mem ID", key: "memNo" },
    { name: "Name", key: "name" },
    { name: "Phone", key: "phone" },
    { name: "Father's Name", key: "fathersName" },
    { name: "Mother's Name", key: "mothersName" },
    { name: "BNMC R.No", key: "bnmcRegistrationNo" },
    { name: "NID Number", key: "nidNumber" },
    { name: "Status", key: "status" },
  ];

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      if (type === "delete") {
        await deleteMemberShipMutation.mutateAsync(id);
      } else {
        await updateStatusMutation.mutateAsync({ type, id });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleActionClick = async (type, id) => {
    let pendingData = allPendingMembers?.find((x) => x._id === id);
    switch (type) {
      case "approve":
        break;
      case "pending":
        await onHandleActions("pending", id);
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
          title={"Rejected Membership"}
          headers={tableHeader}
          data={allPendingMembers ?? []}
          Status={false}
          actions={true}
          actionName={"Actions"}
          handleActionClick={handleActionClick}
          actionValue={{ pending: true, delete: true }}
        />
      </div>
    </div>
  );
};
export default RejectedMembership;
