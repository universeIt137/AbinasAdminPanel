/* eslint-disable react-hooks/rules-of-hooks */
import Table from "../../../../shared/Table/Table";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMemberShip } from "../../../../services/webDashboard/memberShip";
import MemberInformation from "../../../Dps/DpsOpeningForm/components/MemberInformation";

import Loader from "../../../../shared/Loader";
import DpsUpdate from "../../../Dps/DpsOpeningForm/components/DpsUpdate";
import MenuBar from "../../../../shared/MenuBar";
import SingleSchemeOpeningForm from "./components/SingleSchemeOpeningForm";
import { approveFdrForm, getFdr } from "../../../../services/webDashboard/fdr";
import Modal from "../../../../shared/Modal";
import FdrUpdate from "./components/FdrUpdate";

const tableHeader = [
  { name: "FDR NO", key: "fdrNo" },
  { name: "Opening Date", key: "openingDate" },
  { name: "Member ID", key: "memberID" },
  { name: "Duration", key: "duration" },
  { name: "Inst Rate", key: "interestRate" },
  { name: "Principle Amount", key: "principleAmount" },
  { name: "Mature Amount", key: "matureAmount" },
];

const FdrSingleScheme = () => {
  const [loading, setLoading] = useState(false); // loding work for start
  const [allMembership, setAllMembership] = useState([]);
  const [selectedMemberShip, setSelectedMemberShip] = useState([]);
  const [allUnapprovedDps, setAllUnapprovedDps] = useState([]);
  const [allapprovedDps, setAllapprovedDps] = useState([]);
  const [paymentHistorys, setPaymentHistorys] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState();
  const [showFdrUpdate, setShowFdrUpdate] = useState(false);
  const [selectedFdrUpdate, setselectedFdrUpdate] = useState({});

  const queryClient = useQueryClient();
  const memberShipQuery = useQuery("meberships", () => getMemberShip(), {
    cacheTime: 0,
    staleTime: Infinity,
    refetchOnMount: true,
  });
  const unapproveQuery = useQuery(
    "fdrForm",
    () => getFdr("pending", "single"),
    {
      cacheTime: 0,
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );
  const approvedQuery = useQuery(
    "fdrFormapproved",
    () => getFdr("approved", "single"),
    {
      cacheTime: 0,
      staleTime: Infinity,
      refetchOnMount: true,
    }
  );
  const approveFdrFromMutation = useMutation(approveFdrForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("fdrForm");
      queryClient.invalidateQueries("fdrFormapproved");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (memberShipQuery.data?.data) {
      const approvedData = memberShipQuery.data?.data?.result?.filter(
        (item) => item.status === "approved"
      );
      setAllMembership(approvedData);
      // setAllMembership(memberShipQuery.data?.data?.result);
    }
  }, [memberShipQuery.data?.data]);

  useEffect(() => {
    if (unapproveQuery.data?.data) {
      console.log(unapproveQuery.data?.data);
      const tempData = unapproveQuery.data?.data?.map((item, index) => {
        console.log(item?.perInterestPayment);
        return {
          _id: item._id,
          fdrNo: item?.fdrNo,
          openingDate: item?.openingDate?.split("T")[0],
          memberID: item?.memberID,
          duration: item?.duration,
          interestCollectionDuration: item?.interestCollectionDuration,
          interestRate: item?.interestRate,
          vat: item?.vat,
          paymentMethod: item?.paymentMethod,
          principleAmount: item?.principleAmount,
          matureAmount: item?.matureAmount,
          naration: item?.naration,
          trnxIDCheckNoOthers: item?.trnxIDCheckNoOthers,
          schemeCondition: item?.schemeCondition,
          perInterestPayment: item?.perInterestPayment,
          narration: item?.narration,
        };
      });

      setAllUnapprovedDps(tempData);
      setLoading(false);
    }
  }, [unapproveQuery.data?.data]);

  useEffect(() => {
    if (approvedQuery.data?.data) {
      const tempData = approvedQuery.data?.data?.map((item, index) => {
        return {
          id: item._id,
          fdrNo: item?.fdrNo,
          openingDate: item?.openingDate?.split("T")[0],
          memberID: item?.memberID,
          duration: item?.duration,
          interestRate: item?.interestRate,
          noOfInstallment: item?.noOfInstallment,
          monthlyInstAmount: item?.monthlyInstAmount,
          principleAmount: item?.principleAmount,
          matureAmount: item?.matureAmount,
          paymentHistory: item?.paymentHistory,
          naration: item?.naration,
          lastPayDate: item?.lastPayDate,
        };
      });
      setAllapprovedDps(tempData);
      setLoading(false);
    }
  }, [approvedQuery.data?.data]);

  useEffect(() => {
    const filtaredItem = allapprovedDps?.filter(
      (item) => item?._id === selectedPaymentId
    );
    const tempData = filtaredItem[0]?.paymentHistory?.map((item, index) => {
      return {
        _id: item._id,
        dpsNo: filtaredItem[0]?.dpsNo,
        memberId: filtaredItem[0]?.memberID,
        installmentAmount: item?.monthlyInstAmount,
        installmentDate: item?.lastDate,
      };
    });

    setPaymentHistorys(tempData);
  }, [selectedPaymentId]);

  const onHandleActions = async (id) => {
    setLoading(true);
    try {
      await approveFdrFromMutation.mutateAsync(id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleActionClick = async (type, id) => {
    console.log(type, id);
    const selectedDps = allUnapprovedDps?.filter((item) => item._id === id);
    const result = allMembership?.filter(
      (item) => item.memberId === selectedDps[0]?.memberID
    );
    // console.log(selectedDps);
    setSelectedMemberShip(result);
    switch (type) {
      case "click":
        setSelectedPaymentId(id);
        break;
      case "approve":
        await onHandleActions(id);
        break;
      case "edit":
        console.log(selectedDps);
        setselectedFdrUpdate(selectedDps?.[0]);
        setShowFdrUpdate(true);
        break;
      case "reject":
        break;
      case "pending":
        break;
      case "delete":
        break;
      default:
        break;
    }
  };
  return (
    <div className="w-[90%] mx-auto mt-5">
      {loading && <Loader forProcess={true} />}
      {selectedMemberShip.length > 0 && (
        <MemberInformation selectedMemberShip={selectedMemberShip} />
      )}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-2 max-h-[380px] bg-primary rounded-md ">
          <SingleSchemeOpeningForm
            allMembership={allMembership}
            setSelectedMemberShip={setSelectedMemberShip}
          />
        </div>

        <div className="h-[350px] bg-primary rounded-md overflow-y-scroll">
          <Table
            title={"Unapproved List"}
            headers={tableHeader}
            data={allUnapprovedDps ?? []}
            Status={false}
            actions={true}
            actionName={"Status"}
            handleActionClick={handleActionClick}
            actionValue={{ approve: true, edit: true }}
          />
        </div>
        <div className="h-[350px] bg-primary rounded-md overflow-y-scroll">
          <Table
            title={"Approved List"}
            headers={tableHeader}
            data={allapprovedDps ?? []}
            Status={false}
            actions={false}
            // actionName={"View"}
            // actionValue={{ edit: true }}
            handleActionClick={handleActionClick}
          />
        </div>
      </div>
      {showFdrUpdate && (
        <FdrUpdate
          selectedFdrUpdate={selectedFdrUpdate}
          showFdrUpdate={showFdrUpdate}
          setShowFdrUpdate={setShowFdrUpdate}
        />
      )}
    </div>
  );
};

export default FdrSingleScheme;
