import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ListingsView = ({ requestData, setIsListening, variance }) => {
  const [listings, setListings] = useState([]);
  const [trackedIds, setTrackedIds] = useState([]);
  const [checking, setChecking] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const getRandomVarianceInterval = (refreshPerMin = 1, varianceValue) => {
    const variance = Math.floor(Math.random() * varianceValue * 1000 + 1);
    const addOrSub = Math.floor(Math.random() * 2);
    const interval = parseInt(parseFloat(refreshPerMin) * 60000);
    return addOrSub === 0 ? Math.abs(interval - variance) : interval + variance;
  };

  const requestUrl = `/api?query=${requestData["searchTerm"]}&location=${requestData["location"]}`;

  // First component render
  useEffect(() => {
    const queryListings = async () => {
      setChecking(true);
      const response = await axios.get(requestUrl);
      setListings(response.data ?? []);
      setChecking(false);
    };
    queryListings();
    if (!notifications) {
      Notification.requestPermission().then((permission) => {
        setNotifications(permission);
      });
    }
  }, []);

  // Every listener refresh
  useEffect(() => {
    const fetchListingsTimeout = setTimeout(async () => {
      setChecking(true);
      const response = await axios.get(requestUrl);
      setListings(response.data ?? []);
      setChecking(false);
    }, getRandomVarianceInterval(requestData["refreshRate"], variance));
    return () => clearTimeout(fetchListingsTimeout);
  }, [requestData, listings]);

  // Every listener refresh check for new listings
  useEffect(() => {
    const newIds = listings.map((listing) => listing.id);
    newIds.forEach((newId) => {
      if (trackedIds.length > 0 && !trackedIds.includes(newId)) {
        const newListing = listings.find((listing) => {
          return listing["id"] === newId;
        });
        const time = moment().format("hh:mma Mo MMM YYYY ");
        const message = `${newListing["title"]} has been found at ${time}`;
        new Notification(message);
        console.log(message);
      }
    });
    setTrackedIds(newIds);
  }, [listings]);

  return (
    <div className="flex flex-col">
      <div className="stats">
        <div className="stat">
          <div className="stat-title">Search Term</div>
          <div className="stat-value">{requestData["searchTerm"]}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Location</div>
          <div className="stat-value">
            {requestData["location"].charAt(0).toUpperCase() +
              requestData["location"].slice(1)}
          </div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <button
              onClick={() => setIsListening(false)}
              className="btn btn-warning"
            >
              Stop Listening
            </button>
          </div>

          <div className="stat-value">
            {checking ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              <div className="w-full h-10"></div>
            )}
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {listings.length > 0 &&
              Object.keys(listings[0]).map((key) => {
                if (key !== "link" && key !== "id")
                  return (
                    <th className="text-center" key={key}>
                      {key}
                    </th>
                  );
              })}
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              {Object.keys(listing).map((key, i) => {
                switch (key) {
                  case "id":
                  case "link":
                    return;
                  case "image":
                    return (
                      <td className="text-center" key={key}>
                        <img src={listing["image"]} alt="listing-image" />
                      </td>
                    );
                  case "title":
                    return "link" in listing ? (
                      <td className="text-center" key={i}>
                        <a
                          className="text-blue-500"
                          href={listing["link"]}
                          alt="listing-title"
                          target="_blank"
                        >
                          {listing[key]}
                        </a>
                      </td>
                    ) : (
                      <td className="text-center" key={key}>
                        {listing[key]}
                      </td>
                    );
                  default:
                    return (
                      <td className="text-center" key={i}>
                        {listing[key]}
                      </td>
                    );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingsView;
