import { useState } from "react";
import {
  validateName,
  validateIndentity,
  validateEmail,
  validateAge,
  validateZipCode,
  validateCity,
} from "../utils/validator";

export const UserForm = () => {
  const [disabled, setDisabled] = useState(true);

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

  const handleChangeFirstname = (e) => {
    const { value } = e.target;

    setFirstname(value);

    try {
      const isValid = validateName(value);
      setFirstnameError("");
    } catch (error) {
      setFirstnameError(error.message);

      return;
    }
  };

  const handleChangeLastName = (e) => {
    const { value } = e.target;

    setLastname(value);
    try {
      const isValid = validateName(value);
      setLastnameError("");
    } catch (error) {
      setLastnameError(error.message);

      return;
    }
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;

    setEmail(value);
    try {
      const isValid = validateEmail({ email: value });
      setEmailError("");
    } catch (error) {
      setEmailError(error.message);
    }
  };

  const handleChangeBirthdate = (e) => {
    const { value } = e.target;

    setBirthdate(value);
    try {
      const isValid = validateAge({ birth: new Date(value) });
      setBirthdateError("");
    } catch (error) {
      setBirthdateError(error.message);
    }
  };

  const handleChangeCity = (e) => {
    const { value } = e.target;

    setCity(value);
  };

  const handleChangeZipcode = (e) => {
    const { value } = e.target;

    setZipcode(value);
    try {
      const isValid = validateZipCode({ zipCode: value });
      setZipcodeError("");
    } catch (error) {
      setZipcodeError(error.message);
    }
  };


  const requiredIndicator = (
    <span className="required-indicator" aria-hidden="true">
      *
    </span>
  );

  return (
    <form>
      <div className="form-container">
        <div className="input-container">
          <label className="label" htmlFor="firstname">
            Prénom {requiredIndicator}
          </label>
          <input
            required
            value={firstname}
            onChange={handleChangeFirstname}
            className="input"
            id="firstname"
            type="text"
          />
          <p className="error-text">{firstnameError}</p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="lastname">
            Nom {requiredIndicator}
          </label>
          <input
            required
            value={lastname}
            onChange={handleChangeLastName}
            className="input"
            id="lastname"
            type="text"
          />
          <p className="error-text">{lastnameError}</p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="email">
            Email {requiredIndicator}
          </label>
          <input
            required
            value={email}
            onChange={handleChangeEmail}
            className="input"
            id="email"
            type="email"
          />
          <p className="error-text">{emailError}</p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="birthdate">
            Date de naissance {requiredIndicator}
          </label>
          <input
            required
            value={birthdate}
            onChange={handleChangeBirthdate}
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
            onChange={handleChangeCity}
            className="input"
            id="city"
            type="text"
          />
          <p className="error-text">{cityError}</p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="zipcode">
            Code postal {requiredIndicator}
          </label>
          <input
            required
            value={zipcode}
            onChange={handleChangeZipcode}
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
