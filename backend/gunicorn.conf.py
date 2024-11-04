import multiprocessing
import os

# Number of worker processes for handling requests
workers = max(1, multiprocessing.cpu_count() - 1)  # Reduced worker count

# Number of threads for handling requests
threads = 4

# The socket to bind
bind = "0.0.0.0:5000"

# Timeout for graceful workers restart
timeout = 180  # Increased timeout

# Environment variables
raw_env = [
    "FLASK_APP=app:app",
    "FLASK_ENV=production"  # Changed to production
]

# The type of workers to use
worker_class = "gevent"  # Changed to gevent for better concurrency

# The maximum number of requests a worker will process before restarting
max_requests = 500  # Experiment with lower values
max_requests_jitter = 50

# Logging
accesslog = "/path/to/access.log"  # Log to file
errorlog = "/path/to/error.log"  # Log to file
loglevel = "info"

# Process naming
proc_name = "gunicorn_flask_app"

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# Log config
capture_output = True
enable_stdio_inheritance = True
