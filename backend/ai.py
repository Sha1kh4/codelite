import os
import json
from typing import Dict, List, Optional
import google.generativeai as genai
from google.ai.generativelanguage_v1beta.types import content
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


@dataclass
class ReviewResponse:   
    """Data class to structure the review response"""
    suggestions: List[str]
    link_to_course_searches: List[str]
    link_to_youtube_searches: List[str]
    missing_technical_skills: List[str]

class ResumeReviewer:
    """Class to handle resume review operations using Google's Generative AI"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the reviewer with API key and configuration"""
        self.api_key = os.getenv('API_KEY')
        genai.configure(api_key=self.api_key)
        self.model = self._configure_model()
        
    def _configure_model(self):
        """Configure the Gemini model with specific parameters"""
        generation_config = {
            "temperature": 1.0,  # Slightly reduced for more focused responses
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_schema": content.Schema(
                type=content.Type.OBJECT,
                required=["suggestions", "link_to_course_searches", "link_to_youtube_searches", "missing_technical_skills"],
                properties={
                    "suggestions": content.Schema(
                        type=content.Type.ARRAY,
                        items=content.Schema(type=content.Type.STRING),
                    ),
                    "link_to_course_searches": content.Schema(
                        type=content.Type.ARRAY,
                        items=content.Schema(type=content.Type.STRING),
                    ),
                    "link_to_youtube_searches": content.Schema(
                        type=content.Type.ARRAY,
                        items=content.Schema(type=content.Type.STRING),
                    ),
                    "missing_technical_skills": content.Schema(
                        type=content.Type.ARRAY,
                        items=content.Schema(type=content.Type.STRING),
                    ),
                },
            ),
            "response_mime_type": "application/json",
        }
        
        return genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
            system_instruction=self._get_system_prompt()
        )
    
    def _get_system_prompt(self) -> str:
        """Return the system prompt for the AI model"""
        return """
        You are an expert career advisor specializing in tech industry resume reviews.
        
        Analyze the provided resume against the job requirements and provide:
        1. Specific suggestions for resume improvements
        2. Relevant online courses that would help fill skill gaps
        3. Recommended YouTube channels/videos for learning
        4. List of missing skills or qualifications
        
        Format your response as a JSON object with the following structure:
        {
            "suggestions": ["suggestion1", "suggestion2", ...],
            "link_to_course_searches": ["course1", "course2", ...],
            "link_to_youtube_searches": ["search1", "search2", ...],
            "missing_technical_skills": ["skill1", "skill2", ...](most important first)
        }
        
        Focus on actionable, specific advice that will help the candidate improve their chances.
        """
    
    def _preprocess_resume(self, resume: str) -> str:
        """Clean and format the resume text"""
        # Remove excessive whitespace and normalize line endings
        resume = " ".join(resume.split())
        return resume
    
    def _validate_response(self, response) -> bool:
        """Validate the model's response format"""
        try:
            required_fields = ["suggestions", "link_to_course_searches", 
                             "link_to_youtube_searches", "missing_technical_skills"]
            response_dict = json.loads(response.text)
            return all(field in response_dict for field in required_fields)
        except (json.JSONDecodeError, AttributeError):
            return False
    
    def review(self, resume: str, job_description: str) -> ReviewResponse:
        """
        Review a resume against a job description
        
        Args:
            resume: The candidate's resume text
            job_description: The job posting text
            
        Returns:
            ReviewResponse object containing the analysis
            
        Raises:
            ValueError: If the input is invalid or empty
            RuntimeError: If the model fails to generate a valid response
        """
        if not resume or not job_description:
            raise ValueError("Both resume and job description must be provided")
        
        # Preprocess inputs
        cleaned_resume = self._preprocess_resume(resume)
        
        try:
            # Create chat session and get response
            chat = self.model.start_chat(history=[])
            response = chat.send_message(
                f"Resume:\n{cleaned_resume}\n\nJob Description:\n{job_description}"
            )
            
            if not self._validate_response(response):
                raise RuntimeError("Invalid response format from model")
            
            # Parse response into ReviewResponse object
            response_dict = json.loads(response.text)
            return ReviewResponse(**response_dict)
            
        except Exception as e:
            raise RuntimeError(f"Error during resume review: {str(e)}")
def reviewed(resume):
    """Main function to demonstrate usage"""
    try:
        reviewer = ResumeReviewer()
        
        # Read job description from file
        with open('job_description.txt', 'r') as f:
            job_description = f.read()
        
        result = reviewer.review(resume, job_description)
        # debugging
        # Print results in a formatted way
        # print("\n=== Resume Review Results ===")
        # print("\nSuggestions:")
        # for i, suggestion in enumerate(result.suggestions, 1):
        #     print(f"{i}. {suggestion}")
            
        # print("\nRecommended Courses:")
        # for i, course in enumerate(result.link_to_course_searches, 1):
        #     print(f"{i}. {course}")
            
        # print("\nYouTube Learning Resources:")
        # for i, resource in enumerate(result.link_to_youtube_searches, 1):
        #     print(f"{i}. {resource}")
            
        # print("\nMissing Skills:")
        # for i, skill in enumerate(result.missing_technical_skills, 1):
        #     print(f"{i}. {skill}")
            
    except Exception as e:
        print(f"Error: {str(e)}")

    return result