import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiService from './service/ApiService';
import TradeTable from './components/TradeTable';

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sqlOutput, setSqlOutput] = useState('');

  // Speech to text
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [tradeData, setTradeData] = useState(null);

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
      // apiService.postData(text)
      console.log("" + finalTranscript + interimTranscript)
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(newRecognition);
  }, []);

  const handleStartListening = () => {
    if (recognition) {
      console.log("Listening")
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
    console.log("Getting the Trade Data")

    apiService.getData().then(
      response => {
        setTradeData(response)
      }
    )


  };

  const handleClear = () => {
    setText('')
  };

  return (
    <Container >
      <Container className="my-4 p-3 border rounded shadow-sm" style={{ maxWidth: '800px' }}>
        {/* User Input Area with Voice Recorder Button */}
        <Row className="mb-4">
          <Col>
            <InputGroup className="border rounded p-2 bg-light">
              <Button
                onClick={isListening ? handleStopListening : handleStartListening}
                className="ml-2 rounded-circle"
                style={{ width: '70px', height: '70px', backgroundColor: '#1e88e5', border: 'none', outline: 'none' }}
              >
                <span role="img" aria-label={isListening ? 'Stop Listening' : 'Start Listening'} style={{ fontSize: '1rem' }}>
                  {isListening ? 'Stop 🔇' : 'start 🔊'}
                </span>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        {/* Displaying User Input */}
        <Row className="mb-4">
          <Col>
            <div className="p-3 border rounded text-center bg-light">
              <p className="m-0" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{text}</p>
            </div>
          </Col>
        </Row>
        {/* Submit Button */}
        <Row className="mb-4">
          <Col className="text-center">
            <Button
              onClick={handleSubmit}
              className="ml-2"
              style={{ width: '100px', height: '50px', backgroundColor: '#1e88e5', border: 'none', outline: 'none' }}
            >
              <span role="img" aria-label="Submit" style={{ fontSize: '1rem' }}>
                Query
              </span>
            </Button>
            <Button
              onClick={handleClear}
              className="ml-2"
              style={{ width: '100px', height: '50px', backgroundColor: '#1e88e5', border: 'none', outline: 'none', }}
            >
              <span role="img" aria-label="Submit" style={{ fontSize: '1rem' }}>
                Clear
              </span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="border rounded p-2 bg-light">
              <FormControl
                as="textarea"
                rows="4"
                readOnly
                value={sqlOutput || "DB Query"}
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
      {tradeData != null ? <h3>Result : </h3> : <p></p>}
      {tradeData != null ? <TradeTable data={tradeData} /> : <p></p>}
    </Container>
  );
}

export default ChatInterface;