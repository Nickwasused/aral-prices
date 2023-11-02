FROM python:3.12-slim-bullseye

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 5000

CMD [ "python3", "app.py", "-w"]