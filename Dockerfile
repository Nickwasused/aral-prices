FROM python:alpine

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --no-input -r requirements.txt
RUN pip install --no-cache-dir --no-input waitress
RUN rm /app/requirements.txt
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 5000
ENTRYPOINT [ "waitress-serve", "--host=0.0.0.0", "--port=5000", "app:app"]