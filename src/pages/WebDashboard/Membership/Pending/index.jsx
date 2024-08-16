/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Table from "../../../../shared/Table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getMemberShip,
  updateMemberShipStatus,
} from "../../../../services/webDashboard/memberShip";
import Loader from "../../../../shared/Loader";
import Modal from "../../../../shared/Modal";
import PendingModal from "./components/PendingModal";
import { toast } from "react-toastify";

const PendingMembership = () => {
  const [allPendingMembers, setAllPendingMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [selectedMemberShip, setSelectedMemberShip] = useState({});

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
      console.log(data);
      if (data.status === "approved") {
        toast.success("Membership Form approved Success");
      } else {
        toast.success("Membership Form Rejected Success");
      }
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
        (item) => item.status === "pending"
      );
      const tempData = pendingData?.map((item, index) => {
        return {
          _id: item._id,
          progressPercentage: item?.progressPercentage,
          memno: item?.memberId,
          name: item.personalInformation?.name,
          phone: item.personalInformation?.phone,
          fathersName: item.personalInformation?.fathersName,
          mothersName: item.personalInformation?.mothersName,
          nidNumber: item.personalInformation?.nidNumber,
          status: item?.status,
          progreess: item.progressPercentage,
        };
      });
      setAllPendingMembers(tempData);
      setLoading(false);
    }
  }, [memberShipQuery.data?.data?.result]);

  const tableHeader = [
    { name: "Mem ID", key: "memno" },
    { name: "Name", key: "name" },
    { name: "Phone", key: "phone" },
    { name: "Father's Name", key: "fathersName" },
    { name: "Mother's Name", key: "mothersName" },
    { name: "NID Number", key: "nidNumber" },
    { name: "Status", key: "status" },
    { name: "Progreess ", key: "progreess" },
  ];

  const onHandleActions = async (type, id) => {
    setLoading(true);
    try {
      await updateStatusMutation.mutateAsync({ type, id });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleActionClick = async (type, id) => {
    let pendingData = memberShipQuery.data?.data?.result?.find(
      (x) => x._id === id
    );
    switch (type) {
      case "edit":
        setSelectedMemberShip(pendingData);
        setShowPendingModal(true);
        break;
      case "approve":
        await onHandleActions("approved", id);
        break;
      case "pending":
        break;
      case "reject":
        onHandleActions("rejected", id);
        break;
      case "delete":
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
          title={"Pending Membership"}
          headers={tableHeader}
          data={allPendingMembers ?? []}
          Status={false}
          actions={true}
          actionName={"Action"}
          handleActionClick={handleActionClick}
          actionValue={{ edit: true, approve: true, reject: true }}
        />
      </div>
      {showPendingModal && (
        <Modal
          setModal={setShowPendingModal}
          width="w-[80%]"
          body={
            <PendingModal
              setModal={setShowPendingModal}
              viewOrEdit={"edit"}
              selectedMemberShip={selectedMemberShip}
            />
          }
        />
      )}
    </div>
  );
};

export default PendingMembership;
