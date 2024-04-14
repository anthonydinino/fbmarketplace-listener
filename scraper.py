from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import concurrent.futures

BASE_URL = "https://www.facebook.com/marketplace"

def quick_scrape(query, location):
  return get_listings_info(f"{BASE_URL}/{location}/search?sortBy=creation_time_descend&maxPrice=2000&daysSinceListed=1&query={query}&exact=false")

def detailed_scrape(query, location):
  # get listing page info
  listing_info = get_listings_info(f"{BASE_URL}/{location}/search?sortBy=creation_time_descend&maxPrice=2000&daysSinceListed=1&query={query}&exact=false")

  # navigate to all listings and scrape details
  listing_links = [f"{BASE_URL}/item/{listing["id"]}" for listing in listing_info]
  with concurrent.futures.ThreadPoolExecutor() as executor:
    results = list(executor.map(get_listing_detail, listing_links))

  # add listing info to the listing detail
  assert len(listing_links) == len(results)
  for i in range(len(results)):
    results[i]['image'] = listing_info[i]['image']
    results[i]['price'] = listing_info[i]['price']
    results[i]['link'] = listing_links[i]

  return results

def get_listing_detail(url):
  browser = get_browser(headless=False)
  browser.get(url)
  WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, "//h1/span")))
  title = browser.find_element(By.XPATH, "//h1/span").text
  try:
    see_more = browser.find_element(By.XPATH, "//div[@aria-label='Collection of Marketplace items']//*[text()[contains(., 'See more')]]")
    browser.find_element(By.XPATH, "//div[@aria-label='Close']").click()
    see_more.click()
  except:
    pass
  try:
    listed = browser.find_element(By.XPATH, "//span[text()[contains(.,'Listed')]]").text
  except:
    listed = ""
  try:
    details = browser.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[1]/div[2]/div/div[2]/div/div[1]/div[1]/div/div[5]").text
  except:
    details = ""
  browser.quit()
  return {
    "title": title,
    "listed": listed,
    "details": details
  }

def get_listings_info(url):
  currency_code = "$"
  browser = get_browser()
  browser.get(url)
  WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[aria-label='Collection of Marketplace items']")))
  ids = browser.find_elements(By.XPATH, "//a[starts-with(@href, '/marketplace/item')]")
  images = browser.find_elements(By.XPATH, "//a[starts-with(@href, '/marketplace/item')]//img")
  titles = browser.find_elements(By.XPATH, "//a[starts-with(@href, '/marketplace/item')]//span[contains(@style, '-webkit')]")
  prices = browser.find_elements(By.XPATH, f"//a[starts-with(@href, '/marketplace/item')]/div/div[2]/div/span/div/span[text()[contains(. , '{currency_code}') or contains(.,'Free')]]")
  assert len(ids) == len(images) == len(titles) == len(prices)
  res = []
  for i, id in enumerate(ids):
    id = id.get_dom_attribute("href").split('/')[3]
    res.append({
      "id": id,
      "link" : f"{BASE_URL}/item/{id}",
      "title" : titles[i].text,
      "price" : prices[i].text,
      "image" : images[i].get_attribute("src")
    })
  browser.quit()
  return res

def get_browser(headless=True):
  server = "http://selenium-hub:4444"
  options = webdriver.ChromeOptions()
  if headless:
    options.add_argument("--headless")
  return webdriver.Remote(options=options, command_executor=server)

