const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:4000";

const client = new WebSocket(WS_URL);

client.onopen = ()=> console.log('backend socket server connected!')


export default client