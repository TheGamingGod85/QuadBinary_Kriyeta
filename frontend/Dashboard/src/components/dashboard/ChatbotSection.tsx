import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Assuming chatHistory is for initial load or examples; it won't persist or contain new AI responses naturally
import { chatHistory } from "@/data/mockData";
import { ChatMessage as ImportedChatMessage } from "@/types/dashboard";
import { MessageSquare, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Define a type for potentially handling bold parts if your backend signals them
// Although the current backend just includes ** markers in the string.
// For simplicity here, we'll just display the raw string including the markers.
// To render bold, you would need a markdown library or string parsing logic for rendering.


export interface LocalChatMessage {

  id: string;

  sender: "user" | "assistant" | "system"; // Added "system" as a valid sender

  content: string;

  timestamp: Date;

}


export function ChatbotSection() {
  // Initialize messages with history, or potentially fetch history from backend too
  const [messages, setMessages] = useState<LocalChatMessage[]>(chatHistory);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading/sending status
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to keep the chat scrolled to bottom

  // Effect to scroll to the latest message whenever the messages state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Depend on the messages array

  const handleSendMessage = async () => { // Make the function asynchronous
    // Prevent sending if input is empty or if a message is already being processed
    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMessage: LocalChatMessage = {
      id: `msg-${Date.now()}-user`, // Unique ID for the message
      sender: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    // Add the user's message to the chat state immediately
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const questionToSend = inputValue.trim(); // Store value before clearing input
    setInputValue(""); // Clear the input field right away
    setIsLoading(true); // Set loading state to true

    try {
      // ** Replace the simulated timeout with an API call to your backend **
      // The backend should implement the Python logic you provided.
      const response = await fetch('http://localhost:5000/api/chat', { // <-- Use full URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: questionToSend }),
      });

      // Check if the API call was successful
      if (!response.ok) {
        // Handle non-2xx responses
        throw new Error(`API request failed with status: ${response.status}`);
      }

      // Parse the JSON response from the backend
      // Assuming the backend returns a JSON object like { "answer": "AI response text" }
      const responseData = await response.json();
      const aiResponseText = responseData.answer; // Get the AI's text response

      // Create the AI's message object
      const assistantMessage: LocalChatMessage = {
        id: `msg-${Date.now()}-assistant`, // Unique ID
        sender: "assistant",
        content: aiResponseText, // Use the response from the backend
        timestamp: new Date()
      };

      // Add the AI's message to the chat state
      setMessages(prevMessages => [...prevMessages, assistantMessage]);

    } catch (error) {
      console.error("Error sending message or receiving response:", error);
      // Optionally, add an error message to the chat display
      const errorMessage: LocalChatMessage = {
          id: `msg-${Date.now()}-error`,
          sender: "system", // Use a 'system' sender to style errors differently
          content: `Failed to get response: ${error instanceof Error ? error.message : "Unknown error"}`, // Display a simple error message
          timestamp: new Date()
       };
       setMessages(prevMessages => [...prevMessages, errorMessage]);

    } finally {
      // Always set loading state to false when the process finishes (success or failure)
      setIsLoading(false);
    }
  };

  // Optional: Helper function to render content, especially if you want to bold parts
  // based on the ** markers in the response. This requires parsing the text.
  // For this example, we'll keep displaying the raw text with ** markers.
  const renderMessageContent = (content: string) => {
      // A more advanced approach would parse content like "Some **important** info"
      // and return an array of elements or use a markdown rendering library.
      // Example simple logic (doesn't handle complex cases):
      const parts = content.split('**');
      return parts.map((part, index) => {
          if (index % 2 === 1) {
              // This part was inside ** **, render it bold
              return <strong key={index}>{part}</strong>;
          } else {
              // Normal text
              return part;
          }
      });
  };


  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-sentinel-primary" />
          Energy Assistant
        </CardTitle>
        <CardDescription>
          Get personalized energy-saving tips and insights
        </CardDescription>
      </CardHeader>
      {/* Make CardContent take remaining space and handle overflow */}
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0"> {/* Added p-0 */}
         {/* ScrollArea needs a fixed height or to be within a flex container */}
        <ScrollArea className="flex-1 max-h-[calc(100vh-250px)] px-6 py-4"> {/* Adjusted classes, add a max-height if not in flex or parent has known height */}
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start" // Center system messages like errors
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm", // Moved text-sm here
                    message.sender === "user"
                      ? "bg-sentinel-primary text-white"
                      : message.sender === "assistant"
                        ? "bg-sentinel-light text-sentinel-dark"
                        : "bg-red-100 text-red-800" // Style for error messages
                  )}
                >
                  {/* Use the helper function for potential bold rendering */}
                  {/* This currently just displays the text with ** markers */}
                  {renderMessageContent(message.content)}

                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {/* Div to scroll into view */}
            <div ref={messagesEndRef} />
            {/* Optional: Loading indicator message */}
             {isLoading && (
               <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 text-sm bg-gray-200 text-gray-700">
                      ...
                   </div>
               </div>
             )}
          </div>
        </ScrollArea>
      </CardContent>
      {/* Use py-4 instead of pt-4 if you want padding above and below input area */}
      <CardFooter className="py-4 border-t px-6"> {/* Adjusted classes */}
        <div className="flex w-full gap-2">
          <Input
            placeholder={isLoading ? "Thinking..." : "Ask about your energy usage..."} // Change placeholder while loading
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              // Trigger send on Enter key press, but only if not loading
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage();
              }
            }}
            className="flex-1"
            disabled={isLoading} // Disable input while loading
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={!inputValue.trim() || isLoading} // Disable button if input is empty or loading
          >
            {/* Optionally show a loading spinner icon */}
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
               <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}