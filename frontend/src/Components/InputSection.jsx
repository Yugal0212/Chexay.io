import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaTree } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import '../styles/Rightmenu.css';
import useSendMsg from '../hooks/useSendMsg';

const InputSection = ({ onSendMessage ,receiverId}) => {
    const {sendMsg}=useSendMsg()
    const [message, setMessage] = useState("");
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMsg(receiverId.id, message);
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <Row className="input-section">
            <Col>
                <Form className="input-form"  onSubmit={handleSendMessage}>
                    <FaTree className="tree-icon" />
                    <Form.Control 
                        type="text" 
                        placeholder="Type a message..." 
                        className="message-input" id='msg-input'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="primary" type="submit" className="send-button">
                        <AiOutlineSend className="send-icon" />
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default InputSection;
