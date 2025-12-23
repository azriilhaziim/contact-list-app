import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../services/api";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  return user ? (
    <div className="user-detail-container">
      <div className="user-profile-card">
        <img
          src="/public/profile1.png"
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="user-name-header">{user.name}</h2>
        <div className="user-info-list">
          <div className="info-item">
            <span className="icon">
              <i className="fas fa-id-card"></i>
            </span>
            <span>{user.id}</span>
          </div>
          <div className="info-item">
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
            <span>{user.email}</span>
          </div>
          <div className="info-item">
            <span className="icon">
              <i className="fas fa-phone"></i>
            </span>
            <span>{user.contact}</span>
          </div>
        </div>
        <Link to="/" className="back-link">
          Back
        </Link>
      </div>
    </div>
  ) : (
    <p>Loading user...</p>
  );
}