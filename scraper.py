from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os

def format_discounted(listing: list[str]):
  if "$" in listing[1]:
    listing.pop(1)
  return listing

def scrape(query):
  browser = get_browser()
  browser.get(f"https://www.facebook.com/marketplace/adelaide/search?sortBy=creation_time_descend&query={query}&exact=false")
  content = []
  try:
    WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[aria-label='Collection of Marketplace items']")))
    content = browser.find_elements(By.CSS_SELECTOR, "div[style='max-width: 381px; min-width: 242px;']")
    content = [c.text.split('\n') for c in list(filter(lambda c: bool(c.text), content))]
    return list(map(format_discounted, content))
  finally:
    browser.quit()
  

def get_browser(headless=False):
  if os.environ.get("REMOTE_DRIVER", False):
    server = os.environ["REMOTE_DRIVER"]
  else:
    server = "http://browser:4444"
  options = webdriver.ChromeOptions()
  options.set_capability('goog:loggingPrefs', {'performance': 'ALL'})
  if headless:
    options.add_argument("--headless")
  return webdriver.Remote(options=options, command_executor=server)

