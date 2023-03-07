import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name && message) {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      };
      const result = await fetch('http://localhost:5000/messages', options);
      setName('');
      setMessage('');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
        <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;