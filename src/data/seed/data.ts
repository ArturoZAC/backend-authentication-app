import { BcryptAdapter } from "../../config/adapters";

export const usersSeed = [
  {
    name: "Arturo Díaz",
    email: "arturo@example.com",
    password: BcryptAdapter.hash("123456"),
    emailValidated: true,
  },
  {
    name: "María Torres",
    email: "maria@example.com",
    password: BcryptAdapter.hash("654321"),
    emailValidated: true,
  },
  {
    name: "Carlos Gómez",
    email: "carlos@example.com",
    password: BcryptAdapter.hash("qwerty"),
    emailValidated: true,
  },
  {
    name: "Lucía Fernández",
    email: "lucia@example.com",
    password: BcryptAdapter.hash("password123"),
    emailValidated: true,
  },
  {
    name: "Jorge Ramírez",
    email: "jorge@example.com",
    password: BcryptAdapter.hash("abc123"),
    emailValidated: true,
  },
  {
    name: "Valeria Soto",
    email: "valeria@example.com",
    password: BcryptAdapter.hash("admin2024"),
    emailValidated: true,
  },
  {
    name: "Andrés López",
    email: "andres@example.com",
    password: BcryptAdapter.hash("letmein"),
    emailValidated: true,
  },
  {
    name: "Paola Rivas",
    email: "paola@example.com",
    password: BcryptAdapter.hash("secretpass"),
    emailValidated: true,
  },
  {
    name: "Diego Herrera",
    email: "diego@example.com",
    password: BcryptAdapter.hash("prismaSeed"),
    emailValidated: true,
  },
];
