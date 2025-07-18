import re
import bisect

class DataPreprocessor:
    def __init__(self):
        self.H1_SECTIONS = [
            "Preamble", "Principles", "Constitutional Issues",
            "Business, Commerce, and Transportation", "Finance", "Education",
            "Health and Human Services", "Criminal and Civil Justice", "State Affairs",
            "Government and Election Integrity", "National Defense and Foreign Affairs",
            "Resolutions"
        ]
        self.H2_SECTIONS = [
            "Preservation of Constitution", "Citizen Rights", "State Sovereignty",
            "Markets and Regulation", "Retirement, Savings, Unions", "Energy and Environment",
            "Transportation", "COVID Response", "Privacy, Information Freedom, Internet",
            "Spending Restraint", "School Finance and Property Taxation",
            "Opposition to Market-Distorting Tax and Fiscal Subsidies", "Transparency and Oversight",
            "Parents' Rights", "Curriculum", "Governance", "Higher Education",
            "Healthcare Independence", "Government-funded Health Programs", "Mental Health",
            "Homosexuality and Gender Issues", "Substance Abuse and Addiction",
            "Life-Affirming Health Care Concepts", "Environmental Health",
            "Rights and Protections", "Courts, Prosecutions, Restitution", "Law Enforcement",
            "Family Law", "Heritage Preservation", "Individual Rights and Freedoms",
            "Family and Gender Issues", "Pro-Life Issues", "Land Use", "State Governance",
            "Government Operations", "Elections", "Veterans Affairs",
            "Border Security and Immigration", "Foreign Affairs"
        ]

    def process_pdf_data(self, pages_data):
        all_docs = []

        # 1. Aggregate text and track page breaks
        full_text = ""
        page_start_indices = [0]
        for _, text in pages_data:
            full_text += text + "\n"
            page_start_indices.append(len(full_text))

        def get_page_number(char_index):
            return bisect.bisect_right(page_start_indices, char_index)

        # 2. Extract content boundaries
        content_start_pos = full_text.find("Preamble")
        content_end_pos = full_text.rfind("Index")
        if content_start_pos == -1 or content_end_pos == -1:
            content_start_pos = 0
            content_end_pos = len(full_text)

        # 3. Find H1, H2, and doc entries
        h1_pattern = re.compile(r"^\s*(" + "|".join(re.escape(h) for h in self.H1_SECTIONS) + r")\s*$", re.MULTILINE)
        h2_pattern = re.compile(r"^\s*(" + "|".join(re.escape(h) for h in self.H2_SECTIONS) + r")\s*$", re.MULTILINE)
        doc_pattern = re.compile(r"^\s*(\d+)\.\s+([A-Z].*)", re.MULTILINE)

        h1_locations = [{'pos': m.start(), 'text': m.group(1).strip()} for m in h1_pattern.finditer(full_text)]
        h2_locations = [{'pos': m.start(), 'text': m.group(1).strip()} for m in h2_pattern.finditer(full_text)]
        doc_matches = list(doc_pattern.finditer(full_text, content_start_pos, content_end_pos))

        # 4. Special preamble and intro
        try:
            preamble_start = next(h['pos'] for h in h1_locations if h['text'] == 'Preamble')
            preamble_end = next(h['pos'] for h in h1_locations if h['text'] == 'Principles')
            all_docs.append({
                "page_content": full_text[preamble_start:preamble_end].strip(),
                "metadata": {"type": "preamble", "main_section": "Preamble", "sub_section": "N/A", "title": "N/A", "number": "N/A", "page_number": get_page_number(preamble_start)}
            })
        except StopIteration:
            pass

        # 5. Parse each doc section
        for i, match in enumerate(doc_matches):
            doc_start = match.start()
            doc_end = doc_matches[i+1].start() if i+1 < len(doc_matches) else content_end_pos

            # Find H1/H2
            current_h1 = next((h['text'] for h in reversed(h1_locations) if h['pos'] < doc_start), "N/A")
            current_h1_pos = next((h['pos'] for h in reversed(h1_locations) if h['pos'] < doc_start), -1)
            current_h2 = next((h['text'] for h in reversed(h2_locations) if h['pos'] < doc_start and h['pos'] > current_h1_pos), "N/A")

            content = full_text[doc_start:doc_end].strip()
            doc_type = "plank" if current_h1 not in ["Principles", "Resolutions"] else current_h1.lower()

            all_docs.append({
                "page_content": content,
                "metadata": {
                    "type": doc_type,
                    "main_section": current_h1,
                    "sub_section": current_h2,
                    "title": match.group(2).split(":")[0].strip(),
                    "number": match.group(1),
                    "page_number": get_page_number(doc_start)
                }
            })

        return all_docs
