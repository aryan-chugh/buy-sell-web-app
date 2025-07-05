const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chatSessions = new Map();

const talkbot = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, isNewSession } = req.body;
        const userId = req.headers.user_data ? JSON.parse(req.headers.user_data).id : 'anonymous';
        
        // Clear existing session if this is a new conversation
        if (isNewSession) {
            chatSessions.delete(userId);
        }

        // Get or create chat history
        let chat = chatSessions.get(userId);
        if (!chat) {
            chat = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 2048,
                }
            });
            chatSessions.set(userId, chat);
        }

        // Generate response
        // console.log(fullPrompt);
        // const result = await model.generateContent(fullPrompt);
        // const response = await result.response.text();
        // console.log(response);
        // return res.status(200).json({ 
        //     reply: response,
        //     status: 'success'
        // });

        const result = await chat.sendMessage(message);
        const response = await result.response.text();

        return res.status(200).json({ 
            reply: response,
            status: 'success'
        });
    } catch (error) {
        console.error('Error processing chat:', error);
        return res.status(500).json({ 
            error: 'Error processing request',
            message: error.message,
            status: 'error'
        });
    }
};

module.exports = {
    talkbot,
};