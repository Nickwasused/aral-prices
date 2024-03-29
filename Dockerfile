FROM python:alpine3.19

WORKDIR /app

COPY . .
RUN pip install --no-cache-dir --no-input -r requirements.txt
RUN rm /app/requirements.txt
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 5000
CMD [ "python3", "app.py", "-w"]