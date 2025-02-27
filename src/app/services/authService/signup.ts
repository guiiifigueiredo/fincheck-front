import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  accessToken: string;
}

export async function signup(signupParams: SignupParams) {
  await sleep(1500);

  const { data } = await httpClient.post<SignupResponse>(
    "/auth/signup",
    signupParams,
  );

  return data;
}
