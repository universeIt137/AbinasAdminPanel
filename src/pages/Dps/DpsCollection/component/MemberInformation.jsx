/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Modal from "../../../../shared/Modal";
import ImageModal from "../../../../shared/ImageModal";

const MemberInformation = ({ selectedMemberShip }) => {
  const [memberShipData, setMemberShipData] = useState({});
  const [showPhoto, setShowPhoto] = useState(false);
  const [showNid, setshowNid] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    if (selectedMemberShip) {
      setMemberShipData(selectedMemberShip);
    }
  }, [selectedMemberShip]);

  return (
    <div>
      {}
      <div className="w-[100%]">
        <div>
          <h1 className="bg-[#5daaf1] inline px-2 py-1 rounded-md text-white text-[18px]">
            Member Information
          </h1>
          <table className="my-2">
            <thead>
              <tr className="border">
                <th className="table-header-font border-2">Mem. ID</th>
                <th className="table-header-font border-2 px-1">Name</th>
                <th className="table-header-font border-2 px-1">
                  Father’s Name
                </th>
                <th className="table-header-font border-2 px-1">
                  Mother’s Name
                </th>
                <th className="table-header-font border-2 px-1">DOB</th>
                <th className="table-header-font border-2 px-1">Designation</th>
                <th className="table-header-font border-2 px-1">
                  Organization Name
                </th>
                <th className="table-header-font border-2 px-1">NID No</th>
                <th className="table-header-font border-2 px-1">Mobile No</th>
                <th className="table-header-font border-2 px-1">
                  Present Address
                </th>
                <th className="table-header-font border-2 px-1">
                  License Ability
                </th>
                <th className="table-header-font border-2 px-1">
                  Familiar Colleagues name
                </th>
                <th className="table-header-font border-2 px-1">
                  Colleagues Number
                </th>
                <th className="table-header-font border-2 px-1">
                  Husband/Wife Mobile No
                </th>
                <th className="table-header-font border-2 px-1">
                  Father/Brother Mobile No
                </th>
                <th className="table-header-font border-2 px-1">
                  Marital status
                </th>
                <th className="table-header-font border-2 px-1">Photo</th>
                <th className="table-header-font border-2 px-1">NID</th>
                <th className="table-header-font border-2 px-1">Signature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.memberId}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.name}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.fathersName}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.mothersName}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.dob?.split("T")[0]}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.jobDescription?.designation}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.jobDescription?.organization}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.nidNumber}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.phone}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.address?.prsentaddress?.village}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.licensingAbility?.bnmcRegistrationNo}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.jobDescription?.familiarColleaguesName1}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.jobDescription?.familiarColleaguesNumber1}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.familyInformation?.husbandOrWifesPhoneNo}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {
                    memberShipData?.familyInformation
                      ?.FatherOrBrotherOrSistersPhoneNo
                  }
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  {memberShipData?.personalInformation?.maritalStatus}
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  <Icon
                    icon="uil:down-arrow"
                    width="30"
                    className="cursor-pointer"
                    onClick={() => setShowPhoto(true)}
                  />
                </td>
                <td className="table-data-font border-2 px-1 text-center">
                  <Icon
                    icon="uil:down-arrow"
                    width="30"
                    className="cursor-pointer"
                    onClick={() => setshowNid(true)}
                  />
                </td>
                <td className="border-2 px-1 text-center">
                  <Icon
                    icon="uil:down-arrow"
                    width="30"
                    className="cursor-pointer"
                    onClick={() => setShowSignature(true)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Nominee Information section */}

        <div className="w-[100%]">
          <h1 className="bg-[#5daaf1] inline px-2 py-1 rounded-md text-white text-[18px]">
            Nominee Information
          </h1>
          <table className="my-2">
            <thead>
              <tr className="border">
                <th className="table-header-font border-2">Nominee Name</th>
                <th className="table-header-font border-2 px-1">
                  Relationship
                </th>
                <th className="table-header-font border-2 px-1">Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-data-font border-2 px-1 text-center w-[200px]">
                  {
                    memberShipData?.nomineeInformation?.nomineeInformation01
                      ?.nomineeInformationName
                  }
                </td>
                <td className="table-data-font border-2 px-1 text-center w-[200px]">
                  {
                    memberShipData?.nomineeInformation?.nomineeInformation01
                      ?.nomineeInformationRelation
                  }
                </td>
                <td className="table-data-font border-2 px-1 text-center w-[200px]">
                  {
                    memberShipData?.nomineeInformation?.nomineeInformation01
                      ?.nomineeInformationNumber
                  }
                </td>
              </tr>
              <tr>
                <td className="table-data-font border-2 px-1 text-center w-[200px]">
                  {
                    memberShipData?.nomineeInformation?.nomineeInformation02
                      ?.nomineeInformationName
                  }
                </td>
                <td className="table-data-font border-2 px-1 text-center w-[200px]">
                  {
                    memberShipData?.nomineeInformation?.nomineeInformation02
                      ?.nomineeInformationRelation
                  }
                </td>
                <td className="table-data-font border-2 px-1 text-center w-[200px]">
                  {
                    memberShipData?.nomineeInformation?.nomineeInformation02
                      ?.nomineeInformationNumber
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {showPhoto && (
          <ImageModal
            image={memberShipData?.personalInformation?.applicantPhoto}
            setModal={setShowPhoto}
          />
        )}
        {showNid && (
          <ImageModal
            image={memberShipData?.personalInformation?.nidCopy}
            setModal={setshowNid}
          />
        )}
        {showSignature && (
          <ImageModal
            image={memberShipData?.personalInformation?.signature}
            setModal={setShowSignature}
          />
        )}
      </div>
    </div>
  );
};

export default MemberInformation;
