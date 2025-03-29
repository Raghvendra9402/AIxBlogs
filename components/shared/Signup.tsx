import { CardWrapper } from "./CardWrapper";
import { SignupForm } from "./signup-form";

export default function Signup() {
  return (
    <CardWrapper
      title="Create Account"
      description="create account to start your blogs journey."
    >
      <SignupForm />
    </CardWrapper>
  );
}
