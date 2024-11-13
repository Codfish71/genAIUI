import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sqlOutput, setSqlOutput] = useState('');

  // Speech to text
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support the Web Speech API');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = 'en-US';

    newRecognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setText(finalTranscript + interimTranscript);
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(newRecognition);
  }, []);

  const handleStartListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
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

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <Container className="my-4 p-3 border rounded shadow-sm" style={{ maxWidth: '800px' }}>
      {/* User Input Area with Voice Recorder Button */}
      <Row className="mb-4">
        <Col>
          <InputGroup className="border rounded p-2 bg-light">
            <FormControl
              as="textarea"
              rows="2"
              value={message}
              onChange={handleInputChange}
              className="border-0 bg-light"
              placeholder="Type your message here..."
              style={{ fontSize: '1rem', color: '#495057' }}
            />
            <Button
              onClick={isListening ? handleStopListening : handleStartListening}
              className="ml-2 rounded-circle"
              style={{ width: '70px', height: '70px', backgroundColor: '#AAF0D1', border: 'none', outline: 'none' }}
            >
              <span role="img" aria-label={isListening ? 'Stop Listening' : 'Start Listening'} style={{ fontSize: '2rem' }}>
                {isListening ? '🔇' : '🔊'}
              </span>
            </Button>
          </InputGroup>
        </Col>
      </Row>
      {/* Displaying User Input */}
      <Row className="mb-4">
        <Col>
          <div className="p-3 border rounded text-center bg-light">
            <p className="m-0" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{message}</p>
          </div>
        </Col>
      </Row>
      {/* Submit Button */}
      <Row className="mb-4">
        <Col className="text-center">
          <Button
            onClick={handleSubmit}
            className="ml-2"
            style={{ width: '100px', height: '50px', backgroundColor: '#AAF0D1', border: 'none', outline: 'none' }}
          >
            <span role="img" aria-label="Submit" style={{ fontSize: '1rem' }}>
              SUBMIT
            </span>
          </Button>
        </Col>
      </Row>
      {/* Displaying Submitted Messages
      <Row className="mb-4">
        <Col>
          <div className="p-3 border rounded bg-light">
            <h4>Submitted Messages</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {messages.map((msg, index) => (
                <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row> */}
      {/* SQL Output Area */}
      <Row>
        <Col>
          <InputGroup className="border rounded p-2 bg-light">
            <FormControl
              as="textarea"
              rows="4"
              readOnly
              value={sqlOutput || "SELECT * FROM messages WHERE content LIKE '....'"}
              className="border-0 bg-light"
              style={{ fontSize: '1rem', color: '#495057' }}
            />
            <Button onClick={handleDownloadOutput} className="ml-2" style={{ width: '90px', backgroundColor: '#AAF0D1', border: 'none', outline: 'none' }}>
              <span role="img" style={{ fontSize: '3rem' }}>📂</span>
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatInterface;



// import React, { useState } from 'react';
// // import voiceRecorderIcon from './assets/voiceRecorderIcon.png';
// // import download from './assets/download.png';
// import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

// function ChatInterface() {    
//     const [message, setMessage] = useState("Waiting for input...");    
//     const [sqlOutput, setSqlOutput] = useState('');    

//     const handleRecordVoice = () => {        
//         alert("Voice recording feature will be implemented here!");    
//     };    

//     const handleDownloadOutput = () => {        
//         const blob = new Blob([sqlOutput], { type: 'text/plain' });        
//         const url = URL.createObjectURL(blob);        
//         const link = document.createElement('a');        
//         link.href = url;        
//         link.download = 'sql-output.txt';        
//         link.click();        
//         URL.revokeObjectURL(url);    
//     };    

//     return(    
//     <Container className = "my-4 p-3 border rounded">    {/*Message Display Area */}    
//     <Row className = "mb-3">    <Col>    
//     <div className = "p-3 border rounded text-center">    
//         <p className = "m-0">{message}</p>    
//     </div>    
//     </Col>        
//     </Row>    {/*voice recorder icon */}    
//     <Row className="mb-3">    
//         <Col className="text-center">    
//             <Button variant="primary" onClick={handleRecordVoice} className="rounded-circle">    
//                 {/* <img src={voiceRecorderIcon} alt="Voice recorder icon" style={{width: '24px', height:'24px' }} />     */}
//             </Button>    
//         </Col>    
//     </Row>    {/* SQL Output Area */}    
//             <Row>    
//                 <Col>    
//                 <InputGroup className="border rounded p-2">    
//                 <FormControl    as="textarea"    rows="2"    readOnly    value={sqlOutput || "SELECT * FROM messages WHERE content LIKE '....'"}    
//                 className="border-0"    />    
//                 <Button variant ="outline-secondary" onClick={handleDownloadOutput}>        
//                     {/* <img src={download} alt="Download icon" style={{width: '24px', height:'24px' }} />     */}
//                 </Button>    
//                 </InputGroup>    
//                 </Col>    
//             </Row>    
//     </Container>    

//     );
// }

// export default ChatInterface;