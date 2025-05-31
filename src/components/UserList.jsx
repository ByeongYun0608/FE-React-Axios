import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://reqres.in/api/users", {
          headers: {
            "x-api-key": "reqres-free-v1",
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);
      } catch (error) {
        alert("유저 정보를 불러오지 못했습니다.");
      }
    };
    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(
    (user) => 
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-container">
      <div className="user-info-box">
        <p><strong>이메일:</strong> {email}</p>
        <p><strong>토큰:</strong> {token}</p>
      </div>

      <h2 className="user-title">👥 유저 목록</h2>

      <input
        className="user-search"
        placeholder="이름 또는 이메일로 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} />
              <div>
                <p>
                  <strong>{user.first_name} {user.last_name}</strong>
                </p>
                <p>{user.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserList;
