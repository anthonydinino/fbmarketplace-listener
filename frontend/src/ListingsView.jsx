import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ListingsView = ({ requestData, setIsListening }) => {
  const [listings, setListings] = useState([]);
  const [trackedIds, setTrackedIds] = useState([]);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const queryListings = async () => {
      setChecking(true);
      const response = await axios.get(
        `/api?query=${requestData["searchTerm"]}&location=${requestData["location"]}`
      );
      setListings(response.data ?? []);
      setChecking(false);
    };
    queryListings();
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    const fetchListingsTimeout = setTimeout(async () => {
      setChecking(true);
      const response = await axios.get(
        `/api?query=${requestData["searchTerm"]}&location=${requestData["location"]}`
      );
      setListings(response.data ?? []);
      setChecking(false);
    }, parseInt(parseFloat(requestData["refreshRate"]) * 60000));
    return () => clearTimeout(fetchListingsTimeout);
  }, [requestData, listings]);

  useEffect(() => {
    const newIds = listings.map((listing) => listing.id);
    newIds.forEach((id) => {
      if (!trackedIds.includes(id)) {
        const newListing = listings.find((listing) => {
          return listing["id"] === id;
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
                      <td className="text-center">
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
                      <td className="text-center">{listing[key]}</td>
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
