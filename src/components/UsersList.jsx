import { useState, useEffect } from "react";

export const UsersList = () => {
  const [users, setUsers] = useState(() => {
    const stored = window.localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = window.localStorage.getItem("users");
      setUsers(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdate", handleStorageChange);
    };
  }, []);

  return (
    <div className="users-list-container">
      <h3>Liste des 5 derniers utilisateurs enregistrés :</h3>
      <ul data-testid="users-list" className="list-none">
        {users.slice(-5).map((user, index) => (
          <li key={index} data-testid={`user-${index}`}>
            {index + 1} - {user.firstname} {user.lastname}
          </li>
        ))}
      </ul>
      <button data-testid="navigation-button" className="button">
        Enregistrer un nouvel utilisateur
      </button>
    </div>
  );
};
