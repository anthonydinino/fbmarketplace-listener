from flask import Flask, render_template, request
from scraper import scrape

app = Flask(__name__)

@app.route("/")
def data_front():
  query = request.args.get('query')
  if not query:
    return "please specify query parameter ?query="
  content = scrape(query)
  return render_template("scrape.html", content=content)

@app.route("/api")
def data():
  query = request.args.get('query')
  return scrape(query)

