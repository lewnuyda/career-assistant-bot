# 🎯 Career Tools Suite

Career Tools Suite is a **React-based application** that combines two powerful tools in one platform:

1. **📄 Resume Analyzer** – Analyze candidate resumes against job descriptions and rank them automatically.
2. **💬 Career Chatbot** – Provide interactive career guidance, resume tips, and interview preparation via AI chat.

This repository includes both the frontend (React) and exported **n8n workflows** for seamless automation and integration with external services such as Gmail, Supabase, and Google Sheets.

---

## 🚀 Features

- **2-in-1 App** – Both Resume Analyzer and Career Chatbot in a single React project.
- **AI-Powered Analysis** – Uses the **DeepSeek R1 model** to evaluate resumes and provide career advice.
- **n8n Integration** – Automates workflows for resume matching, chat handling, logging, and notifications.
- **Email Automation** – Sends emails to shortlisted candidates via the Gmail API.
- **Data Storage** – Saves resumes, rankings, and chat logs into Supabase, Google Sheets and Airtable.
- **Responsive UI** – Built with **React + Tailwind CSS** for a clean, modern experience.

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Automation:** n8n (Open-source workflow automation)
- **AI:** DeepSeek R1 model (integrated via n8n HTTP Request)
- **Data Storage:** Supabase, Google Sheets and Airtable
- **Email Integration:** Gmail API
- **Languages:** JavaScript (ES6+)
- **Styling:** Tailwind CSS or Material Tailwind
- **Package Manager:** npm or yarn

---

# 📄 Resume Analyzer

Resume Analyzer is a **React-based module** inside Career Tools Suite that analyzes candidate resumes against job descriptions.

### 🔄 n8n Workflows

- **Resume Analysis** – Sends job description + resumes to **DeepSeek R1** for ranking.
- **Data Logging** – Stores analysis results in Supabase and Google Sheets.
- **Email Notification** – Sends automated emails to shortlisted candidates.

### 📽️ Demo

<p align="center">
  <img src="https://github.com/lewnuyda/career-assistant-bot/blob/main/src/assets/resume-analyzer.gif" width="600" alt="Resume Analyzer Demo"/>
</p>

#### Sample Email Received by Shortlisted Candidate

<p align="center">
  <img src="https://github.com/lewnuyda/career-assistant-bot/blob/main/src/assets/email-notif-1.png" width="600" alt="Sample Email Screenshot"/>
</p>

<p align="center">
  <img src="https://github.com/lewnuyda/career-assistant-bot/blob/main/src/assets/email-notif-2.png" width="600" alt="Sample Email Screenshot"/>
</p>

#### Candidate Data Saved in Google Sheets

<p align="center">
  <img src="https://github.com/lewnuyda/career-assistant-bot/blob/main/src/assets/save-candidates.png" width="600" alt="Save Candidates Screenshot"/>
</p>

---

# 💬 Career Chatbot

Career Chatbot is the **second module** inside Career Tools Suite that provides interactive career guidance and job-seeking advice.

### 🔄 n8n Workflows

- **Career Chat Handling** – Routes user queries to **DeepSeek R1** and receives career-related answers.
- **Data Logging** – Stores chat history in Airtable.

### 📽️ Demo

<p align="center">
  <img src="https://github.com/lewnuyda/career-assistant-bot/blob/main/src/assets/career-chatbot.gif" width="600" alt="Career Chatbot Demo"/>
</p>

#### Chat Logs Saved in Airtable

<p align="center">
  <img src="https://github.com/lewnuyda/career-assistant-bot/blob/main/src/assets/chat-history.png" width="600" alt="Chat Logs in Airtable"/>
</p>

---

## 🧠 How It Works

### Resume Analyzer

1. Recruiter uploads a job description and candidate resumes.
2. Data is sent to an n8n workflow.
3. **DeepSeek R1** evaluates resumes and returns rankings, scores, and reasoning.
4. Results are saved in Supabase and Google Sheets.
5. Shortlisted candidates receive an automated email via Gmail.
6. Recruiters can view results on the React frontend.

### Career Chatbot

1. User opens the chat interface in the React frontend.
2. User submits a career-related question (e.g., “How can I improve my resume?”).
3. Query is sent to an n8n workflow.
4. **DeepSeek R1** processes the query and generates a tailored response.
5. Response is displayed in the React UI.
6. Chat logs are saved to Airtable.

---

## ⚙️ Installation & Setup (React App)

### **1. Clone the repository**

```bash
git clone https://github.com/lewnuyda/career-assistant-bot.git
cd career-assistant-bot
```

### **2. Install dependencies**

```bash
npm install
# or
yarn install
```

### **3. Run the development server**

```bash
npm run dev
# or
yarn dev
```
