FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Create virtual environment
RUN python -m venv /venv

# Add venv to PATH so every subsequent RUN / CMD uses it
ENV PATH="/venv/bin:$PATH"

# Install dependencies into the venv
# (copy requirements first for better Docker layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
