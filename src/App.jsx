import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./assets/Compontes/Home";
import Add from "./assets/Compontes/Add";
import Edit from "./assets/Compontes/Edit";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  // Fetching the user data from the Mock API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) =>
        console.log("Error while Fetching the User Data: ", error)
      );
  }, []);

  // Function to add new user data
  const addUser = (formData) => {
    axios
      .post(API_URL, formData)
      .then((response) => {
        setUsers([...users, response.data]);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  // Function to store the edited user data
  const editUser = (formData) => {
    axios
      .put(`${API_URL}/${editingUser.id}`, formData)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? response.data : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error editing user:", error);
      });
  };

  // Function to delete the user 
  const deleteUser = (userId) => {
    axios
      .delete(`${API_URL}/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="App container">
      <h1 className="main-heading">REACT AXIOS</h1>
      {/* Intitalized the routes to particular components */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              users={users}
              onEditUser={(user) => setEditingUser(user)}
              onDeleteUser={deleteUser}
            />
          }
        ></Route>
        <Route
          path="/add"
          element={<Add onAddUser={addUser} />}
        ></Route>
        <Route
          path="/edit/:id"
          element={<Edit user={editingUser} onEditUser={editUser} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;