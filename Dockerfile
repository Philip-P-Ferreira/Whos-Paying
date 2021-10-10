# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.7


# Install Node.js
RUN apt update --yes && apt install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

EXPOSE 8080

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

# Update Flask APP environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=localhost
ENV FLASK_RUN_PORT=8080

# Install pip requirements
ADD /backend/requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app/webapp
COPY webapp/package.json ./
COPY webapp/package-lock.json ./
RUN npm i

COPY ./webapp /app/webapp/
RUN npm build

WORKDIR /app/backend
COPY ./backend /app/backend

# During debugging, this entry point will be overridden. For more information, refer to https://aka.ms/vscode-docker-python-debug
CMD ["flask", "run"]
