/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Table from "../../../../shared/Table/Table";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteMemberShip,
  getMemberShip,
  updateMemberShipStatus,
} from "../../../../services/webDashboard/memberShip";
import Loader from "../../../../shared/Loader";
import { toast } from "react-toastify";
import Modal from "../../../../shared/Modal";
import PendingModal from "../Pending/components/PendingModal";

const ApprovedMembership = () => {
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
      toast.success("Membership Form Rejected Success");
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
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
      const approvedData = memberShipQuery.data?.data?.result?.filter(
        (item) => item.status === "approved"
      );
      const tempData = approvedData?.map((item, index) => {
        return {
          _id: item._id,
          memno: item?.memberId,
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
    { name: "Mem ID", key: "memno" },
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
      console.log(error);
      setLoading(false);
    }
  };
  const handleActionClick = async (type, id) => {
    let approvedlist = memberShipQuery.data?.data?.result?.find(
      (x) => x._id === id
    );
    console.log(approvedlist);
    switch (type) {
      case "edit":
        setSelectedMemberShip(approvedlist);
        setShowPendingModal(true);
        break;
      case "approve":
        break;
      case "reject":
        await onHandleActions("rejected", id);
        break;
      case "pending":
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
          title={"Approved Membership"}
          headers={tableHeader}
          data={allPendingMembers ?? []}
          Status={false}
          actions={true}
          actionName={"Actions"}
          handleActionClick={handleActionClick}
          actionValue={{ edit: true, reject: true, delete: true }}
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

export default ApprovedMembership;
