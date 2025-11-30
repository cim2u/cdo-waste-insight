# Use an official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy your app
COPY . .

# Set environment variables (optional)
ENV PYTHONUNBUFFERED=1

# Command to run your app
CMD ["python", "app.py"]
