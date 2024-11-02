# server/Dockerfile
FROM python:3.12.6-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY req.txt requirements.txt
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose the Flask app on port 5000
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
