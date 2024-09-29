import * as signalR from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
    this.port = 'http://localhost:5247/';
  }

  async startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.port}whiteboardHub`)
      .build();

    try {
      await this.connection.start();
      console.log('SignalR connected');
    } catch (err) {
      console.error('Error establishing SignalR connection: ', err);
    }
  }

  onLoadPreviousDrawings(callback) {
    if (this.connection) {
      this.connection.on('LoadPreviousDrawings', (lines) => {
        //console.log('LoadPreviousDrawings', lines);
        callback(lines);
      });
    }
  }

  onReceiveDrawAction(callback) {
    if (this.connection) {
      this.connection.on('ReceiveDrawAction', (user, actionData) => {
        callback(user, JSON.parse(actionData));
      });
    }
  }

  sendDrawAction(user, drawData) {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      this.connection
        .invoke('SendDrawAction', user, JSON.stringify(drawData))
        .catch((err) => console.error('SendDrawAction error: ', err));
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
