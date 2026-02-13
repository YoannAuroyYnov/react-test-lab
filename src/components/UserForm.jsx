const { useState } = require("react");

export const UserForm = () => {
  let disabled = true;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  return (
    <form>
      <div className="form-container">
        <div className="input-container">
          <label className="label" htmlFor="firstname">
            Prénom
          </label>
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="input"
            id="firstname"
            type="text"
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="lastname">
            Nom
          </label>
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="input"
            id="lastname"
            type="text"
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            id="email"
            type="email"
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="birthdate">
            Date de naissance
          </label>
          <input
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="input"
            id="birthdate"
            type="date"
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="city">
            Ville
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
            id="city"
            type="text"
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="zipcode">
            Code postal
          </label>
          <input
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="input"
            id="zipcode"
            type="text"
          />
        </div>
        <button
          className={`button submit-button ${disabled && "disabled"}`}
          type="submit"
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
