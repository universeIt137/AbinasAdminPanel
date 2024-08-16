import { Link } from "react-router-dom";
import Loader from "../../../../shared/Loader";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createMembership } from "../../../../services/auth/auth";
import { toast } from "react-toastify";

const CreateMembership = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const queryClient = useQueryClient();
  const createMembershipMutation = useMutation(createMembership, {
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries("meberships");
      toast.success("membership created successfully");
      setName("");
      setPhone("");
      setPassword("");
      setReEnterPassword("");
    },
    onError: (error) => {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tempUser = {
        name,
        phone,
        password,
        reEnterPassword,
      };
      await createMembershipMutation.mutateAsync(tempUser);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader forProcess={true}></Loader>}
      <h1 className="text-2xl font-semibold">Create a New Membership</h1>
      <div className="w-[70%]  h-[500px] sm:h-[400px]  bg-[#d6e8f8] mx-auto text-center rounded-md mt-5">
        <div className=" px-10">
          <form onSubmit={submitHandler}>
            <label className="label">
              <span className="text-black label-text   sm:mt-3">
                Your Full Name
              </span>
            </label>
            <div className="flex justify-start">
              <input
                type="text"
                placeholder="Enter your full name here"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input border-[1px] h-10 sm:h-7   sm:rounded-md  p-1 border-accent  w-[100%]"
              />
            </div>
            <label className="label">
              <span className="text-black label-text  ">
                Your Mobile Number
              </span>
            </label>
            <div className="flex justify-start">
              <input
                type="text"
                placeholder="Enter your mobile number here"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input border-[1px] h-10 sm:h-7   sm:rounded-md  p-1 border-accent  w-[100%]"
              />
            </div>

            <label className="label">
              <span className="text-black label-text   ">Password</span>
            </label>
            <div className="flex justify-start">
              <input
                type="password"
                placeholder="Enter your password here"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input border-[1px] h-10 sm:h-7   sm:rounded-md p-1 border-accent   w-[100%]"
              />
            </div>

            <label className="label">
              <span className="text-black label-text  ">Re Password</span>
            </label>
            <div className="flex justify-start">
              <input
                type="password"
                placeholder="Enter your password here"
                required
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                className="input border-[1px] h-10 sm:h-7   sm:rounded-md  p-1 border-accent  w-[100%]"
              />
            </div>

            <div className="flex justify-center">
              <input
                type="submit"
                value="Submit"
                className="w-[100px] h-[40px] bg-secondary rounded-lg text-[22px] text-white   mt-3 cursor-pointer hover:bg-secondary/[0.6]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMembership;
