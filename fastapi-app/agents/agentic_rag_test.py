from typing_extensions import TypedDict
from typing import Annotated
from langchain_ollama import ChatOllama
import chromadb
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

##### NEED THIS FOR LOCAL DEVELOPMENT #####
import os
from dotenv import load_dotenv
# Load environment variables from the .env file located in the parent directory
load_dotenv(dotenv_path='../.env')

os.environ["LANGCHAIN_TRACING_V2"] = "false"

# llm = ChatOllama(
#     model="llama3.1",
#     base_url="http://localhost:11434" # Use the service name from docker-compose
# )
##### NEED THIS FOR LOCAL DEVELOPMENT #####

# result=llm.invoke("Hello")
# print(result)

embedding_model_name = 'sentence-transformers/all-mpnet-base-v2'
chroma_collection_name = 'legislation-89-1'
chroma_server_host = 'localhost'
chroma_server_port = 8001

# --- Initialize ChromaDB and Retriever ---
print(f"\nInitializing embedding model: {embedding_model_name}")
embeddings = HuggingFaceEmbeddings(model_name=embedding_model_name)

print(f"Connecting to ChromaDB at {chroma_server_host}:{chroma_server_port}")
client = chromadb.HttpClient(host=chroma_server_host, port=chroma_server_port)

# Initialize the vector store with the existing collection
vectorstore = Chroma(
    client=client,
    collection_name=chroma_collection_name,
    embedding_function=embeddings,
)

print("\nChromaDB query application initialized. Ready for queries.")
print("Type 'exit' or 'quit' to end the application.")

# results_with_scores = vector_store.similarity_search_with_score(query, k=5)
retriever = vectorstore.as_retriever()
results = retriever.invoke("Any bills on banning tax payer lobbying?")
print("\n--- Search Results ---")
print(results)

# --- Search Results ---
# print(f"Found {len(results)} relevant documents for your query:\n")

for i, doc in enumerate(results):
    print(f"--- Document {i+1} ---")
    
    # Print the main content, with a little indentation
    print("\nCONTENT:")
    print(f"  {doc.page_content}")
    
    # Print the metadata
    print("\nMETADATA:")
    # Loop through the metadata dictionary and print each key-value pair
    for key, value in doc.metadata.items():
        print(f"  - {key}: {value}")
        
    print("\n" + "="*80 + "\n") # Print a separator for readability

from langchain.tools.retriever import create_retriever_tool

retriever_tool=create_retriever_tool(
    # This object knows how to search your specific database of documents for relevant information.
    retriever,
    # This is the name of the tool. It's a unique identifier that the AI agent will use internally when it decides to call this specific tool.
    "retriever_vector_db_blog",
    # The agent's language model reads this description to understand what the tool does and when to use it. When a user asks a question, 
    # the agent will look at the descriptions of all its available tools to find the one best suited to answer the query.
    "Search and view legislative bills from the 89th special legislative session for the state of Texas.",
)

retriever_tool

tools=[retriever_tool]


# This is a generic type hint used to indicate that a variable should be a "sequence" of items, which means any ordered, 
# list-like collection such as a list ([]) or a tuple (()). Using Sequence makes your code more flexible because a function 
# expecting a Sequence[str] can accept either a list of strings or a tuple of strings.
from typing import Annotated, Sequence
from typing_extensions import TypedDict

# The LangChain Hub is an online repository where developers can find, share, and use pre-made components, most notably prompts.
from langchain import hub
from langchain_core.messages import BaseMessage, HumanMessage

from langgraph.graph.message import add_messages
# StrOutputParser is often the last step in a chain to strip away all the extra information and give you just the clean text.
from langchain_core.output_parsers import StrOutputParser
# A PromptTemplate acts as a blueprint for your prompts. 
from langchain_core.prompts import PromptTemplate

from pydantic import BaseModel, Field

class AgentState(TypedDict):
    # The add_messages function defines how an update should be processed
    # Default is to replace. add_messages says "append"
    messages: Annotated[Sequence[BaseMessage], add_messages]

def agent(state):
    """
    Invokes the agent model to generate a response based on the current state. Given
    the question, it will decide to retrieve using the retriever tool, or simply end.

    Args:
        state (messages): The current state

    Returns:
        dict: The updated state with the agent response appended to messages
    """
    print("---CALL AGENT---")
    messages = state["messages"]
    model = ChatOllama(
        model="llama3.1",
        base_url="http://localhost:11434" # Use the service name from docker-compose
    )
    model = model.bind_tools(tools)
    response = model.invoke(messages)
    # We return a list, because this will get added to the existing list
    return {"messages": [response]}

from typing import Annotated, Literal, Sequence
from typing_extensions import TypedDict

