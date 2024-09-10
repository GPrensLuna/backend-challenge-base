//* Auth Login - signIn
export const LoginDto = {
  email: "testUser@example.com",
  password: "Password1@",
};
export const NotLoginDto = {
  email: "nonexistent@example.com",
  password: "Password1@",
};

export const NotLoginEmailDto = {
  email: "not-an-email",
  password: "Password1@",
};

//* Auth Register - signUp

export const RegisterDto = {
  username: "testUser",
  email: "testUser@example.com",
  password: "Password1@",
};
export const NotRegisterDto = {
  username: "testUser",
  email: "testUser@example.com",
  password: "Password1@",
};

//* Auth Validate
export const InvalidEmailDto = {
  username: "testUser",
  email: "testUserexample.com",
  password: "Password1@",
};

export const Passwords = ["12345678", "password", "PASSWORD1!", "Pass123"];

export const Movie = {
  iso_639_1: "en",
  iso_3166_1: "US",
  name: "Behind The Scenes vs. Actual Movie Scene",
  key: "MCsG9zH7DJE",
  site: "YouTube",
  size: 1080,
  type: "Behind the Scenes",
  official: true,
  published_at: "2024-03-17T12:59:46.000Z",
  id: "65fa45831a3248017d76aec0",
};
