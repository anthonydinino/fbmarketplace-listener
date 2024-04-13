# FB Marketplace Scraper

Allows you to scrape the Facebook Marketplace.

## Get Started

```
docker compose up -d
```
## Interact with Web App

http://localhost:8080/

## API Instructions (optional)
### Make a query

http://localhost:8000/?query=car



### Optional arguments

- Use concurrency! Get a detailed scrape!

```
&detailed=1
```


- Add a location like `sydney` or `melbourne`!


```
&location=sydney
```

### Visit the selenium hub

http://localhost:4444/ui/#

## Issues

- Detailed column sometimes not scraping properly due to item pages being different. Need to use better XPath

## Todo

- Polish UI
- Add production build
