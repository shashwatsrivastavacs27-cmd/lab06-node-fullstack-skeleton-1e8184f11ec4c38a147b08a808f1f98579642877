import { useEffect } from "react";
import API from "../services/api";

function Dashboard({ user, setUser }) {

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch {
        alert("Unauthorized");
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>

      {user.role !== "USER" && <a href="/users">Manage Users</a>}

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;