# Use an official Python image (slim)
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (optional, for some Python packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .

# Upgrade pip and install Python dependencies
RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app code
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# Expose port for Cloud Run / Render
EXPOSE 8080

# Run the Flask app with Gunicorn (production server)
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers=2", "--threads=2", "app:app"]
