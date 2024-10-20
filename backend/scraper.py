import requests
# import json
# import os

def extract_job_description(job):
    try:
        job_description = job["Jobs found"][0]["job_description"]
        # print("Job Description:", job_description)
        return job_description
    except (IndexError, KeyError) as e:
        # print(f"Error extracting job description: {e}")
        return None

def search_jobs(query):
    url = "https://jsearch.p.rapidapi.com/search"
    querystring = {
        "query": query,
        "page": "1",
        "num_pages": "1",
        "date_posted": "all"
    }
    
    headers = {
        "x-rapidapi-key": "355e688b1dmsh6f4b91932c19ca0p19a0b0jsnfe584f9ce51f",
        "x-rapidapi-host": "jsearch.p.rapidapi.com"
    }
    
    response = requests.get(url, headers=headers, params=querystring)
    if response.status_code == 200:
        jobs = response.json().get('data', [])
        if not jobs:
            print("No jobs found.")
            return []
        return jobs
    else:
        print(f"Error searching jobs: {response.status_code} - {response.text}")
        return []
def scrapte(job_title):
    print("Searching for jobs with title:", job_title)
    jobs = search_jobs(job_title) 
    if jobs and len(jobs) > 0:
        descriptions = []  # Collect all cleaned descriptions
        for job in jobs:
            description = job.get('job_description', '')
            
            # Clean up the description
            description = description.strip()
            # print(json.dumps(description, indent=2))  # Print original description
            
            # Remove unwanted message
            unwanted_message = "Please dont share java resume with node js we need here node js consultant"
            if unwanted_message.lower() in description.lower():
                description = description.replace(unwanted_message, "").strip()
            
            # If description starts with "Please don", remove that part
            if description.startswith("Please don"):
                description = description.split("\n", 1)[1].strip() if "\n" in description else ""
            
            descriptions.append(description)  # Add the cleaned description to the list
        
        return descriptions  # Return all cleaned descriptions
    return None