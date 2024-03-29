FROM python:alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --no-input -r requirements.txt
RUN rm /app/requirements.txt
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 5000
ENTRYPOINT [ "python3", "app.py", "-w"]