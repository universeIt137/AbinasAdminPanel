import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createJobCircular } from "../../../../../services/webDashboard/getIntouch";
import Loader from "../../../../../shared/Loader";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const AddJobCircular = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createAboutMutation = useMutation(createJobCircular, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("jobCirculars");
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
      const newJobCircular = {
        jobTitle,
        jobDescription,
        salary,
        experience,
        deadline,
      };
      await createAboutMutation.mutateAsync(newJobCircular);
      setJobTitle("");
      setJobDescription("");
      setSalary("");
      setExperience("");
      setDeadline("");
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
        onClick={() => navigate("/web/get-in-touch/job-circular")}
      />
      <h1 className="text-2xl font-semibold text-center ">
        Add a New Job Circular
      </h1>
      <div className=" my-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Job Title
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type title"
                className="input input-bordered w-[80%]"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Job Salary
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type salary"
                className="input input-bordered w-[80%]"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Experience &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type experience"
                className="input input-bordered w-[80%]"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Deadline
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </h1>
              <input
                type="text"
                name="name"
                placeholder="type salary"
                className="input input-bordered w-[80%]"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">Job Description :</h1>
              <textarea
                className="textarea textarea-bordered w-[80%] h-[150px]"
                name="description"
                placeholder="type your service all description here"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
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
              setJobTitle("");
              setJobDescription("");
              setSalary("");
              setExperience("");
              setDeadline("");
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobCircular;
