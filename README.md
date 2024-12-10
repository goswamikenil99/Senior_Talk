# Smart Talk

**Smart Talk** is a real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js). It offers a rich set of features, including secure user authentication (with JWT tokens), end-to-end messaging, group chats, and an AI chatbot that automatically responds when the user is not available. The application supports sending various formats like text, images, videos, and documents, as well as providing real-time updates on the messages.

## Features

- **Login & Sign-up**: Users can sign up and log in securely using JWT tokens. Login with Google is also supported.
- **Profile Management**: Users can manage their profiles within the app.
- **End-to-End Chat**: Secure, real-time one-on-one chats between users.
- **Group Chat**: Create and participate in group chats with multiple users.
- **AI Chatbot**: If the user is offline, an AI-powered chatbot will automatically reply with a message saying the user is not available.
- **File Sharing**: Users can send text, images, videos, and other document formats.
- **Message Timestamps**: All messages display the time and date they were sent.
- **Responsive Design**: The application is fully responsive and optimized for various screen sizes.

## Technologies Used

- **Frontend**: React.js, React Router, Tailwind CSS, Radix UI, PeerJS
- **Backend**: Node.js, Express.js, MongoDB, JWT Tokens
- **Libraries/Tools**:
  - `@react-oauth/google`: Google Login Integration
  - `socket.io-client`: Real-time messaging functionality
  - `moment`: Date and time formatting for messages
  - `emoji-picker-react`: Emoji picker for chat
  - `multer`: File upload handling
  - `bcrypt`: Password hashing for secure login
  - `jsonwebtoken`: Authentication with JWT tokens
  - `peerjs`, `simple-peer`: WebRTC peer-to-peer communication for video calls
  - `cohere-ai`, `openai`: AI chatbot integration
  - `node-cache`: Cache management for performance optimization
  - `nodemailer`: Email notifications

## Installation

1. Access the Server via SSH 
Explanation: SSH (Secure Shell) allows you to securely connect to your college server. 
Command: 
ssh username@your_personal_ip 
Replace username with your server username. 
Replace your_personal_ip with the IP address your college provided. 
Note: Ensure you have your SSH credentials (username and password or private key). 


2. Install Required Software 
Explanation: You need Node.js, npm, MongoDB, and PM2 to run and manage your MERN stack 
application. 
Install Node.js and npm: 
sudo apt install nodejs npm -y 
Check installation: 
node -v 
npm -v 
Install PM2 (Process Manager for Node.js applications): 
sudo npm install -g pm2 


3. Set Up MongoDB 
Explanation: MongoDB is your database. Ensure it's installed and running. 
Install MongoDB: 
sudo apt install mongodb -y 
Start MongoDB: 
sudo systemctl start mongodb 
Enable MongoDB on boot: 
sudo systemctl enable mongodb 
Verify MongoDB status: 
sudo systemctl status mongodb 


4. Upload Your Project Files 
Explanation: You need to transfer your local project files to the server. 
Use scp (Secure Copy Protocol): 
scp -r /path/to/your/project username@your_personal_ip:/path/on/server 
Replace /path/to/your/project with your local project directory. 
Replace /path/on/server with the desired directory on the server. 


5. Configure Environment Variables 
Explanation: Set environment variables (like database URLs) on the server for security and flexibility. 
Create a .env file in your project directory: 
nano .env 
Add environment variables, e.g.: 
MONGO_URI=your_mongo_connection_string 
JWT_SECRET=your_jwt_secret 


6. Install Project Dependencies 
Explanation: Dependencies (like Express or React) need to be installed on the server. 
Navigate to your project folder: 
cd /path/on/server/project_folder 
Install dependencies: 
npm install 


7. Build and Run Your Application 
Start the backend server with PM2: 
pm2 start server.js 
Replace server.js with your main backend file (e.g., index.js). 


8. Configure Firewall and Ports 
Explanation: Ensure the server allows traffic on the required ports (e.g., 80 for HTTP). 
Allow HTTP/HTTPS traffic: 
sudo ufw allow 80 
sudo ufw allow 443 
Allow any additional ports used by your app (e.g., 3000): 
sudo ufw allow 3000 
Enable firewall: 
sudo ufw enable 

### 1. Clone the Repository



```bash
git clone https://github.com/****