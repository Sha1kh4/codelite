import multiprocessing
import os

# Number of worker processes for handling requests
workers = multiprocessing.cpu_count() * 2 + 1

# Number of threads for handling requests
threads = 4

# The socket to bind
bind = "0.0.0.0:5000"

# Timeout for graceful workers restart
timeout = 120

# Environment variables
raw_env = [
    "FLASK_APP=app:app",
    "FLASK_ENV=development"
]

# The type of workers to use
worker_class = "sync"  # Changed from 'gevent' to 'sync'

# The maximum number of requests a worker will process before restarting
max_requests = 1000
max_requests_jitter = 50

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"

# SSL config if needed
# keyfile = '/path/to/keyfile'
# certfile = '/path/to/certfile'

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