### Edges
def grade_documents(state) -> Literal["generate", "rewrite"]:
    """
    Determines whether the retrieved documents are relevant to the question.

    Args:
        state (messages): The current state

    Returns:
        str: A decision for whether the documents are relevant or not
    """

    print("---CHECK RELEVANCE---")

    # Data model
    class grade(BaseModel):
        """Binary score for relevance check."""

        binary_score: str = Field(description="Relevance score 'yes' or 'no'")

    # LLM
    model = ChatOllama(
        model="llama3.1",
        base_url="http://localhost:11434" # Use the service name from docker-compose
    )

    # LLM with tool and validation
    llm_with_tool = model.with_structured_output(grade)

    # Prompt
    prompt = PromptTemplate(
        template="""You are a grader assessing relevance of a retrieved document to a user question. \n
        Here is the retrieved document: \n\n {context} \n\n
        Here is the user question: {question} \n
        If the document contains keyword(s) or semantic meaning related to the user question, grade it as relevant. \n
        Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question.""",
        input_variables=["context", "question"],
    )

    # Chain
    # The pipe symbol (|) is the key. It links components together, taking the output from the component on the left and "piping" it 
    # as the input to the component on the right.
    chain = prompt | llm_with_tool

    # This code unpacks a list of conversational messages to extract specific pieces of information: the original user question and the content 
    # of the most recent message.
    # messages = state["messages"]: This retrieves the entire history of the conversation, which is stored as a list under the key 
    # "messages" in a state object.
    messages = state["messages"]
    # last_message = messages[-1]: This gets the very last message from that list. In a RAG (Retrieval-Augmented Generation) workflow, 
    # this is often the output from a previous step, like the documents returned by a retriever tool.
    last_message = messages[-1]

    # question = messages[0].content: This isolates the very first message in the conversation (messages[0]) and then extracts its 
    # text content using .content. This is assumed to be the original question the user asked.
    question = messages[0].content
    # This takes the last message that was just identified and extracts its text content. This variable is named docs, implying that the content of 
    # the last message is expected to be the retrieved documents.
    docs = last_message.content

    scored_result = chain.invoke({"question": question, "context": docs})

    score = scored_result.binary_score

    if score == "yes":
        print("---DECISION: DOCS RELEVANT---")
        return "generate"

    else:
        print("---DECISION: DOCS NOT RELEVANT---")
        print(score)
        return "rewrite"

def generate(state):
    """
    Generate answer

    Args:
        state (messages): The current state

    Returns:
         dict: The updated message
    """
    print("---GENERATE---")
    messages = state["messages"]
    question = messages[0].content
    last_message = messages[-1]

    docs = last_message.content

    # Prompt
    prompt = hub.pull("rlm/rag-prompt")

    # LLM
    llm = ChatOllama(
        model="llama3.1",
        base_url="http://localhost:11434" # Use the service name from docker-compose
    )

    # Post-processing
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    # Chain
    rag_chain = prompt | llm | StrOutputParser()

    # Run
    response = rag_chain.invoke({"context": docs, "question": question})
    return {"messages": [response]}

print("*" * 20 + "Prompt[rlm/rag-prompt]" + "*" * 20)
prompt = hub.pull("rlm/rag-prompt").pretty_print()  #

def rewrite(state):
    """
    Transform the query to produce a better question.

    Args:
        state (messages): The current state

    Returns:
        dict: The updated state with re-phrased question
    """

    print("---TRANSFORM QUERY---")
    messages = state["messages"]
    question = messages[0].content

    msg = [
        HumanMessage(
            content=f""" \n
    Look at the input and try to reason about the underlying semantic intent / meaning. \n
    Here is the initial question:
    \n ------- \n
    {question}
    \n ------- \n
    Formulate an improved question: """,
        )
    ]

    # Grader
    model = ChatOllama(
        model="llama3.1",
        base_url="http://localhost:11434" # Use the service name from docker-compose
    )
    response = model.invoke(msg)
    return {"messages": [response]}

from langgraph.graph import END, StateGraph, START
from langgraph.prebuilt import ToolNode
from langgraph.prebuilt import tools_condition

# Define a new graph
workflow = StateGraph(AgentState)

# Define the nodes we will cycle between
workflow.add_node("agent", agent)  # agent
retrieve = ToolNode([retriever_tool])
workflow.add_node("retrieve", retrieve)  # retrieval
workflow.add_node("rewrite", rewrite)  # Re-writing the question
workflow.add_node(
    "generate", generate
)  # Generating a response after we know the documents are relevant
# Call agent node to decide to retrieve or not
workflow.add_edge(START, "agent")

# Decide whether to retrieve
workflow.add_conditional_edges(
    "agent",
    # Assess agent decision
    tools_condition,
    {
        # Translate the condition outputs to nodes in our graph
        "tools": "retrieve",
        END: END,
    },
)

# Edges taken after the `action` node is called.
workflow.add_conditional_edges(
    "retrieve",
    # Assess agent decision
    grade_documents,
)
workflow.add_edge("generate", END)
workflow.add_edge("rewrite", "agent")

# Compile
graph = workflow.compile()

graph.invoke({"messages":"What are the bills on banning tax payer lobbying?"})