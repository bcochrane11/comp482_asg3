import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class SocketClient extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:5000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("user joined", data => this.setState({ response: data }));
    socket.on("user left", data => this.setState({ response: data }));
    


}

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
               {response} 
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default SocketClient;