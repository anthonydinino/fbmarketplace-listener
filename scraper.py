from selenium import webdriver
from selenium.webdriver.common.by import By

def format_discounted(listing: list[str]):
  if "$" in listing[1]:
    listing.pop(1)
  return listing

def scrape(query, headless=True):
  browser = get_browser(headless)
  browser.get(f"https://www.facebook.com/marketplace/adelaide/search?sortBy=creation_time_descend&query={query}&exact=false")
  content = []
  while not content:
    try: 
      content = browser.find_elements(By.CSS_SELECTOR, "div[style='max-width: 381px; min-width: 242px;']")
    except: continue
  content = [c.text.split('\n') for c in list(filter(lambda c: bool(c.text), content))]
  browser.quit()
  return list(map(format_discounted, content))

def get_browser(headless):
  options = webdriver.FirefoxOptions()
  if headless:
    options.add_argument("--headless")
  return webdriver.Remote(options=options, command_executor="http://browser:4444")

