from flask import Flask, render_template, request
from scraper import scrape
import os

app = Flask(__name__)

@app.route("/")
def data_front():
  query = request.args.get('query')
  if not query:
    return os.environ.get("REMOTE_DRIVER", "no remote server")
  content = scrape(query)
  return render_template("scrape.html", content=content)

@app.route("/api")
def data():
  query = request.args.get('query')
  return scrape(query)


