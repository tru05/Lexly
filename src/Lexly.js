import React, { useState, useRef } from 'react';
import './Lexly.css';

// ... rest of the code remains the same
const Lexly = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSpeak = () => {
    if (text.trim() !== '') {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current.speak(utterance);
      utterance.onend = () => setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    synthRef.current.cancel();
    setIsSpeaking(false);
  };

  const handleSummarize = () => {
    if (text.trim() !== '') {
      const summaryText = summarizeText(text, 3);
      setSummary(summaryText);
    }
  };

  // Custom text summarization function
  // Custom text summarization function
  // Custom text summarization function
const summarizeText = (text, numSentences) => {
    if (!text) {
      return '';
    }
  
    // Split the text into sentences
    const sentences = text.match(/[^.!?;]+[.!?;]*/g);
  
    if (!sentences) {
      return '';
    }
  
    // Calculate sentence scores based on word frequency and sentence position
    const wordFrequencies = {};
    sentences.forEach((sentence, index) => {
      const words = sentence.toLowerCase().split(' ');
      words.forEach(word => {
        if (wordFrequencies[word]) {
          wordFrequencies[word]++;
        } else {
          wordFrequencies[word] = 1;
        }
      });
    });
  
    const sentenceScores = sentences.map((sentence, index) => {
      const words = sentence.toLowerCase().split(' ');
      let score = 0;
      words.forEach(word => {
        if (wordFrequencies[word]) {
          score += wordFrequencies[word];
        }
      });
      // Give higher scores to sentences at the beginning
      score += 1 / (index + 1);
      return score;
    });
  
    // Select top sentences based on scores
    const topSentences = sentences
      .map((sentence, index) => ({ sentence, score: sentenceScores[index] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, numSentences)
      .map(item => item.sentence);
  
    // Combine the selected sentences
    const summary = topSentences.join(' ');
  
    return summary;
  };
  return (
    <div>
      <h1>Lexly</h1>
      <p className="tagline">Making studying easier for dyslexic individuals</p>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
      />
      <div className="button-container">
        <button onClick={handleSpeak} disabled={isSpeaking}>
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </button>
        <button onClick={handleStop} disabled={!isSpeaking}>
          Stop
        </button>
        <button onClick={handleSummarize}>Summarize</button>
      </div>
      {summary && (
        <div className="summary">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
      <p className="info">
      Unlock the power of reading with Lexly – your dyslexia-friendly companion
      </p>
    </div>
  );
}

export default Lexly;
