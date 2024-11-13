import React, { useState } from 'react';
import voiceRecorderIcon from './assets/voiceRecorderIcon.png';
import download from './assets/download.png';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

function ChatInterface() {
    const [message, setMessage] = useState("Waiting for input...");
    const [sqlOutput, setSqlOutput] = useState('');

    const handleRecordVoice = () => {
        const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
        if(!SpeechRecognition){
            alert("Your browser does not support speech recognition");
            return;
        }

//        try{
//         await navigator.mediaDevices.getUserMedia({audio: true});

         const recognition = new SpeechRecognition();
         recognition.lang = 'en-US';
         recognition.interimResults = true;
         recognition.continuous = false;

        recognition.onstart = () => {
            setMessage('Listening....');
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
            setMessage(transcript);
        };

        recognition.onerror = (event)  => {
        alert("Error ocurred in speech recognition: " + event.error);
        };

        recognition.onend = () => {
            setMessage((prevMessage) => (prevMessage === 'Listening....' ? 'No input detected' : prevMessage));
        };

        recognition.start();
    };

    const handleDownloadOutput = () => {
        const blob = new Blob([sqlOutput], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'sql-output.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    return(
    <Container className = "my-4 p-3 border rounded">
    {/*Message Display Area */}
    <Row className = "mb-3">
    <Col>
    <div className = "p-3 border rounded text-center">
    <p className = "m-0">{message}</p>
    </div>
    </Col>
    </Row>


    {/*voice recorder icon */}
    <Row className="mb-4">
    <Col className="text-center">
    <Button variant="primary" onClick={handleRecordVoice} className="rounded-circle">
    <img src={voiceRecorderIcon} alt="Voice recorder icon" style={{width: '24px', height:'24px' }} />
    </Button>
    </Col>
    </Row>


    {/* SQL Output Area */}
    <Row>
    <Col>
    <InputGroup className="border rounded p-2">
    <FormControl
    as="textarea"
    rows="2"
    readOnly
    value={sqlOutput || "SELECT * FROM messages WHERE content LIKE '....'"}
    className="border-0"
    />
    <Button variant ="outline-secondary" onClick={handleDownloadOutput}>
        <img src={download} alt="Download icon" style={{width: '24px', height:'24px' }} />

    </Button>
    </InputGroup>
    </Col>
    </Row>
    </Container>
    );
}

export default ChatInterface;