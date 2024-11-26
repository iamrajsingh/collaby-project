import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookloginButton } from "react-social-login-buttons";

function LoginFacebook() {
  return (
    <LoginSocialFacebook
      appId="2411619622559675"
      onResolve={(response) => {
      }}
      onReject={(error) => {
      }}
    >
      <FacebookloginButton />
    </LoginSocialFacebook>
  );
}

export default LoginFacebook;
