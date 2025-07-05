import { useEffect, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

    if(!user1 || !token) {
      navigate("/login");
      return;
    }
    // console.log(JSON.parse(user1));

    let parsedUser;
    try {
      parsedUser = JSON.parse(user1);  // Ensure proper parsing
    } catch (error) {
      console.error("Error parsing user data:", error);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/chatbot/api/chat', 
        { 
          message: input, 
          isNewSession: messages.length === 0 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            User_Data: JSON.stringify(parsedUser)
          }
        }
      );
      
      if (response.data.status === 'success') {
        setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
      } else {
        throw new Error(response.data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages, 
        { 
          text: error.response?.data?.message || "Sorry, I couldn't process your request", 
          sender: "bot" 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors z-index:10000"
      >
        <MessageSquare size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 p-4 border rounded-2xl shadow-lg bg-white flex flex-col">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold">AI Assistant</h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-100"
                    : "mr-auto bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-gray-100 max-w-xs p-2 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;