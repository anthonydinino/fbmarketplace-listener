# FB Marketplace Scraper

Allows you to scrape the Facebook Marketplace.

## Get Started

```
docker compose -f docker-compose.dev.yml up -d
```

### Make a query

http://localhost:8000/?query=car

### Get an API response instead

http://localhost:8000/api?query=car

### See what the browser sees

http://localhost:7900/?autoconnect=1&resize=scale&password=secret

### Issues

- `docker compose up` **_not working due to remote server not working._** Facebook is most likely detecting that the remote server is not human and prompting user to login disrupting the scraper
