import { createOneUser, getAllUsers } from "./api";
import axios from "axios";
jest.mock("axios");

describe("getAllUsers", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@mail.com",
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(getAllUsers()).resolves.toEqual(data.data);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users`,
    );
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(getAllUsers()).rejects.toThrow(errorMessage);
  });
});

describe("createOneUser", () => {
  it("creates a user successfully", async () => {
    const newUser = {
      name: "Jane Doe",
      email: "jane.doe@mail.com",
    };

    const createdUser = {
      ...newUser,
      id: "2",
    };

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: createdUser }),
    );

    await expect(createOneUser(newUser)).resolves.toEqual(createdUser);
  });

  it("fails to create a user", async () => {
    const newUser = {
      name: "Jane Doe",
      email: "jane.doe@mail.com",
    };

    const errorMessage = "Failed to create user";

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(createOneUser(newUser)).rejects.toThrow(errorMessage);
  });
});
