import { io } from 'socket.io-client';
// The URL point to the backend server
const SOCKET_URL = 'http://localhost:3000';

export const socket = io(SOCKET_URL, { autoConnect: true});