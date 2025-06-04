import { requests } from "@core/axiosAgent";

const signIn = (email: string, password: string) => {
    return requests.post("/auth", { email, password });
};

export default { signIn };