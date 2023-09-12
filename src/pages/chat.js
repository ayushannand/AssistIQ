import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { parsePrompt } from '../functions/parser.js';
//Styles and Icons
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Chip from '@mui/material/Chip';
import ResetLogo from '@mui/icons-material/RestartAltRounded';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../styles/chat.module.css';
import OutputCard from '@/components/OutputCard.js';
import InputCard from '@/components/InputCard.js';

export default function ChatPage() {
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [identifier, setIdentifier] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEmailChange = (email) => {
    setIdentifier(email);
    setChatLog([
      { role: 'assistant', content: `Email Changed  to ${email}, feel free to ask questions about this user` },
    ]);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const prompt = inputValue.trim();
    const newIdent = await parsePrompt(prompt);

    if (newIdent && newIdent.type === 'email') {
      setIdentifier(newIdent.val);
    }
  
    if (!identifier || (identifier.type === 'email' && !identifier.val)) {
      setChatLog(prevChatLog => [
        ...prevChatLog,
        { role: 'assistant', content: 'Session Started! Please include an email in your prompt to start' },
      ]);
      setIsLoading(false);
      return;
    }
    

    try {
      const queryParams = {};
        queryParams.email = identifier;
      const customerResponse = await axios.get('/api/customer', {
        params: queryParams,
      });
      const { customer } = customerResponse.data;
  
      const conversation = [
        ...chatLog,
        { role: 'user', content: prompt },
      ];
  
      setChatLog(conversation);
  
      const assistantResponse = await axios.post(`/api/query?email=${customer.email}`, { conversation });
  
      if (assistantResponse.data.error) {
        throw new Error(assistantResponse.data.error);
      }
      setChatLog(prevChatLog => [
        ...prevChatLog,
        { role: 'assistant', content: assistantResponse.data.response },
      ]);
    } catch (error) {
      setChatLog(prevChatLog => [
        ...prevChatLog,
        { role: 'assistant', content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };
  
  const handleResetClick = () => {
    const confirmed = window.confirm('Are you sure you want to reset the conversation?');
    if (confirmed) {
      window.location.reload();
    }
  };

  return (
    <div className={styles['chat-container']}>
      <form className={styles['chat-input']} onSubmit={handleChatSubmit}>
        <input
          className={styles['input-field']}
          type="text"
          placeholder="Enter prompt"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={isLoading} className='cursor-pointer rounded-lg'>
          {isLoading ? <Chip icon={<CircularProgress size={20}/>} label="Thinking!!"/> : 
          <Chip icon={<SendRoundedIcon />} label="Send" />  }
        </button>
        <button className={`mx-2 p-2  text-black w-10 h-10 hover:bg-[#4742428a] rounded-full flex justify-center items-center`} onClick={handleResetClick}>
          <ResetLogo/>
        </button>
      </form>
      <div className={styles['chat-log']} > 
        {chatLog.slice(0).reverse().map((message, index) => (
          <div key={index} className={`${styles.message} ${styles[message.role]}`}>
            {message.role === 'user' ? (
              <InputCard message={message.content} />
            ) : (
              <OutputCard content={message.content} onEmailClick={handleEmailChange}/>
            )}
          </div>
        ))}
      </div>
      <h2 className='p-2 bg-yellow-100 text-center mx-[200px] rounded-lg mt-2 mb-[-2]'>Welcome to <span className='font-semibold'>Agent Intelligent Virtual Assistant - AIVA</span></h2>
    </div>
  );
  
}
