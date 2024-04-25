import Input from "./Input";
import { useEffect, useState } from "react";
import ListingsView from "./ListingsView";

const Listener = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [refreshRate, setRefreshRate] = useState("");
  const [requestData, setRequestData] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (requestData) {
      setSearchTerm(requestData["searchTerm"] || "");
      setLocation(requestData["location"] || "");
      setRefreshRate(requestData["refreshRate"] || "");
    }
  }, [requestData]);

  const prepareRequest = (e) => {
    e.preventDefault();
    setRequestData({
      searchTerm,
      location,
      refreshRate,
    });
    setIsListening(true);
  };

  return (
    <>
      {isListening ? (
        <ListingsView
          requestData={requestData}
          setIsListening={setIsListening}
        />
      ) : (
        <form
          onSubmit={(e) => prepareRequest(e)}
          className="flex flex-col gap-4"
        >
          <Input
            required={true}
            fieldName="search-term"
            state={searchTerm}
            setState={setSearchTerm}
          />
          <label>
            Location
            <select
              id="location-select"
              className="select select-bordered w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option disabled></option>
              <option value="adelaide">Adelaide</option>
              <option value="sydney">Sydney</option>
              <option value="melbourne">Melbourne</option>
              <option value="perth">Perth</option>
            </select>
          </label>
          <Input
            required={true}
            label="Every ? minutes"
            fieldName="refresh-rate"
            placeholder={"refresh rate (minutes)"}
            state={refreshRate}
            setState={setRefreshRate}
          />
          <button type="submit" className="btn btn-primary w-full text-white">
            Listen
          </button>
        </form>
      )}
    </>
  );
};

export default Listener;
