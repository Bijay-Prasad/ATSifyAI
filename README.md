# ATSify AI: ATS ko karo beat, Interview ki seat!

ATSify AI is a modern web application that leverages AI to analyze resumes and optimize them for Applicant Tracking Systems (ATS). Built with Next.js, React, and Puter.js, it helps users upload, review, and improve their resumes with actionable feedback and scoring.

## Features

- **AI-Powered Resume Analysis:** Upload your resume and receive instant feedback and ATS optimization tips.
- **Recent Resume Tracking:** View your 4 most recent analyzed resumes, scores, and suggestions.
- **Secure Authentication:** Sign in/out with Puter.js authentication.
- **File Management:** Upload, preview, and manage your resume files.
- **Modern UI:** Responsive design with theme toggling and smooth animations.
- **Persistent Storage:** Resume data and feedback are stored securely using Puter.js KV storage.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **State Management:** Zustand
- **AI & Storage:** [Puter.js API](https://js.puter.com/v2/)
- **Icons & UI:** Lucide, Custom Components

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Bijay-Prasad/ATSifyAI.git
   cd ATSifyAI
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory and environment variable:
     ```
     NEXT_PUBLIC_PUTER_API_URL
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage

- **Upload Resume:** Click "Upload new resume" to submit your file.
- **View Insights:** See ATS scores and feedback for each resume.
- **Authentication:** Sign in to save and track your resume analyses.
- **Theme Toggle:** Switch between light and dark modes.

## Folder Structure

- `app/` — Next.js pages and layouts
- `components/` — Reusable UI and logic components
- `lib/` — Puter.js integration and state management
- `types/` — TypeScript type definitions
- `styles/` — Global and custom styles

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

## License

[MIT](LICENSE)

---

**Made with ❤️ using Next.js & Puter.js**