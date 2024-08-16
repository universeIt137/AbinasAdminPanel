import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Loader from "../../../../shared/Loader";
import { createNews } from "../../../../services/webDashboard/news";

const EditJobCircular = () => {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [newsImage, setNewsImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const createNewsMutation = useMutation(createNews, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("news");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const handleInputChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "keyword") {
      setKeyword(e.target.value);
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

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
      const newNews = {
        title,
        keyword,
        newsImage,
        description,
      };
      const payload = generatePayload(newNews);
      await createNewsMutation.mutateAsync(payload);
      setTitle("");
      setKeyword("");
      setNewsImage("");
      setDescription("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <h1 className="text-2xl font-semibold text-center ">Update News</h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                News Title :
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </h1>
              <input
                type="text"
                name="title"
                placeholder="type news title"
                className="input input-bordered w-[80%]"
                value={title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                News Keyword : &nbsp;&nbsp;&nbsp;
              </h1>
              <input
                type="text"
                name="keyword"
                placeholder="type news keyword"
                className="input input-bordered w-[80%]"
                value={keyword}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                News Image : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </h1>
              <input
                type="file"
                name="newsImage"
                className="file-input file-input-bordered w-[80%]"
                // value={serviceImage}
                onChange={(e) => setNewsImage(e.target.files[0])}
              />
            </div>

            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">
                News Description :
              </h1>
              <textarea
                className="textarea textarea-bordered w-[80%] h-[150px]"
                name="description"
                placeholder="type your service all description here"
                value={description}
                onChange={handleInputChange}
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
              setKeyword("");
              setNewsImage("");
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

export default EditJobCircular;
