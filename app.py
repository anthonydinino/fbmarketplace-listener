from flask import Flask, render_template, request
from scraper import detailed_scrape, quick_scrape

app = Flask(__name__)

@app.route("/")
def data_front():
  query = request.args.get('query')
  location = request.args.get('location') if request.args.get('location') else "adelaide"
  detailed = request.args.get('detailed') if request.args.get('detailed') else False
  if not query:
    return "USAGE: localhost:8000?query=[query]&location=[location]&detailed=[1|0]"
  if detailed:
    content = detailed_scrape(query, location)
    return render_template("detailed.html", content=content)
  else:
    content = quick_scrape(query, location)
    return render_template("quick.html", content=content)

@app.route("/api")
def data_api():
  query = request.args.get('query')
  location = request.args.get('location') if request.args.get('location') else "adelaide"
  detailed = request.args.get('detailed') if request.args.get('detailed') else False
  if not query:
    return "USAGE: localhost:8000?query=[query]&location=[location]&detailed=[1|0]"
  if detailed:
    return detailed_scrape(query, location)
  else:
    return quick_scrape(query, location)


