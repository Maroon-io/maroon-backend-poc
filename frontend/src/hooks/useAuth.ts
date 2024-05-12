import authService from "../services/authService";
import httpService from "../services/httpService";

function useAuth() {
  const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await authService.login(email, password);
      httpService.setJwt(data.access_token);
      localStorage.setItem("MAROON_TOKEN", data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  return { loginUser };
}

export default useAuth;
