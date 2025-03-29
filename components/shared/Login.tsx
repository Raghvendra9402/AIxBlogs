import { CardWrapper } from "./CardWrapper";
import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <CardWrapper
      title="Login"
      description="Welcome back to explore exciting blogs"
    >
      <LoginForm />
    </CardWrapper>
  );
}
