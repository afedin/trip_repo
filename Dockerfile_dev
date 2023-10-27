FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc python3-dev build-essential \
    && apt-get install -y --no-install-recommends libffi-dev libssl-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y gcc
RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN pip install gunicorn
RUN pip install --upgrade pip
COPY . .

CMD ["gunicorn", "tripproject.wsgi:application", "--bind", "0.0.0.0:8000"]


