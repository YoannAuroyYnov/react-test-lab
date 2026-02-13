const { useState } = require("react");

export const UserForm = () => {
  let disabled = true;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");

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
          <p className="error-text">{firstnameError}</p>
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
          <p className="error-text">{lastnameError}</p>
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
          <p className="error-text">{emailError}</p>
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
          <p className="error-text">{birthdateError}</p>
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
          <p className="error-text">{cityError}</p>
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
          <p className="error-text">{zipcodeError}</p>
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
