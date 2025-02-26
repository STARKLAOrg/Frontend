import  { useState } from 'react';
import { Mic, ChevronLeft, ChevronRight, LightbulbIcon, FileIcon } from 'lucide-react';
import ElizaBot from 'elizabot';
import starklaImage from "@/assets/starkla.jpg";
import styles from './aurora-chat.module.css'; 

const StarklaChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const eliza = new ElizaBot();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputText.trim()) {
      const userMessage = {
        type: 'text',
        content: inputText,
        isEliza: false,
      };

      setMessages([...messages, userMessage]);
      setInputText('');

      setIsTyping(true);

      setTimeout(() => {
        const elizaResponse = {
          type: 'text',
          content: eliza.transform(inputText),
          isEliza: true,
        };

        setMessages((prev) => [...prev, elizaResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, {
        type: 'file',
        content: file.name,
        isEliza: false,
      }]);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 w-full">
     
      <div className="w-full px-6 py-2 flex items-center dark:border-gray-500 border-b border-gray-100">
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={starklaImage} 
              alt="Starkla Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">STARKLA</h1>
            <h2 className="text-sm text-gray-600 dark:text-gray-300">Software Architecture lesson - Chapter 1</h2>
          </div>
        </div>

        
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-gray-600 dark:text-gray-300 text-sm">Current unit: 1</span>
          <div className="flex gap-1">
            <button 
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 transition-colors"
              aria-label="Previous unit"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              className="p-1.5 rounded-lg dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Next unit"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

     
      <div className="px-6 py-4 w-full flex  flex-col gap-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.isEliza ? styles.messageEliza : styles.messageUser
            } shadow-md p-4 `}
          >
            {message.type === 'file' ? (
              <div className="flex items-center gap-2">
                <FileIcon className="w-5 h-5 text-blue-600" />
                <span>{message.content}</span>
              </div>
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        ))}

        
        {isTyping && (
          <div className={`${styles.message} ${styles.messageEliza} shadow-md p-4`}>
            <div className={styles.dotAnimate}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      
      <div className="w-full border-t border-gray-100 dark:border-gray-500 px-6 py-4 dark:bg-gray-800 bg-white sticky bottom-0 shadow-lg">
        <div className="flex gap-4 items-center w-full">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            <LightbulbIcon className="w-5 h-5" />
            <span>Start learning</span>
          </button>

          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Write something related to the topic"
              className="w-full dark:border dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-colors shadow-md"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <label className="cursor-pointer p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <FileIcon className="w-5 h-5" />
              </label>
              <button 
                className="p-1.5 text-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-blue-50 rounded-full transition-colors shadow-md"
                aria-label="Voice Input"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default StarklaChat;
