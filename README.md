# Real-Time Chat Application

A real-time chat application built with Node.js, Express, and Socket.IO that allows users to join chat rooms and communicate in real-time.

## Features

- Real-time messaging using Socket.IO
- Room-based chat system
- User validation and authentication
- Cross-origin resource sharing (CORS) support
- Responsive design

## Technologies Used

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML, CSS, JavaScript
- **Real-time Communication**: Socket.IO

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd CHAT-APP
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional):
```env
PORT=3000
FRONTEND_URL=http://localhost:3001
```

4. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a username and room ID
3. Start chatting in real-time!

## API Endpoints

### Socket.IO Events

- `join room`: Join a specific chat room
  - Parameters: `{roomId, userName}`
  
- `room message`: Send a message to the current room
  - Parameters: `{roomId, message}`

- `disconnect`: Handle user disconnection

## Project Structure

```
CHAT-APP/
├── server.js          # Main server file
├── package.json       # Project dependencies
├── public/           # Static files (HTML, CSS, JS)
├── .gitignore        # Git ignore file
└── README.md         # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

This application can be deployed to various platforms:

- **Render**: Recommended for Socket.IO apps
- **Railway**: Good for full-stack applications
- **Heroku**: Popular platform with good Node.js support

For deployment instructions, see the respective platform documentation. 