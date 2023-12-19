import Header from "./Header";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const Update = () => {
  const user = useLoaderData();
  const [added, setAdded] = useState(false);
  const handleSubmitBtn = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const userInfo = { name, email, gender };

    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Congratulations !!",
          text: "You modified successfully!",
          icon: "success",
        });
        form.reset();
        setAdded(true);
      });
  };
  return (
    <div className="container mx-auto text-center">
      <Header></Header>
      <Link to={"/"}>
        <button className="flex gap-3 items-center font-bold">
          <FaAngleDoubleLeft /> All User
        </button>
      </Link>
      <h1 className="text-3xl font-bold my-5">Update User</h1>
      <p>Use the below form to update account</p>
      <form onSubmit={handleSubmitBtn}>
        <input
          type="text"
          placeholder="name"
          className="input input-bordered input-primary w-full max-w-xs my-3"
          required
          name="name"
          defaultValue={user.name}
        />
        <br />
        <input
          type="email"
          defaultValue={user.email}
          placeholder="email"
          className="input input-bordered input-primary w-full max-w-xs"
          required
          name="email"
        />
        <br />
        <div className="my-5 text-lg flex items-center gap-2 justify-center">
          <span>Gender</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-info "
            value="male"
          />
          <span>Male</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-info"
            value="female"
          />
          <span>Female</span>
          <input
            type="radio"
            name="gender"
            className="radio radio-info"
            value="others"
          />
          <span>Others</span>
        </div>
        <button className="btn btn-active btn-secondary w-[30%]">Save</button>
      </form>
      {added && <Navigate to="/"></Navigate>}
    </div>
  );
};

export default Update;
