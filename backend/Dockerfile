# Use an official Python image (slim version for smaller size)
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies (optional, needed for some packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .

# Upgrade pip and install Python dependencies
RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app code
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# Expose the port your app will run on
EXPOSE 8080

# Run the Flask app with Gunicorn (production server)
# --workers: number of Gunicorn workers (usually 2-4 per CPU)
# --threads: number of threads per worker
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers=2", "--threads=2", "app:app"]
