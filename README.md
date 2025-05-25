# 🧠 AI-Powered Support Admin Dashboard

This is a full-featured customer support admin panel powered by AI. Inspired by tools like **Intercom** and **Zendesk**, this dashboard helps support agents provide efficient and intelligent responses to customer queries with the assistance of an AI copilot.

🔗 **Live Site**: [beyond-chat-git-main-aryan4884s-projects.vercel.app](https://beyond-chat-git-main-aryan4884s-projects.vercel.app/)

---

## 🎯 Objective

To create a smart and responsive dashboard that:

- Displays **customer conversations** on the **left pane**
- Shows **AI-generated suggestions** and assistant tools on the **right pane**
- Provides a **central message composer** for agents with tone adjustment and rephrase features
- Boosts response time with **“Ask Fin Copilot”** hover actions and **click-to-copy** interactions

---

## ✨ Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| 🧵 Customer Chat Inbox | List of customers with real-time query threads                              |
| 💬 Conversation Thread | View full customer-agent conversation                                       |
| ⚙️ Central Composer    | Agent reply box with AI tone + rephrase controls                            |
| 🤖 AI Copilot          | Smart suggestions using static logic (replaceable with OpenAI/Mistral)      |
| ✂️ Copy-Paste to Composer | Copy AI response directly into the agent composer                        |
| 🧠 Ask Fin Copilot     | Hover on user message to trigger suggestion options                         |
| 🎨 Dark/Light Mode     | Toggle between light and dark themes                                        |
| 🔁 Tone Adjust & Rephrase | Regenerate responses with different tones or rephrased variants          |
| 🧪 Mock AI Responses   | Fetched from `utils/suggest.js` (can be wired to real LLM API)              |

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
- **AI Integration**: Static data with option to connect OpenAI/Mistral
- **UI Components**: Responsive, accessible with dark mode support
- **Deployment**: [Vercel](https://vercel.com)


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
🧠 Credits
Made by Aryan Raj 
