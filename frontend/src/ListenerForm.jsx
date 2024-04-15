import Input from "./Input";
import { useEffect, useState } from "react";
import Layout from "./Layout";

const ListenerForm = ({ setListening, setRequestData, requestData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [refreshRate, setRefreshRate] = useState("");

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
    setListening(true);
  };

  return (
    <Layout extra="h-screen justify-center">
      <h1 className="text-5xl text-center mb-10">
        Facebook Marketplace Listener
      </h1>
      <form onSubmit={(e) => prepareRequest(e)} className="flex flex-col gap-4">
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
        <button
          type="submit"
          className="btn btn-primary text-white w-full mt-6"
        >
          Listen
        </button>
      </form>
    </Layout>
  );
};

export default ListenerForm;
