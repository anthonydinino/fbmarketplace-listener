from flask import Flask, render_template, request
from scraper import scrape

app = Flask(__name__)

@app.route("/")
def data():
  content = scrape(request.args.get('query'))
  return render_template("scrape.html", content=content)