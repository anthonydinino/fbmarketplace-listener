from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def main():
  query = "rims"
  op = webdriver.FirefoxOptions()
  op.add_argument('--headless')
  driver = webdriver.Firefox(options=op)
  fbURL = f"https://www.facebook.com/marketplace/adelaide/search?daysSinceListed=1&query={query}&exact=false"
  driver.get(fbURL)
  time.sleep(2)
  content = driver.find_element(By.CSS_SELECTOR, "div[role='main']")
  print(groupList("AU$", content.text.split("\n")))
  driver.close()

def groupList(deliminator, listings):
  arr = []
  track = 0
  for i, v in enumerate(listings):
    if deliminator in v:
      arr.append(listings[track:i])
      track = i
  return arr[1:]

if __name__ == "__main__":
  main()