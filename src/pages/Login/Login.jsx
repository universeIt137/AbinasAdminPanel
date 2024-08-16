/* eslint-disable no-unused-vars */

import { useState } from "react";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { login } from "../../services/auth/auth";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const loginhandler = useMutation(login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await loginhandler.mutateAsync({
        phone: phone,
        password,
      });
      if (success) {
        setPhone("");
        setPassword("");
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setTimeout(() => {
        loginhandler.reset();
      }, 10000);
      setLoading(false);
    }
  };
  return (
    <div className="hero min-h-screen">
      {loading && <Loader forProcess={true} />}
      <div className="hero-content flex-col">
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-primary p-6 shadow-md shadow-secondary">
          <div className="mx-auto">
            <img src={logo} alt="" />
          </div>
          <div className="card-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-control flex flex-row justify-between items-center">
                <label className="label w-1/3">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="phone number"
                  name="name"
                  className="input input-bordered w-2/3 px-3 py-2"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-control flex flex-row justify-between items-center mt-4">
                <label className="label w-1/3">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered w-2/3  py-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6 w-3/4 mx-auto">
                <button
                  type="submit"
                  className="btn btn-primary text-white bg-secondary hover:bg-secondary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="">
            <label className=" ">
              If you forgot your password then click{" "}
              <Link>
                <span className="text-secondary">Send Password</span>
              </Link>{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
