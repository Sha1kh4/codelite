# CareerFit

### Discover Your Perfect Career Path with AI

The AI-enhanced resume analysis and career guidance project tackles a common problem faced by job seekers: aligning their resumes with employer expectations and evolving market demands. Many individuals, especially students and early-career professionals, struggle to present their skills and experiences effectively. Often, their resumes lack the right keywords, formatting, and relevance to attract recruiters or pass through Applicant Tracking Systems (ATS).

This project solves this by leveraging AI to provide personalized feedback on resumes and career profiles. It helps users identify gaps in their skill-sets and highlights strengths relative to job market trends. By analyzing job descriptions from industry databases and comparing them with users' resumes, the AI offers real-time, tailored recommendations to optimize resumes for specific roles. This allows job seekers to better align their qualifications with market demands, improving their chances of being noticed by recruiters.

Additionally, the project supports continuous learning by keeping users updated on emerging skills and industry trends. Ultimately, it helps individuals improve their career prospects through data-driven, personalized career guidance.

## Features

- **Job Search**: Retrieve job postings based on a job title.
- **Analytics**: Get analytics data related to job postings.
- **Resume Review**: Upload PDF resumes for review against a specified job title and required skills.

## Requirements

- Python 3.12.x
- [Node.js](https://nodejs.org/) (v14 or later)
- pip

## Backend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sha1kh4/codelite.git
   cd codelite
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:

   ```bash
   pip install -r req.txt
   ```

4. Create a `.env` file in the root directory and add your API keys:

   ```dotenv
   API_KEY=your_gemini_api_key  # Get your Gemini API key from https://ai.google.dev/gemini-api/docs/api-key
   RAPIDAPI_KEY=your_rapidapi_key  # Get your RapidAPI key from https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
   ```

## Usage

1. Start the Flask server:

   ```bash
   Flask run
   ```

2. The API will be available at `http://127.0.0.1:5000/`.

### API Endpoints

- **GET /**: Returns a simple greeting.
- **GET /jobs**: Retrieve job postings based on a job title.

  **Query Parameters**:

  - `jobs`: The job title to search for.

- **GET /analytics**: Get analytics related to job postings.

  **Query Parameters**:

  - `jobs`: The job title for analytics.

- **POST /upload**: Upload job title and skills for resume review.

  **Form Data**:

  - `job_title`: The job title for the review.
  - `skills`: Required skills for the job.

- **POST /upload_file**: Upload a PDF resume for review.

  **Form Data**:

  - `file`: The PDF resume file.
  - `job_title`: The job title for the review.

## Example Requests

### Get Job Postings

```http
GET /jobs?jobs=Software%20Engineer
```

### Get Analytics

```http
GET /analytics?jobs=Data%20Scientist
```

### Upload Resume

```http
POST /upload_file
Content-Type: multipart/form-data

job_title: Software Engineer
file: [your_resume.pdf]
```

## Error Handling

The API returns JSON responses for errors, including appropriate HTTP status codes and error messages. Common error responses include:

- `400 Bad Request`: Missing required parameters or invalid file format.
- `500 Internal Server Error`: Issues with processing requests or file extraction.

## Frontend

The frontend is built using [Next.js](https://nextjs.org/), a React framework that enables server-side rendering and static site generation for React applications. The frontend serves as the user interface for the CareerFit application, allowing users to interact with the backend API.

### Features

- **Responsive Design**: The app is designed to be fully responsive, adapting to various screen sizes and devices.
- **User Authentication**: Integrates Firebase for user authentication (login and signup).
- **Career Path Insights**: Displays information about how the CareerFit service works and encourages user sign-up.
- **Email Capture Form**: Collects user emails for further engagement.

### Environment Variables

Create a `.env.local` file in the frontend directory and add the following:

```dotenv
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000  # API endpoint for the backend
```

### Firebase Setup

To enable user authentication via Firebase:

1. Set up a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Add your app to the project and configure authentication methods (Email/Password, Google, etc.).
3. Obtain your Firebase configuration and include it in your frontend code.

### Frontend Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:3000`.

### Frontend Structure

- **app**: Contains the main application pages (e.g., Home, Auth).
- **Components**: Reusable UI components, such as buttons and inputs.
- **Styles**: CSS files and styling utilities for consistent design.

### Development

- Use standard React and Next.js practices for development.
- Ensure to follow accessibility best practices to enhance user experience.
  Here's the updated README to include instructions for using Docker Compose to set up the entire application:

## Using Docker Compose

You can run both the backend and frontend services using Docker Compose. This simplifies the setup process and ensures that all dependencies are properly configured.

### Prerequisites

Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.

### Running the Application

1. Change environment variables in `docker-compose.yml` as needed. For example, if you want to use different API keys or set other environment variables, you can define them directly under the `environment` section for each service:

   ```yaml
   services:
     backend:
       environment:
         API_KEY: your_new_gemini_api_key
         RAPIDAPI_KEY: your_new_rapidapi_key
   ```

2. Run the following command in the terminal:

   ```bash
   docker-compose up
   ```

3. The application will be accessible at:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

## Contributing

Feel free to submit issues or pull requests to enhance this project. Contributions are welcome!
