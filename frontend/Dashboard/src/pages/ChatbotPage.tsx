
import { Sidebar } from "@/components/dashboard/Sidebar";
// import { ChatbotSection } from "@/components/dashboard/ChatbotSection";

const ChatbotPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Energy Assistant</h1>
          <p className="text-muted-foreground">Get AI-powered insights and recommendations</p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* <ChatbotSection /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
