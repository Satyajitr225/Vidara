export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  subscription: "free" | "basic" | "pro" | "enterprise";
  createdAt: Date;
}