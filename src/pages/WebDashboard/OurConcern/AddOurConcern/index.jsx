import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Loader from "../../../../shared/Loader";
import { createConcern } from "../../../../services/webDashboard/ourConcern";

const AddOurConcern = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const createServiceMutation = useMutation(createConcern, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("ourConcern");
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
      const newContact = {
        phone,
        email,
        facebook,
      };
      const newConcern = {
        name,
        location,
        contact: newContact,
        description,
      };

      await createServiceMutation.mutateAsync(newConcern);
      setName("");
      setLocation("");
      setPhone("");
      setEmail("");
      setFacebook("");
      setDescription("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <h1 className="text-2xl font-semibold text-center ">Add a Our Concern</h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Name
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type name"
                className="input input-bordered w-[80%]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Location
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="location"
                placeholder="type location"
                className="input input-bordered w-[80%]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <h1 className="text-2xl font-semibold">Contact</h1>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Phone
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="phone"
                placeholder="type phone number"
                className="input input-bordered w-[80%]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Email
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="email"
                placeholder="type your email"
                className="input input-bordered w-[80%]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">FaceBook Page :</h1>
              <input
                type="text"
                name="facebook"
                placeholder="type your facebook page link"
                className="input input-bordered w-[80%]"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>

            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">
                Description &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;:
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

export default AddOurConcern;
