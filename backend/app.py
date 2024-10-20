from flask import Flask, request, jsonify
import os
import PyPDF2
from flask_cors import CORS
from ai import reviewed,analytics
from scraper import scrapte

app = Flask(__name__)
CORS(app)

# Set the upload folder and allowed extensions
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file):
    try:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:  # Check if text extraction is successful
                text += page_text + '\n'
        return text.strip()  # Remove trailing newlines
    except Exception as e:
        return None  # Return None in case of an error

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/jobs', methods=['GET'])
def jobs():
    job_title = request.args.get('jobs')
    return jsonify(scrapte(job_title)), 200
@app.route('/analytics', methods=['GET'])
def analyis():
    job_title = request.args.get('jobs')
    return jsonify(analytics(job_title)), 200


@app.route('/upload', methods=['POST'])
def upload():
    # Get the job title and skills from the form data
    job_title = request.form.get('job_title')
    skills = request.form.get('skills')

    # Validate the job title and skills
    if not job_title:
        return jsonify({'error': 'Job title is required'}), 400
    if not skills:
        return jsonify({'error': 'Skills are required'}), 400

    response_data = reviewed( skills,job_title)
    
    return jsonify(response_data), 200

@app.route('/upload_file', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    # If the user does not select a file
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Extract text from the PDF
        text = extract_text_from_pdf(file)
        
        if text is None:
            return jsonify({'error': 'Failed to extract text from PDF'}), 500

        # Get the job title from the form data
        job_title = request.form.get('job_title')
        if not job_title:
            return jsonify({'error': 'Job title is required'}), 400
        
        # Perform resume review
        review_result = reviewed(text, job_title)

        return jsonify(review_result), 200
    
    return jsonify({'error': 'Invalid file format'}), 400

if __name__ == '__main__':
    app.run(debug=True)
