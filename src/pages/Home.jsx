import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { getUsers, addUser, deleteUser, updateUser } from "../services/api";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (user) => {
    if (editUser) {
      await updateUser(editUser.id, user);
      setEditUser(null);
    } else {
      await addUser(user);
    }
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="home-container">
      <h1 className="page-header">Cloud Contact</h1>
      <div className="content-wrapper">
        <ContactForm
          onSubmit={handleAdd}
          initialData={editUser}
          onCancel={() => setEditUser(null)}
        />
        <div className="contact-list-wrapper">
          {loading ? (
            <p>Loading contacts...</p>
          ) : users.length > 0 ? (
            <ContactList
              users={users}
              onDelete={handleDelete}
              onEdit={setEditUser}
            />
          ) : (
            <p>No contacts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}