from flask import Flask, request, jsonify
import os
import PyPDF2
from flask_cors import CORS
from ai import reviewed

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
@app.route('/upload', methods=['POST'])
def upload_form():
    pass

@app.route('/upload_file', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Extract text from the PDF
        text = extract_text_from_pdf(file)
        text = str(text)
        
        if text is None:
            return jsonify({'error': 'Failed to extract text from PDF'}), 500

        # Save the extracted text to a file
        text_filename = os.path.splitext(file.filename)[0] + '.txt'
        text_file_path = os.path.join(UPLOAD_FOLDER, text_filename)
        with open(text_file_path, 'w', encoding='utf-8') as text_file:
            text_file.write(text)
        
        return jsonify(reviewed(text)), 200
    
    return jsonify({'error': 'Invalid file format'}), 400

if __name__ == '__main__':
    app.run(debug=True)
