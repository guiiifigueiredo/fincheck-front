import { sleep } from "../../utils/sleep";
import { httpClient } from "../httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export async function signin(signinParams: SigninParams) {
  await sleep(1500);

  const { data } = await httpClient.post<SigninResponse>(
    "/auth/signin",
    signinParams,
  );

  return data;
}
