import { io } from 'socket.io-client';

export const socket = io(process.env.API_URL, {
    transports: ['websocket'],
    autoConnect: false,
    //   auth: { token: await getAuthToken() }
});
