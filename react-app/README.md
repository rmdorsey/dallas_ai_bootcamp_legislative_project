# ⚛️ LegislAItive - React 19 + Vite Frontend

**Legislation Made Legible** - A comprehensive React 19 + Vite-based frontend for AI-powered legislative analysis and civic engagement. This application serves as the user interface for querying legislation, finding representatives, and understanding bills through intelligent AI conversation.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Application Views](#application-views)
- [Component Architecture](#component-architecture)
- [Development Scripts](#development-scripts)
- [Environment Variables](#environment-variables)
- [Docker Integration](#docker-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🧠 Overview

LegislAItive is a modern web application that interfaces with a FastAPI + ChromaDB backend to provide:
- **Legislative Search**: Find and analyze bills with AI-powered similarity matching
- **Representative Lookup**: Locate representatives by address with contact information
- **Bill Analysis**: Interactive PDF viewer with AI-powered chat for bill comprehension
- **Civic Engagement**: Tools for understanding and acting on legislation

The app features a chat-based interface that guides users through legislative research, bill analysis, and civic participation.

---

## ✨ Features

### 🏛️ Core Legislative Features
- **AI-Powered Search**: Query legislation with intelligent similarity matching
- **Representative Finder**: Address-based representative lookup with contact details
- **Bill Analyzer**: Side-by-side PDF viewer with AI chat interface
- **Suggestion System**: Contextual prompts for common legislative questions

### ⚛️ Technical Features
- **React 19**: Latest React features with concurrent rendering
- **Vite 5+**: Lightning-fast development and build tooling
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v4**: Modern utility-first styling with new architecture
- **Component Architecture**: Modular, reusable component design
- **State Management**: React hooks-based state management
- **Responsive Design**: Mobile-first responsive layout

### 💬 User Experience
- **Conversational Interface**: ChatGPT-like interaction for legislative queries
- **Smart Navigation**: Contextual navigation between different app views
- **Loading States**: Smooth animations and loading indicators
- **Auto-scroll**: Automatic message scrolling in chat interfaces
- **Suggestion Buttons**: Quick-access buttons for common questions

---

## 🛠️ Tech Stack

### Frontend Core
- **React 19** - Next-generation React with concurrent features
- **Vite 5+** - Ultra-fast build tooling and dev server
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS v4** - Utility-first CSS framework with new architecture

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing and optimization
- **Docker** - Containerized development environment

### Architecture Patterns
- **Component Composition** - Reusable UI components
- **Custom Hooks** - Shared logic and state management
- **Type-Safe Props** - Comprehensive TypeScript interfaces
- **Modular Structure** - Feature-based file organization

---

## 🗂️ Project Structure

```
react-app/
├── public/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainContent.tsx
│   │   ├── chat/               # Chat-related components
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatMessages.tsx
│   │   │   ├── Message.tsx
│   │   │   ├── BillsTable.tsx
│   │   │   └── ChatInput.tsx
│   │   ├── sidebar/            # Sidebar components
│   │   │   ├── SidebarHeader.tsx
│   │   │   ├── NewAnalysisButton.tsx
│   │   │   └── ConversationList.tsx
│   │   └── ui/                 # Base UI components
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── pages/                  # Page-specific components
│   │   └── BillAnalyzer/       # Bill analysis page
│   │       ├── BillAnalyzer.tsx
│   │       ├── components/     # Page-specific components
│   │       │   ├── BillAnalyzerHeader.tsx
│   │       │   ├── ChatPanel.tsx
│   │       │   ├── PDFPanel.tsx
│   │       │   ├── PDFToolbar.tsx
│   │       │   ├── PDFViewer.tsx
│   │       │   └── SuggestionButtons.tsx
│   │       └── data/
│   │           └── mockData.ts
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   ├── data/                   # Mock data and constants
│   │   └── mockData.ts
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── index.css              # Global styles with Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized development)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd react-app
npm install
```

### 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
npx tailwindcss init -p
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Visit Application

Open [http://localhost:8050](http://localhost:8050) (if using Docker)  
Or [http://localhost:5173](http://localhost:5173) (if running locally)

---

## 🖥️ Application Views

### Main Dashboard
- **Sidebar Navigation**: Conversation history and new analysis creation
- **Chat Interface**: AI-powered legislative conversation
- **Bills Table**: Interactive table with similarity matching
- **Representative Lookup**: Address-based representative search

### Bill Analyzer
- **Split View**: Chat interface (left) + PDF viewer (right)
- **Interactive PDF**: Zoom, pagination, and document navigation
- **AI Chat**: Context-aware responses about specific bills
- **Suggestion System**: Quick-access buttons for common questions

---

## 🏗️ Component Architecture

### Design Principles
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components can be used across different parts of the app
- **Type Safety**: All components use TypeScript interfaces
- **Composition**: Complex UIs built from simple, composable components

### Key Patterns
- **Container/Presentational**: Logic containers with presentation components
- **Custom Hooks**: Shared state logic and side effects
- **Event Delegation**: Proper callback handling between components
- **Conditional Rendering**: Dynamic UI based on application state

---

## 🧪 Development Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Docker Commands

```bash
# Start all services
docker-compose up

# Rebuild containers
docker-compose up --build

# Run npm commands in container
docker-compose run --rm react npm install
docker-compose run --rm react npm run build
```

---


---

## 🧩 Key Features Walkthrough

### 1. Legislative Search
- Users can search for bills using natural language
- AI-powered similarity matching returns relevant legislation
- Results displayed in an interactive table with similarity scores

### 2. Representative Finder
- Enter street address to find representatives
- Returns contact information and office details
- Integrated with legislative search for targeted advocacy

### 3. Bill Analyzer
- Side-by-side PDF viewer and AI chat
- Context-aware AI responses about specific bill sections
- Interactive navigation and zoom controls
- Suggestion buttons for common questions

### 4. Civic Engagement Tools
- Guidance on contacting representatives
- Advocacy tips and strategies
- Legislative process education

---

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent file structure
- Write descriptive commit messages

### Code Style
- ESLint configuration enforced
- Prettier formatting recommended
- Component names in PascalCase
- File names match component names

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Update documentation
5. Submit pull request

---

## 📚 Additional Resources

### Documentation
- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS v4 Guide](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/)

### Project Context
- Backend: FastAPI + ChromaDB + Ollama
- Database: Vector embeddings for legislative search
- AI Integration: Local LLM via Ollama
- Infrastructure: Docker containerization

---

> **"Legislation Made Legible"** - Designed to make legislative information accessible, understandable, and actionable for every citizen.

