import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<[] | string[]>([]);
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to the web socket server");

      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Message received: ", message);
      setMessages((prev) => [...prev, message.data]);
    };

    return () => {
      socket.close();
    }
  }, []);

  const handleMessageType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTypedMessage(e.target.value);
    },
    []
  );

  const handleMessageSend = () => {
    socket?.send(typedMessage);
    setTypedMessage("");
  };

  if (!socket) {
    return <div>Connecting to the web socket server</div>;
  }

  return (
    <div>
      <section>
        <input
          value={typedMessage}
          onChange={handleMessageType}
          type="text"
          required
        />
        <button
          onClick={handleMessageSend}
          style={{ backgroundColor: "blue", color: "white", padding: 5 }}
        >
          Send Message
        </button>
      </section>

      {messages.length > 0 ? (
        messages.map((message) => {
          return (
            <div style={{ marginTop: 12 }} key={message}>
              {message}
            </div>
          );
        })
      ) : (
        <div>No messages found</div>
      )}
    </div>
  );
}
