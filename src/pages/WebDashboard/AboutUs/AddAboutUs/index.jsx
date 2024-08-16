import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Loader from "../../../../shared/Loader";
import { createNews } from "../../../../services/webDashboard/news";
import { createAboutUs } from "../../../../services/webDashboard/aboutUs";

const AddAboutUs = () => {
  const [name, setName] = useState("");
  const [aboutImage, setAboutImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const createAboutMutation = useMutation(createAboutUs, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("abouts");
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
      const newAbout = {
        name,
        aboutImage,
        description,
      };
      const payload = generatePayload(newAbout);
      await createAboutMutation.mutateAsync(payload);
      setName("");
      setAboutImage(null);
      setDescription("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <h1 className="text-2xl font-semibold text-center ">Add a About Us</h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Name
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; :
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type about Name"
                className="input input-bordered w-[80%]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                About Image &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
              </h1>
              <input
                type="file"
                name="newsImage"
                className="file-input file-input-bordered w-[80%]"
                // value={serviceImage}
                onChange={(e) => setAboutImage(e.target.files[0])}
              />
            </div>

            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">
                About Description :
              </h1>
              <textarea
                className="textarea textarea-bordered w-[80%] h-[150px]"
                name="description"
                placeholder="type your service all description here"
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
              setName("");
              setAboutImage(null);
              setDescription("");
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAboutUs;
