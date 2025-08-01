from typing_extensions import TypedDict
from typing import Annotated
from langchain_ollama import ChatOllama

##### NEED THIS FOR LOCAL DEVELOPMENT #####
import os
from dotenv import load_dotenv
# Load environment variables from the .env file located in the parent directory
load_dotenv(dotenv_path='../.env')

llm = ChatOllama(
    model="llama3.1",
    base_url="http://localhost:11434" # Use the service name from docker-compose
)
##### NEED THIS FOR LOCAL DEVELOPMENT #####

# result=llm.invoke("Hello")
# print(result)

from typing import List
from typing_extensions import TypedDict
from pydantic import BaseModel,Field

class MedicalAnalyst(BaseModel):
    affiliation:str=Field(
        description="Primary qualification of the medical anaylyst"
    )
    name:str=Field(
        description="Name of the Medical Analyst "
    )
    role:str=Field(
        description="Role of the medical analyst in the context of the research topic",
    )
    description:str=Field(
        description="Description of the medical analyst research focus,concerns and research objectives to achieve"
    )
    # The @property decorator lets you define a method that can be accessed like a regular attribute, without needing to use parentheses ().
    @property
    def persona(self)->str:
        return f" Name:{self.name} \n Role:{self.role} \n affiliation:{self.affiliation}\n Description:{self.description}\n"
    
class Perspectives(BaseModel):
    medicalanalysts:List[MedicalAnalyst]=Field(
        description="Comprehensive list of medical analyst with there roles and affiliations "
    )

class GenerateMedicalAnalystState(TypedDict):
    researchTopic:str # Research topic
    max_medical_analysts:int # number of analysts
    human_analyst_feedback:str # human feedback
    medicalanalysts:List[MedicalAnalyst] #Medical analyst asking questions


from langgraph.graph import START, END, StateGraph
# MemorySaver is a basic type of checkpointer that saves the state of your graph directly in your computer's RAM.
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

medical_analyst_instructions="""You are tasked with creating a set of Medical AI analyst personas. Follow these instructions carefully:

1. First, review the medical research topic:
{researchTopic}
        
2. Examine any medical editorial feedback or medical research that has been optionally provided to guide creation of the medical analysts that will work to generate medicines for the research or you can your own knowledge for this task: 
        
{human_analyst_feedback}
    
3. Determine the most interesting research parts based upon documents and / or feedback above.
                    
4. Pick the top {max_medical_analysts} research.

5. Assign one analyst to each research part."""

def  create_medical_analysts(state:GenerateMedicalAnalystState):
    """Create medical analysts"""

    researchTopic=state["researchTopic"]
    max_medical_analysts=state["max_medical_analysts"]
    # The code uses .get() for human_analyst_feedback because that piece of data is optional, while the others are required.
    human_analyst_feedback=state.get('human_analyst_feedback')

    #Enforece structured output
    structured_llm=llm.with_structured_output(Perspectives)

    #System message
    system_message=medical_analyst_instructions.format(researchTopic=researchTopic,
                                                       human_analyst_feedback=human_analyst_feedback,
                                                       max_medical_analysts=max_medical_analysts)
    
    #Generate questions

    analysts=structured_llm.invoke([SystemMessage(content=system_message)]+[HumanMessage(content="Generate the set of medical analyst")])

    #Write the list of analysis to state
    return {"medicalanalysts":analysts.medicalanalysts}

def human_feedback(state:GenerateMedicalAnalystState):
    """No operation node that should be interrupted"""
    pass

def should_continue(state:GenerateMedicalAnalystState):
    """Return the next node to execute"""

    #check if human feedback

    human_analyst_feedback=state.get("human_analyst_feedback",None)
    if( human_analyst_feedback):
        return "create_medical_analysts"
    return END

#Add nodes and edges 

medical_analyst_builder=StateGraph(GenerateMedicalAnalystState)

medical_analyst_builder.add_node("create_medical_analysts",create_medical_analysts)
medical_analyst_builder.add_node("human_feedback",human_feedback)
medical_analyst_builder.add_edge(START,"create_medical_analysts")
medical_analyst_builder.add_edge("create_medical_analysts","human_feedback")
medical_analyst_builder.add_conditional_edges("human_feedback",should_continue,["create_medical_analysts",END])
#compile

memory=MemorySaver()
graph=medical_analyst_builder.compile(interrupt_before=["human_feedback"],checkpointer=memory)

# Input
max_medical_analysts=4
topic="Vaccines for chicken pox diseaes"
# creates a configuration dictionary that tells your LangGraph application which specific conversation or execution "thread" to work on.
# Think of it like a case file number for a customer service agent.
thread={"configurable":{"thread_id":"1"}}

# Run the graph until the first interruption
# stream_mode is a parameter in LangGraph's .stream() method that controls the format of the output you get as the graph runs. 
# It lets you choose how much detail you want to see at each step of the execution.
for event in graph.stream({"researchTopic":topic,"max_medical_analysts":max_medical_analysts},thread,stream_mode="values"):
     analysts=event.get("medicalanalysts",'')
     if analysts:
          for analyst in analysts:
               print(f"Name :{analyst.name}")
               print(f"Affiliation:{analyst.affiliation}" )
               print(f"Role:{analyst.role}")
               print(f"Description:{analyst.description}")
               print("-"*50)


# ADD HITL PART
print("******PT 2: HUMAN FEEDBACK")
state=graph.get_state(thread)

# The .next attribute specifically reveals the name of the upcoming task. It's a way to inspect the graph's plan before it continues.
state.next

# We now update the state as if we are the human_feedback node
graph.update_state(thread, {"human_analyst_feedback": 
                            "Add in someone from a research for children chicken pox"}, as_node="human_feedback")

# Continue the graph execution
for event in graph.stream(None, thread, stream_mode="values"):
    # Review
    analysts = event.get('medicalanalysts', '')
    if analysts:
        for analyst in analysts:
            print(f"Name: {analyst.name}")
            print(f"Affiliation: {analyst.affiliation}")
            print(f"Role: {analyst.role}")
            print(f"Description: {analyst.description}")
            print("-" * 50) 

# MORE HUMAN FEEDBACK
print("******PT 3: MORE HUMAN FEEDBACK")
further_feedback = None
graph.update_state(thread, {"human_analyst_feedback": further_feedback}, as_node="human_feedback")

# Continue the graph execution to end
for event in graph.stream(None, thread, stream_mode="updates"):
    print("--Node--")
    node_name = next(iter(event.keys()))
    print(node_name)

final_state = graph.get_state(thread)
analysts = final_state.values.get('medicalanalysts')

print(analysts)

final_state.next

print(analysts)