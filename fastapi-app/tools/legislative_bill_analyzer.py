# legislative_bill_analyzer.py
from typing import Optional, List, Dict, Any, Type
from langchain.tools import BaseTool
from langchain_core.pydantic_v1 import BaseModel, Field
from services.legislative_analysis_service import run_search_service_on_single_bill

# Step 1: Define an input schema for the tool's arguments using Pydantic.
# This provides clear, typed arguments for the agent to use.
class SearchToolInput(BaseModel):
    query: str = Field(description="The detailed, natural language question or topic to search for.")
    article_title: Optional[str] = Field(None, description="The exact title of an article to restrict the search.")
    article_number: Optional[str] = Field(None, description="The specific number of an article to focus the search.")
    section_number: Optional[str] = Field(None, description="The specific number of a section to search within.")

# Step 2: Define the tool by inheriting from BaseTool.
# This is the modern, robust way to create stateful tools.
class LegislativeAnalysisTools(BaseTool):
    """A tool for performing semantic search within a specific legislative bill."""
    
    # --- Tool Metadata ---
    name: str = "search_legislative_text"
    description: str = """
Performs a semantic search for relevant text within a pre-configured legislative bill.

This is the primary tool to use when you need to find information inside the bill that
answers a user's question or relates to a specific topic. It is ideal for locating
the source text for regulations, definitions, penalties, or requirements before
performing further analysis.

The 'query' should be a descriptive natural language question or topic. For example:
- "What are the rules for data storage and privacy?"
- "clauses related to funding for public schools"
- "the definition of 'eligible contractor'"

Use the optional filters (article_number, section_number) to narrow the search
if the user's request mentions a specific part of the bill.
    """
    args_schema: Type[BaseModel] = SearchToolInput
    
    # --- Tool State ---
    # These values will be provided when the tool is initialized.
    bill_number: int
    chamber: str

    # --- Tool Logic ---
    # The _run method defines what the tool does. Note it no longer needs **kwargs.
    def _run(
        self,
        query: str,
        article_title: Optional[str] = None,
        article_number: Optional[str] = None,
        section_number: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Use the tool."""
        return run_search_service_on_single_bill(
            query=query,
            bill_number=self.bill_number,
            chamber=self.chamber,
            article_title=article_title,
            article_number=article_number,
            section_number=section_number
        )
