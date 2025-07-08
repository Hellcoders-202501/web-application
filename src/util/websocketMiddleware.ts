import { websocketMessage } from "@redux/notification/notificationThunk";
import { Middleware } from "@reduxjs/toolkit";

export const websocketMiddleware = (): Middleware => {
  let socket: WebSocket | null = null;

  return (storeAPI) => (next) => (action: any) => {
    // Iniciar conexión
    if (action.type === "websocket/connect") {
      if (socket !== null) socket.close();

      const { token } = storeAPI.getState().user;
      // socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);
      socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL!}?token=${token}`,
      );

      socket.onopen = () => {
        console.log("WebSocket conectado");
        // storeAPI.dispatch({ type: "websocket/open" });
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log("Mensaje recibido:", data);
        // storeAPI.dispatch({ type: "websocket/message", payload: data });
        storeAPI.dispatch(websocketMessage(data));
      };

      socket.onclose = () => {
        console.log("WebSocket cerrado");
        // storeAPI.dispatch({ type: "websocket/close" });
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        // storeAPI.dispatch({ type: "websocket/error", payload: error });
      };
    }

    // // Enviar mensaje si se desea
    // if (
    //   action.type === "websocket/send" &&
    //   socket?.readyState === WebSocket.OPEN
    // ) {
    //   socket.send(JSON.stringify(action.payload));
    // }

    return next(action);
  };
};
