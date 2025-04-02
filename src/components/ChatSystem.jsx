import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ChatSystem() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: 'Hey @Bob, can you review this?', urgent: false, type: 'receiver' },
    { id: 2, sender: 'You', text: 'Hi there!', urgent: false, type: 'sender' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    room: '',
  });

  // Simulate replies from Alice
  useEffect(() => {
    const replyTimeouts = [];
    if (messages[messages.length - 1].sender === 'You') {
      replyTimeouts.push(
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: prev.length + 1, sender: 'Alice', text: 'Sure, I’ll take a look!', urgent: false, type: 'receiver' },
          ]);
        }, 2000),
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: prev.length + 1, sender: 'Alice', text: 'Looks good, just a few tweaks needed.', urgent: false, type: 'receiver' },
          ]);
        }, 4000)
      );
    }
    return () => replyTimeouts.forEach(clearTimeout);
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', text: newMessage, urgent: false, type: 'sender' }]);
      setNewMessage('');
    }
  };

  const handleScheduleMeeting = () => {
    if (meetingDetails.date && meetingDetails.time && meetingDetails.room) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'You',
          text: `Scheduled a meeting on ${meetingDetails.date} at ${meetingDetails.time} in ${meetingDetails.room}`,
          urgent: false,
          type: 'sender',
        },
      ]);
      setShowModal(false);
      setMeetingDetails({ date: '', time: '', room: '' });
    }
  };

  return (
    <div className="chat-system">
      <div className="chat-header">
        <input type="text" placeholder="Search chats..." className="search-bar" />
        <button onClick={() => setShowModal(true)}>Schedule Meeting</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`message ${msg.type} ${msg.urgent ? 'urgent' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong>{msg.sender}: </strong>
            <span>{msg.text}</span>
            <button onClick={() => setMessages(messages.map(m => m.id === msg.id ? { ...m, urgent: !m.urgent } : m))}>
              {msg.urgent ? 'Unmark Urgent' : 'Mark Urgent'}
            </button>
          </motion.div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Meeting Scheduler Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Schedule a Meeting</h3>
            <label>
              Date:
              <input
                type="date"
                value={meetingDetails.date}
                onChange={(e) => setMeetingDetails({ ...meetingDetails, date: e.target.value })}
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                value={meetingDetails.time}
                onChange={(e) => setMeetingDetails({ ...meetingDetails, time: e.target.value })}
              />
            </label>
            <label>
              Room:
              <select
                value={meetingDetails.room}
                onChange={(e) => setMeetingDetails({ ...meetingDetails, room: e.target.value })}
              >
                <option value="">Select a room</option>
                <option value="Room A">Room A</option>
                <option value="Room B">Room B</option>
                <option value="Virtual">Virtual</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleScheduleMeeting}>Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSystem;