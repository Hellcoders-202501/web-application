import { requests } from "@core/axiosAgent";
import { RequestContract } from "@models/contract";

const makeRequest = (request: RequestContract) => {
    return requests.post("/request", request);
};

export default {
    makeRequest,
};
