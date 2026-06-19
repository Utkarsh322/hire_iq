# HireIQ — AI-Powered HR Shortlisting Agent

HireIQ is a modern, AI-powered web application that helps HR professionals evaluate, score, and shortlist candidates fairly and consistently against any Job Description. It leverages advanced LLMs (Gemini, Groq, OpenAI) to provide structured evaluations, ensuring an unbiased and transparent shortlisting process.

## Features

- **Multi-Provider AI Support**: Seamlessly switch between Gemini, Groq, and OpenAI models.
- **Smart Resume Parsing**: Upload PDF, DOCX, or TXT resumes directly. Local parsing via `pdf.js` and `mammoth.js` ensures privacy.
- **Structured Scoring Rubric**: Candidates are scored out of 10 across 5 key dimensions: Skills Match, Experience Relevance, Education & Certs, Project/Portfolio, and Communication Quality.
- **Differentiated & Tie-Breaking**: The system artificially differentiates candidates to ensure no two applicants receive the exact same score, making your final decision easier.
- **Underrated Candidate Flag**: Automatically identifies one candidate who might normally fall into the "Maybe" or "No Hire" pile but shows exceptional hidden potential.
- **Human-in-the-Loop Overrides**: HR can manually force a verdict (Hire/No Hire/Maybe) with a documented reason, without altering the raw objective scores.
- **Export Capabilities**: Export the complete evaluation report as JSON or CSV.
- **Premium UI/UX**: Responsive glassmorphism design with automatic light/dark theme persistence.

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **APIs**: Google Gemini API, Groq API, OpenAI API
- **Libraries**: `pdf.js` (PDF parsing), `mammoth.js` (DOCX parsing)

## Setup & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Utkarsh322/hire_iq.git
   cd hire_iq
   ```

2. **Install dependencies:**
   This project runs on a secure Express backend. Install dependencies using:
   ```bash
   npm install
   ```

3. **Provide API Keys:**
   - Ensure you have a `.env` file in the root directory.
   - Define your Groq API key:
     ```env
     GROQ_API_KEY=your_groq_api_key_here
     ```
   *(Note: Keeping API keys in the `.env` file ensures they remain securely on the server side and are never exposed to the frontend client.)*

4. **Run the application:**
   Start the Node.js Express server:
   ```bash
   npm start
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your web browser.

## Project Structure

- `index.html`: Main application interface and structure.
- `styles.css`: All styling, including light/dark theme and responsive layouts.
- `app.js`: Core application logic, API integrations, and UI state management.

## Industry Standards & Best Practices

- **Security**: API keys remain entirely client-side.
- **Modularity**: Codebase organized with clear separation of concerns (HTML/CSS/JS).
- **Error Handling**: Robust try/catch blocks with automatic retries and model fallbacks for rate limits/quota exhaustion.

## License

MIT License
