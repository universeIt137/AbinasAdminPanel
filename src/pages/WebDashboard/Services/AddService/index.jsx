import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createService } from "../../../../services/webDashboard/service";
import Loader from "../../../../shared/Loader";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceImage, setServiceImage] = useState(null);
  const [features, setFeatures] = useState("");
  const [keyFeatures, setKeyFeatures] = useState([]);
  const [note, setNote] = useState("");
  const [noteList, setNoteList] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const createServiceMutation = useMutation(createService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("services");
      setLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setLoading(false);
    },
  });

  const handleInputChange = (e) => {
    if (e.target.name === "serviceName") {
      setServiceName(e.target.value);
    }
    if (e.target.name === "serviceTitle") {
      setServiceTitle(e.target.value);
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const handleAddFeature = () => {
    setKeyFeatures([...keyFeatures, features]);
    setFeatures(" ");
  };

  const handleAddNote = () => {
    setNoteList([...noteList, note]);
    setNote(" ");
  };

  const generatePayload = (values) => {
    let payload = new FormData();
    for (var key in values) {
      if (key === "keyFeatures" || key === "specialNote") {
        payload.append(key, JSON.stringify(values[key]));
      } else {
        payload.append(key, values[key]);
      }
    }
    return payload;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newService = {
        serviceName,
        title: serviceTitle,
        serviceImage,
        keyFeatures,
        specialNote: noteList,
        description,
      };
      console.log(newService);
      const payload = generatePayload(newService);
      await createServiceMutation.mutateAsync(payload);
      setServiceName("");
      setServiceTitle("");
      setServiceImage("");
      setKeyFeatures([]);
      setNoteList([]);
      setDescription("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <h1 className="text-2xl font-semibold text-center ">Add a new service</h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">Service Name : </h1>
              <input
                type="text"
                name="serviceName"
                placeholder="type service name"
                className="input input-bordered w-[80%]"
                value={serviceName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Service Title &nbsp;&nbsp;&nbsp;:{" "}
              </h1>
              <input
                type="text"
                name="serviceTitle"
                placeholder="type service title"
                className="input input-bordered w-[80%]"
                value={serviceTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">Service Image : </h1>
              <input
                type="file"
                name="serviceImage"
                className="file-input file-input-bordered w-[80%]"
                // value={serviceImage}
                onChange={(e) => setServiceImage(e.target.files[0])}
              />
            </div>
            <div className="flex items-top my-3">
              <h1 className="mr-4 text-2xl font-semibold mt-2">
                KeyFeatures &nbsp; &nbsp;:{" "}
              </h1>
              <div>
                <div className="flex">
                  <input
                    type="text"
                    name="keyFeatures"
                    placeholder="type service single key features"
                    className="input input-bordered w-[500px] mr-2"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                  <div
                    className=" bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 rounded-md text-center my-auto py-3 cursor-pointer"
                    onClick={handleAddFeature}
                  >
                    Add Feature +{" "}
                  </div>
                </div>
                <div>
                  {keyFeatures?.map((feature, index) => (
                    <span key={index} className="text-md font-semibold mr-2">
                      {index + 1}. {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-top my-3">
              <h1 className="mr-4 text-2xl font-semibold mt-2">
                Note &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              </h1>
              <div>
                <div className="flex">
                  <input
                    type="text"
                    name="noteList"
                    placeholder="type your special note"
                    className="input input-bordered w-[500px] mr-2"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div
                    className=" bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 rounded-md text-center my-auto py-3 cursor-pointer"
                    onClick={handleAddNote}
                  >
                    Add Note +{" "}
                  </div>
                </div>
                <div>
                  {noteList?.map((noteItem, index) => (
                    <span key={index} className="text-md font-semibold mr-2">
                      {index + 1}. {noteItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">
                Description &nbsp;&nbsp;&nbsp;:{" "}
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
              setServiceName("");
              setServiceTitle("");
              setServiceImage("");
              setFeatures("");
              setKeyFeatures([]);
              setNote("");
              setNoteList([]);
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

export default AddService;
