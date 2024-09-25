import * as signalR from '@microsoft/signalr';

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5247/whiteboardHub') // Укажите правильный URL
      .build();

    try {
      await this.connection.start();
      console.log('SignalR connected');
    } catch (err) {
      console.error('Error establishing SignalR connection: ', err);
    }
  }

  // Получение всех предыдущих рисунков
  onLoadPreviousDrawings(callback) {
    if (this.connection) {
      this.connection.on('LoadPreviousDrawings', (lines) => {
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
    if (this.connection) {
      this.connection
        .invoke('SendDrawAction', user, JSON.stringify(drawData))
        .catch((err) => console.error('SendDrawAction error: ', err));
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
