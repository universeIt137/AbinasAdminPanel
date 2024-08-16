/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import person1 from "../../images/user/person1.png";
{
  /* <Modal
          title={'Add item to Inventory'}
          subtitle={
            'Please enter the following information to add a new item to the inventory.'
          }
          setModal={setModal}
          body={
            <div className="h-[200px] flex items-center justify-center bg-gray bg-opacity-10 w-[100%]">
              <p>Replace your content here</p>
            </div>
          }
        /> */
}

const Modal = ({ title, setModal, width, body }) => {
  const styles = {
    modalWrapper:
      "fixed flex items-center   justify-center top-0 right-0 left-0 bottom-0 bg-black backdrop-blur-sm bg-opacity-10 z-[700]",
    modalCloseButton:
      "my-0 mx-0 bg-none hover:opacity-80 focus:opacity-80 active:opacity-80 text-black text-[16px] w-[130px] py-2 px-3 rounded-md flex justify-center items-center",
    modalButton:
      "my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 rounded-md flex justify-center items-center",
  };
  return (
    <div className={`${styles.modalWrapper} bg-black `}>
      <div
        className={`bg-primary max-h-[700px] overflow-y-auto relative px-2 pt-6 rounded-md ${
          width ? width : "w-[50%]" //Pass width = "w-[100%]"
        }`}
      >
        <div className="text-[14px]  cursor-pointer flex">
          {/* <Icon
            icon="ant-design:setting-filled"
            className="pb-2"
            fontSize={32}
            color={"black"}
          /> */}
          <h1 className="text-xl font-semibold">{title ?? ""}</h1>
        </div>
        <div
          className="text-[14px]  text-black absolute right-2  top-1  pt-2     cursor-pointer"
          onClick={() => setModal(false)}
        >
          <Icon
            icon="radix-icons:cross-2"
            className="pb-2"
            fontSize={34}
            color={"black"}
          />
        </div>

        <div className="bg-white">
          <div className="my-5">
            {body}
            {/* <img src={person1} alt="" /> */}
          </div>
        </div>

        {/* <div className="flex">
          <button className={styles.modalButton} onClick={() => setModal(true)}>
            Confirm
          </button>
          <button
            className={`${styles.modalCloseButton} ml-2`}
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
