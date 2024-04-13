import { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import moment from "moment";

const ListingsView = ({ requestData, setListening }) => {
  const [listings, setListings] = useState([]);
  const [trackedIds, setTrackedIds] = useState([]);
  const tdStyles = "text-center";

  useEffect(() => {
    const fetchListingsInterval = setInterval(async () => {
      const response = await axios.get(
        `/api?query=${requestData["searchTerm"]}&location=${requestData["location"]}`
      );
      setListings(response.data ?? []);
    }, parseInt(parseFloat(requestData["refreshRate"]) * 60000));
    return () => clearInterval(fetchListingsInterval);
  }, [requestData, listings]);

  useEffect(() => {
    const newIds = listings.map((listing) => listing.id);
    newIds.forEach((id) => {
      if (!trackedIds.includes(id)) {
        const newListing = listings.find((listing) => {
          return listing["id"] === id;
        });
        const time = moment().format("hh:mma Mo MMM YYYY ");
        const message = `${newListing["title"]} has been listed at ${time}`;
        new Notification(message);
        console.log(message);
      }
    });
    setTrackedIds(newIds);
  }, [listings]);

  return (
    <>
      <Layout>
        <div className="flex justify-around mb-8">
          <table className="table-auto border-solid border-2">
            <tbody>
              {Object.keys(requestData).map((key) => (
                <tr className="border-2" key={key}>
                  <th className="border-2 p-2 pr-5 text-left">{key}</th>
                  <td className="p-2">{requestData[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setListening(false)}
            className="rounded-md p-3 text-white border-none bg-red-500 hover:bg-red-700 w-100"
          >
            Stop Listening
          </button>
        </div>
        <table className="table-auto border-solid border-2 w-full">
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
                        <td className={tdStyles}>
                          <img src={listing["image"]} alt="listing-image" />
                        </td>
                      );
                    case "title":
                      return "link" in listing ? (
                        <td className={tdStyles} key={i}>
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
                        <td className={tdStyles}>{listing[key]}</td>
                      );
                    default:
                      return (
                        <td className={tdStyles} key={i}>
                          {listing[key]}
                        </td>
                      );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default ListingsView;
