import { useLocation } from "wouter";

export const UsersList = ({ users }) => {
  const [, navigate] = useLocation();

  const severalUsers = users.length > 1;
  const noUser = users.length === 0;

  return (
    <div className="users-list-container">
      <h2 data-testid="users-counter">
        {noUser
          ? "Il n'y a aucun utilisateur enregistré"
          : `Il y a ${users.length} utilisateur${severalUsers ? "s" : ""} enregistré${severalUsers ? "s" : ""}`}
      </h2>
      <h3>
        {users.length > 0
          ? `Liste des 5 derniers utilisateurs :`
          : "Créez en un pour voir la liste des utilisateurs enregistrés !"}
      </h3>
      <ul data-testid="users-list" className="list-none">
        {users.length > 0 &&
          users.slice(-5).map((user, index) => (
            <li key={index} data-testid={`user-${index}`}>
              {index + 1} - {user.name}
            </li>
          ))}
      </ul>
      <button
        data-testid="navigation-button"
        className="button"
        onClick={() => navigate("/register")}
      >
        Enregistrer un nouvel utilisateur
      </button>
    </div>
  );
};
