import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createNotice } from "../../../../../services/webDashboard/getIntouch";
import Loader from "../../../../../shared/Loader";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noticeImage, setNoticeImage] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createNoticeMutation = useMutation(createNotice, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("notice");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });
  const generatePayload = (values) => {
    let payload = new FormData();
    for (var key in values) {
      payload.append(key, values[key]);
    }
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newJobCircular = {
        title,
        description,
        noticeImage,
      };
      const payload = generatePayload(newJobCircular);
      await createNoticeMutation.mutateAsync(payload);
      setTitle("");
      setDescription("");
      setNoticeImage("");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <Icon
        icon="ph:arrow-left-bold"
        width={30}
        className="cursor-pointer"
        onClick={() => navigate("/web/get-in-touch/notice")}
      />
      <h1 className="text-2xl font-semibold text-center ">Add a New Notice</h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Title
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type title"
                className="input input-bordered w-[80%]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">Notice Image :</h1>
              <input
                type="file"
                name="name"
                placeholder="type salary"
                className="file-input file-input-bordered w-[80%]"
                onChange={(e) => setNoticeImage(e.target.files[0])}
              />
            </div>

            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">
                Description &nbsp;&nbsp;&nbsp;:
              </h1>
              <textarea
                className="textarea textarea-bordered w-[80%] h-[150px]"
                name="description"
                placeholder="type your  description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            className="btn capitalize  bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 mt-5 ml-10"
            type="submit"
          >
            Submit
          </button>
          <button
            className="btn capitalize  bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 ml-2"
            type="reset"
            onClick={() => {
              setTitle("");
              setDescription("");
              setNoticeImage("");
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
