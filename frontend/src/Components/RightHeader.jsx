import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FaVideo, FaPhone } from 'react-icons/fa';
import '../styles/Rightmenu.css';

const HeaderSection = ({ friend }) => {
  return (
    <Row className="header-section align-items-center" id='head-sec'>
      <Col xs="auto">
        <Image src={friend.icon} roundedCircle className="profile-pic" alt="Profile" />
      </Col>
      <Col>
        <h2 className="profile-name">{friend.name}</h2>
        <p className="profile-status">{friend.message}</p>
      </Col>
      <Col xs="auto" className="icons">
        <FaVideo className="header-icon" />
        <FaPhone className="header-icon" />
      </Col>
    </Row>
  );
};

export default HeaderSection;
