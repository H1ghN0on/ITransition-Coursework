import io from "socket.io-client";

const socket = io(process.env.AXIOS_BASE_URL!);

export default socket;
