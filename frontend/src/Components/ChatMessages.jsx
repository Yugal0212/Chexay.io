import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/Rightmenu.css';
import InputSection from './InputSection';
import useGetMsg from '../hooks/useGetMsg';
import { useSocketContext } from '../context/SocketContext';

const MessageSection =(friend) => {
  const {getMsg}=useGetMsg()
  const [messages, setMessages] = useState([]);
  const {massage} = useSocketContext()
  useEffect(()=>{
    getMsg(friend.friend.id).then((msg)=>{
      setMessages(msg)
    })
  },[!messages])
  useEffect(()=>{
    setMessages((prevMessages)=>[...prevMessages,{text:massage ,sender:'other'}]);
  },[massage])
  const messageEndRef = useRef(null);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, { text: newMessage, sender: 'user' }]);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Row className="message-section">
        <Col>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'sent' : 'other'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messageEndRef} /> {/* Scroll-to-bottom element */}
        </Col>
      </Row>
      <InputSection onSendMessage={handleSendMessage} receiverId={{id:friend.friend.id}}/>
    </>
  );
};

export default MessageSection;
