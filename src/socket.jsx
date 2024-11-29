import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const Socketcontext = createContext();

const getSocket = () => useContext(Socketcontext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );
  return (
    <Socketcontext.Provider value={socket}>{children}</Socketcontext.Provider>
  );
};

export { getSocket, SocketProvider };
