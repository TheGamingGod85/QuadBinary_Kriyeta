import streamlit as st
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langchain.agents import create_sql_agent, initialize_agent, AgentType
from langchain.memory import ConversationBufferMemory
from langchain.tools import Tool
from dotenv import load_dotenv
from langchain_groq import ChatGroq
import os

# Load environment variables
load_dotenv()

# Initialize Streamlit session
st.set_page_config(page_title="SENTINEL AI", layout="centered")
st.markdown("<h1 style='text-align: center;'>SENTINEL AI</h1>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center;'>Hi there!😊 I am Sentinel, your personal Home Assistant. You may ask any queries related to electricity consumption of devices</p>", unsafe_allow_html=True)

# Initialize session state
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

if 'main_agent' not in st.session_state:
    # Load keys
    groq_api_key = os.getenv("GROQ_API_KEY2")
    # api_key2 = os.getenv("AAYUSHYA_KEY")

    # Initialize LLM
    llm = ChatGroq(model="llama-3.3-70b-versatile", groq_api_key=groq_api_key, temperature=0.1)

    # Setup SQL database
    db = SQLDatabase.from_uri(
        "postgresql://postgres.ujbarelcmgynzdgalrmi:kriyeta%401234@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
    )
    toolkit = SQLDatabaseToolkit(db=db, llm=llm)

    # Create the SQL Agent with LangChain standard ReAct format
    sql_agent_executor = create_sql_agent(
        llm=llm,
        toolkit=toolkit,
        verbose=True,
        handle_parsing_errors=True,
    )

    # Wrap SQL Agent as a Tool
    sql_agent_tool = Tool(
        name="SQL Data Analyst",
        description="Use this tool to answer questions  SQL database and all related queries, always use this only.",
        func=lambda q: sql_agent_executor.invoke({"input": q})["output"],
        return_direct=True
    )

    # Main conversational ReAct agent with memory and SQL tool
    main_memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    main_agent = initialize_agent(
        tools=[sql_agent_tool],
        llm=llm,
        agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
        memory=main_memory,
        verbose=True,
        handle_parsing_errors=True
    )

    st.session_state.main_agent = main_agent
    st.session_state.memory = main_memory

# Input and interaction
user_input = st.chat_input("Ask something about your data")
if user_input:
    st.session_state.chat_history.append(("You", user_input))
    with st.spinner("Thinking..."):
        try:
            response = st.session_state.main_agent.run(user_input)
        except Exception as e:
            response = f"❌ Error: {str(e)}"
    st.session_state.chat_history.append(("AI", response))

# Display chat history
st.markdown("<h3 style='text-align: center;'> Chat </h3>", unsafe_allow_html=True)
for sender, message in st.session_state.chat_history:
    with st.chat_message(sender):
        st.markdown(message)