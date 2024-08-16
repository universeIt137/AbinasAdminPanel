import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Loader from "../../../../shared/Loader";
import { createMedia } from "../../../../services/webDashboard/media";

const EditMedia = () => {
  const [mediaImage, setMediaImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const createServiceMutation = useMutation(createMedia, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("media");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = new FormData();
      payload.append("mediaImage", mediaImage);
      await createServiceMutation.mutateAsync(payload);
      setMediaImage("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <h1 className="text-2xl font-semibold text-center ">Update Media</h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">Media Image : </h1>
              <input
                type="file"
                name="serviceImage"
                className="file-input file-input-bordered w-[80%]"
                // value={serviceImage}
                onChange={(e) => setMediaImage(e.target.files[0])}
              />
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
              setMediaImage(null);
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMedia;
