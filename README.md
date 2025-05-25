🧠 AI-Powered Support Admin Dashboard
This is a full-featured customer support admin panel powered by AI. Inspired by tools like Intercom and Zendesk, this dashboard helps support agents provide efficient and intelligent responses to customer queries with the assistance of an AI copilot.

🔗 Live Site: beyond-chat-git-main-aryan4884s-projects.vercel.app

🎯 Objective
To create a smart and responsive dashboard that:

Displays customer conversations on the left pane

Shows AI-generated suggestions and assistant tools on the right pane

Provides a central message composer for agents with tone adjustment and rephrase features

Boosts response time with “Ask Fin Copilot” hover actions and click-to-copy interactions

✨ Features
Feature	Description
🧵 Customer Chat Inbox	List of customers with real-time query threads
💬 Conversation Thread	View full customer-agent conversation
⚙️ Central Composer	Agent reply box with AI tone + rephrase controls
🤖 AI Copilot Suggestions	Smart suggestions using local AI logic or OpenAI
✂️ Copy-Paste to Composer	Copy AI response directly into the agent composer
🧠 Ask Fin Copilot	Hover on user message to generate a relevant prompt
🎨 Dark/Light Mode	Toggle between dark and light themes
🎛 Tone Adjust & Rephrase	Modify AI response tone or regenerate
🧪 Mock AI Responses	Suggestions from static utils/suggest.js file (pluggable with OpenAI)

🛠 Tech Stack
Frontend: React.js, Tailwind CSS
State Management: useState, useEffect, useRef
AI Integration: Static JSON suggestion engine (can plug into OpenAI/Mistral APIs)
UI Components: Modular and responsive with full dark/light theme support
Deployment: Vercel

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Aryan4884/BeyondChat01.git
cd ai-support-dashboard
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npm run dev
```
