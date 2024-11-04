# Builder stage
FROM python:3.12-alpine as builder

WORKDIR /build

# Install build dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    python3-dev \
    libffi-dev \
    openssl-dev

# Create and activate virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy only requirements first for caching
COPY req.txt ./
RUN pip install --no-cache-dir -r req.txt \
    && pip install --no-cache-dir gunicorn gevent

# Runtime stage
FROM python:3.12-alpine

# Set Python configurations
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/opt/venv/bin:$PATH" \
    FLASK_ENV=development \
    FLASK_APP=app.py

WORKDIR /app

# Copy virtual env from builder
COPY --from=builder /opt/venv /opt/venv

# Copy configuration files for caching efficiency
COPY gunicorn.conf.py ./

# Copy Python files
COPY app.py ai.py scraper.py ./ 

# Set up non-root user and permissions in one step
RUN adduser -D appuser && \
    mkdir -p /app/uploads && \
    chown -R appuser:appuser /app && \
    chmod 755 /app/uploads

USER appuser

# Expose Flask port
EXPOSE 5000

# Run the application with gunicorn
CMD ["gunicorn", "--config", "gunicorn.conf.py", "app:app"]
