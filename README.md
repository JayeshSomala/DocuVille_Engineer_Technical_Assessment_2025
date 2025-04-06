# DocuVille_Engineer_Technical_Assessment_2025
DocuVille_Engineer_Technical_Assessment_2025

# 🧠 Document Similarity Checker

## 👋 Introduction
This is a solution to the **Software Engineer Technical Assessment [2025]** for Docuville.ai. The goal of the project is to build a system that can efficiently compare two large text documents and return a similarity score between 0 and 1.

---

## 🚀 Features

- Upload two `.txt` files via a modern UI
- Displays side-by-side comparison
- Highlights differences and similarities in color
- Shows a similarity score (0-1)
- Clean and responsive **dark mode** design
- Efficient backend using cosine similarity

---

## 🖼️ Screenshots

### Main UI
![Main UI](./screenshots/main-ui.png)

### Highlighted Differences
![Differences](./screenshots/differences-highlighted.png)

---

## 🧩 System Design (High-Level)

[User Uploads Two Text Files]
           ↓
    [React Frontend App]
           ↓
 [Node.js + Express Backend API]
           ↓
 [Preprocessing: Tokenization using Natural]
           ↓
 [Jaccard Similarity Calculation]
           ↓
 [Word-Level Differences via diff Library]
           ↓
 [Frontend Displays Similarity Score + Diff Highlights]

✅ Tokenization retains stopwords for better scoring.
✅ Differences are calculated at the word level using diffWords.

---

## ⚙️ Technologies Used

### Frontend
- ReactJS
- HTML/CSS (Custom Dark Theme)
- Axios

### Backend
- Node.js (Express)
- natural for tokenization and NLP tasks
- diff for textual difference detection

---

## 🛠️ How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/JayeshSomala/DocuVille_Engineer_Technical_Assessment_2025.git
cd DocuVille_Engineer_Technical_Assessment_2025
```
### 2. Start the Backend
```bash
cd doc-similarity-backend
node index.js
```
### 3. Start the Frontend
```bash
cd doc-similarity-frontend
npm install
npm start
```
Backend should run at http://localhost:5000/compare, and frontend at http://localhost:3000.


🧪 Sample Input Files
You can find sample .txt files in the /samples folder for quick testing:

textSample_1.txt

textSample_2.txt

🧠 Reflections & Future Improvements
Experience:
This was a rewarding challenge. It tested my ability to blend UI/UX, performance, and algorithm design.

If given more time:

Support for more formats (PDF, DOCX)

Caching frequent comparisons

Improving accuracy with NLP techniques (Spacy, BERT)

Authentication for user-level document history

Deploying on Vercel + Render or GCP with persistent logging

