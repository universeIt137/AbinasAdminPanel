/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

const ImageModal = ({ image, setModal, width }) => {
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
        <div className="flex text-[14px]  text-black absolute right-2  top-1  pt-2     cursor-pointer">
          <Icon
            icon="lucide:download"
            fontSize={25}
            color={"black"}
            className="mr-4"
          />
          <Icon
            icon="radix-icons:cross-2"
            className="pb-2"
            fontSize={34}
            color={"black"}
            onClick={() => setModal(false)}
          />
        </div>

        <div className="bg-white">
          <div className="my-5">
            <img src={image} alt="" className="h-[300px] mx-auto py-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
