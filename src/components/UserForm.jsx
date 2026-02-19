import { useState, useEffect } from "react";
import {
  validateName,
  validateIndentity,
  validateEmail,
  validateAge,
  validateZipCode,
} from "../utils/validator";

const INITIAL_PERSON = {
  firstname: "",
  lastname: "",
  email: "",
  birth: "",
  city: "",
  zipCode: "",
};

export const UserForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [person, setPerson] = useState(INITIAL_PERSON);
  const [personError, setPersonError] = useState(INITIAL_PERSON);

  const handleChangeFirstname = (e) => {
    const { value } = e.target;

    setPerson({ ...person, firstname: value });
    try {
      validateName(value);
      setPersonError({ ...personError, firstname: "" });
    } catch (error) {
      setPersonError({ ...personError, firstname: error.message });

      return;
    }
  };

  const handleChangeLastName = (e) => {
    const { value } = e.target;

    setPerson({ ...person, lastname: value });
    try {
      validateName(value);
      setPersonError({ ...personError, lastname: "" });
    } catch (error) {
      setPersonError({ ...personError, lastname: error.message });

      return;
    }
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;

    setPerson({ ...person, email: value });
    try {
      validateEmail({ email: value });
      setPersonError({ ...personError, email: "" });
    } catch (error) {
      setPersonError({ ...personError, email: error.message });
    }
  };

  const handleChangeBirthdate = (e) => {
    const { value } = e.target;

    setPerson({ ...person, birth: value });
    try {
      validateAge({ birth: new Date(value) });
      setPersonError({ ...personError, birth: "" });
    } catch (error) {
      setPersonError({ ...personError, birth: error.message });
    }
  };

  const handleChangeCity = (e) => {
    const { value } = e.target;

    setPerson({ ...person, city: value });
  };

  const handleChangeZipcode = (e) => {
    const { value } = e.target;

    setPerson({ ...person, zipCode: value });
    try {
      validateZipCode({ zipCode: value });
      setPersonError({ ...personError, zipCode: "" });
    } catch (error) {
      setPersonError({ ...personError, zipCode: error.message });
    }
  };

  useEffect(() => {
    if (
      !person.firstname ||
      !person.lastname ||
      !person.birth ||
      (!new Date(person.birth)) instanceof Date ||
      !person.email ||
      !person.zipCode
    )
      return;

    try {
      if (
        validateIndentity(person) &&
        validateAge({ ...person, birth: new Date(person.birth) }) &&
        validateZipCode(person) &&
        validateEmail(person)
      )
        return setDisabled(false);
    } catch (error) {
      return setDisabled(true);
    }
  }, [person]);

  const onSubmit = (e) => {
    e.preventDefault();

    const users = localStorage.getItem("users") || "[]";

    const usersArray = JSON.parse(users);
    usersArray.push(person);

    localStorage.setItem("users", JSON.stringify(usersArray));
    window.dispatchEvent(new Event("localStorageUpdate"));
    setPerson(INITIAL_PERSON);
    setDisabled(true);
  };

  const requiredIndicator = (
    <span className="required-indicator" aria-hidden="true">
      *
    </span>
  );

  return (
    <form action="/" method="get">
      <div className="form-container">
        <div className="input-container">
          <label className="label" htmlFor="firstname">
            Prénom {requiredIndicator}
          </label>
          <input
            data-testid="firstname-input"
            required
            value={person.firstname}
            onChange={handleChangeFirstname}
            className="input"
            id="firstname"
            type="text"
          />
          <p data-testid="firstname-error-text" className="error-text">
            {personError.firstname}
          </p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="lastname">
            Nom {requiredIndicator}
          </label>
          <input
            data-testid="lastname-input"
            required
            value={person.lastname}
            onChange={handleChangeLastName}
            className="input"
            id="lastname"
            type="text"
          />
          <p data-testid="lastname-error-text" className="error-text">
            {personError.lastname}
          </p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="email">
            Email {requiredIndicator}
          </label>
          <input
            data-testid="email-input"
            required
            value={person.email}
            onChange={handleChangeEmail}
            className="input"
            id="email"
            type="email"
          />
          <p data-testid="email-error-text" className="error-text">
            {personError.email}
          </p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="birthdate">
            Date de naissance {requiredIndicator}
          </label>
          <input
            data-testid="birth-input"
            required
            value={person.birth}
            onChange={handleChangeBirthdate}
            className="input"
            id="birthdate"
            type="date"
          />
          <p data-testid="birth-error-text" className="error-text">
            {personError.birth}
          </p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="city">
            Ville
          </label>
          <input
            data-testid="city-input"
            value={person.city}
            onChange={handleChangeCity}
            className="input"
            id="city"
            type="text"
          />
          <p className="error-text">{personError.city}</p>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="zipcode">
            Code postal {requiredIndicator}
          </label>
          <input
            data-testid="zip-input"
            required
            value={person.zipCode}
            onChange={handleChangeZipcode}
            className="input"
            id="zipcode"
            type="text"
          />
          <p data-testid="zip-error-text" className="error-text">
            {personError.zipCode}
          </p>
        </div>
        <button
          data-testid="submit-button"
          className={`button submit-button ${disabled && "disabled"}`}
          type="submit"
          onClick={onSubmit}
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
