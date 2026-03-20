import { useEffect, useState } from "react";
import API from "../services/api";

function Users({ user }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Forbidden");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await API.patch(`/users/${id}/role`, { role });
      fetchUsers();
    } catch {
      alert("Role change failed");
    }
  };

  return (
    <div>
      <h2>User Management</h2>

      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.role}

          {user.role !== "USER" && (
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          )}

          {user.role === "SUPER_ADMIN" && (
            <button onClick={() => changeRole(u._id, "ADMIN")}>
              Make ADMIN
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Users;