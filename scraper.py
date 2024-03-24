from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options

def format_discounted(listing: list[str]):
  if "$" in listing[1]:
    listing.pop(1)
  return listing

def scrape(query, headless=True):
  browser = get_browser(headless)
  browser.get(f"https://www.facebook.com/marketplace/adelaide/search?sortBy=creation_time_descend&query={query}&exact=false")
  content = []
  print("about to fetch data")
  while not content:
    try: 
      content = browser.find_elements(By.CSS_SELECTOR, "div[style='max-width: 381px; min-width: 242px;']")
    except: continue
  content = [c.text.split('\n') for c in list(filter(lambda c: bool(c.text), content))]
  if headless: browser.close()
  return list(map(format_discounted, content))

def get_browser(headless):
  options = Options()
  if headless:
    options.add_argument("--headless")
  return webdriver.Firefox(options=options)

