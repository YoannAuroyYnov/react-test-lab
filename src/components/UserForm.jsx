import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  validateName,
  validateIndentity,
  validateEmail,
  validateAge,
  validateZipCode,
} from "../utils/validator";
import { TextInput } from "./atomic/TextInput";

const INITIAL_PERSON = {
  firstname: "",
  lastname: "",
  email: "",
  birth: "",
  city: "",
  zipCode: "",
};

export const UserForm = ({ setUsers }) => {
  const [disabled, setDisabled] = useState(true);
  const [person, setPerson] = useState(INITIAL_PERSON);
  const [personError, setPersonError] = useState(INITIAL_PERSON);

  const [, navigate] = useLocation();

  const handleChange = (field, value, validator = null) => {
    setPerson({ ...person, [field]: value });

    if (!validator) {
      setPersonError({ ...personError, [field]: "" });
      return;
    }

    try {
      const validateData =
        field === "birth"
          ? { birth: new Date(value) }
          : field === "email"
            ? { email: value }
            : field === "zipCode"
              ? { zipCode: value }
              : value;

      validator(validateData);
      setPersonError({ ...personError, [field]: "" });
    } catch (error) {
      setPersonError({ ...personError, [field]: error.message });
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

    setUsers((prev) => {
      const updatedUsers = [...prev, person];
      window.localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    setPerson(INITIAL_PERSON);
    setDisabled(true);
    navigate("/");
  };

  const requiredIndicator = (
    <span className="required-indicator" aria-hidden="true">
      *
    </span>
  );

  return (
    <>
      <h3 className="form-title">Enregistrer un nouvel utilisateur</h3>
      <form action="/" method="get">
        <div className="form-container">
          <TextInput
            label="Prénom"
            id="firstname"
            value={person.firstname}
            onChange={(e) =>
              handleChange("firstname", e.target.value, validateName)
            }
            testId="firstname-input"
            errorTestId="firstname-error-text"
            errorText={personError.firstname}
            required
            requiredIndicator={requiredIndicator}
          />
          <TextInput
            label="Nom"
            id="lastname"
            type="text"
            value={person.lastname}
            onChange={(e) =>
              handleChange("lastname", e.target.value, validateName)
            }
            testId="lastname-input"
            errorTestId="lastname-error-text"
            errorText={personError.lastname}
            required
            requiredIndicator={requiredIndicator}
          />
          <TextInput
            label="Email"
            id="email"
            type="email"
            value={person.email}
            onChange={(e) =>
              handleChange("email", e.target.value, validateEmail)
            }
            testId="email-input"
            errorTestId="email-error-text"
            errorText={personError.email}
            required
            requiredIndicator={requiredIndicator}
          />
          <TextInput
            label="Date de naissance"
            id="birthdate"
            type="date"
            value={person.birth}
            onChange={(e) => handleChange("birth", e.target.value, validateAge)}
            testId="birth-input"
            errorTestId="birth-error-text"
            errorText={personError.birth}
            required
            requiredIndicator={requiredIndicator}
          />
          <TextInput
            label="Ville"
            id="city"
            value={person.city}
            onChange={(e) => handleChange("city", e.target.value)}
            testId="city-input"
            errorTestId="city-error-text"
            errorText={personError.city}
          />
          <TextInput
            label="Code postal"
            id="zipcode"
            value={person.zipCode}
            onChange={(e) =>
              handleChange("zipCode", e.target.value, validateZipCode)
            }
            testId="zip-input"
            errorTestId="zip-error-text"
            errorText={personError.zipCode}
            required
            requiredIndicator={requiredIndicator}
          />
          <div>
            <button
              data-testid="back-button"
              className="button button-secondary"
              onClick={() => navigate("/")}
            >
              Retour
            </button>
            <button
              data-testid="submit-button"
              className={`button submit-button ${disabled && "disabled"}`}
              type="submit"
              onClick={onSubmit}
              disabled={disabled}
            >
              Enregistrer l'utilisateur
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
