const params = new URLSearchParams(window.location.search);

const paramsUser = {
  name: params.get('name'),
  mail: params.get('mail'),
};

const app = new Vue({
  el: '#app',
  data: {
    title: 'Nestjs Websockets Chat',
    name: paramsUser.name,
    text: '',
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msgToServer', message);

        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
      // Make post request to save messages to database?
      console.log(message.name, message.text);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
    subscribeRoom() {
      const message = {
        name: 'Websockets Chat',
        text: `${paramsUser.name} foi conectado ao general room`,
      };
      this.socket.on('generalRoom', function (data) {
        console.log('alooooo');
      });

      // Clear chat
      // Load all messages
    },
    leaveRoom() {
      const message = {
        name: 'Websockets Chat',
        text: `${paramsUser.name} foi descconectado do general room`,
      };
      this.socket.emit('msgToServer', message);
    },
    // Unsubscribe from room
    // Clear chat
  },
  created() {
    this.socket = io('http://localhost:5050');
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
  },
});
