import { useState } from "react";
import { FaEdit, FaRegUser, FaTimes } from "react-icons/fa";
import { Link, Navigate, Outlet, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const App = () => {
  const users = useLoaderData();
  const [added, setAdded] = useState(false);

  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
          }
          setAdded(true);
        });
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl font-bold bg-green-600 py-8 mb-10">
        User Management System
      </h1>
      <Outlet></Outlet>
      <Link to={"/addUser"}>
        <button className="flex gap-3 items-center font-bold">
          New user <FaRegUser />
        </button>
      </Link>

      <table className="w-full mt-20 text-lg">
        <tr className="bg-blue-300 py-8 grid grid-cols-5 text-center">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Action</th>
        </tr>

        {users.map((user, ind) => (
          <tr key={user._id} className="grid grid-cols-5 text-center">
            <td>{ind + 1}</td>
            <td>{user.name}</td>
            <td>{user.email} </td>
            <td>{user.gender}</td>
            <td>
              <div className="flex gap-4 w-full  justify-center">
                <Link to={`http://localhost:5173/update/${user._id}`}>
                  <button>
                    <FaEdit />
                  </button>
                </Link>
                <button onClick={() => handleDeleteBtn(user._id)}>
                  <FaTimes />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </table>
      {added && <Navigate to="/"></Navigate>}
    </div>
  );
};

export default App;
