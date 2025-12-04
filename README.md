# Chatly - Real-Time Chat Application

A full-stack real-time chat application built with React, Node.js, Socket.IO, and MongoDB. This application provides seamless messaging capabilities with support for both individual and group chats.

## 🚀 Features

### 🔐 Authentication & User Management
- **User Registration & Login**: Secure authentication with JWT tokens
- **Profile Management**: Users can update their profile pictures and view their bio
- **Avatar Upload**: Integration with Cloudinary for image storage
- **Session Management**: Persistent login sessions with HTTP-only cookies

### 💬 Real-Time Messaging
- **Instant Messaging**: Real-time message delivery using Socket.IO
- **Typing Indicators**: See when other users are typing
- **Online Status**: View which users are currently online
- **Message Notifications**: Get notified of new messages with alert badges
- **Message History**: Infinite scroll pagination for loading chat history

### 👥 Friend System
- **Friend Requests**: Send and accept friend requests
- **Friend Search**: Search for users by name to add as friends
- **Notifications**: Real-time notifications for incoming friend requests
- **Friend List**: View all accepted friends

### 👨‍👩‍👧‍👦 Group Chat Features
- **Create Groups**: Create group chats with multiple members (2-100 members)
- **Group Management**:
  - Rename groups
  - Add/remove members
  - Delete groups
  - Leave groups
- **Group Details**: View group members, creator, and avatar
- **Permission Controls**: Only group creators can modify certain settings

### 📎 File Sharing
- **Multiple Attachment Types**: Send images, videos, audio files, and documents
- **File Preview**: View attachments directly in the chat
- **Cloudinary Integration**: Secure file storage and delivery

### 📱 Responsive Design
- **Mobile-First**: Fully responsive design that works on all devices
- **Material-UI**: Modern, clean interface using Material-UI components
- **Drawer Navigation**: Mobile-friendly navigation with drawer menus
- **Adaptive Layouts**: Different layouts for mobile, tablet, and desktop views

### 🔍 Search & Discovery
- **User Search**: Find and connect with other users
- **Chat Search**: Quickly navigate to specific conversations
- **Real-Time Updates**: Automatic chat list updates

### 🎨 User Interface
- **Modern Design**: Clean and intuitive interface
- **Dark/Light Themes**: Support for different color schemes
- **Loading States**: Skeleton loaders for better UX
- **Toast Notifications**: User-friendly feedback messages
- **Avatar Groups**: Visual representation of group members

### 👨‍💼 Admin Dashboard
- **Admin Panel**: Separate admin interface with authentication
- **User Management**: View all registered users and their statistics
- **Chat Management**: Monitor all chats (individual and group)
- **Message Management**: View all messages across the platform
- **Analytics Dashboard**:
  - Total users, chats, and messages count
  - 7-day message chart
  - User vs Group chat statistics (Doughnut chart)
  - Real-time statistics updates

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chatly.git
cd chatly
```

### 2. Install dependencies

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd server
npm install
```

### 3. Configure environment variables

**Client** - Create `.env` file in the `client` directory:
```env
VITE_SERVER=http://localhost:3000
```

**Server** - Create `.env` file in the `server` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SECRET_KEY=your_admin_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the application

**Start the server:**
```bash
cd server
npm run dev
```

**Start the client:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Client**: http://localhost:5173
- **Server**: http://localhost:3000

## 🏗️ Key Features Implementation

### Real-Time Communication
- Socket.IO integration for instant messaging
- Event-driven architecture for live updates
- Online/offline user status tracking
- Typing indicators for better UX

### State Management
- Redux Toolkit for global state
- RTK Query for server state and caching
- Automatic cache invalidation
- Optimistic updates

### Security
- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes and API endpoints

### Performance Optimization
- Infinite scroll pagination
- Image optimization with Cloudinary
- Lazy loading of components
- Memoization of components
- Efficient socket event handling

## 🚀 Deployment

 Frontend :  Vercel
 Backend : Hosted nodejs on Render
 Database : MongoDB Atlas
 File Storage : Cloudinary


