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
      <form onSubmit={(e) => prepareRequest(e)}>
        <Input
          required={true}
          fieldName="search-term"
          state={searchTerm}
          setState={setSearchTerm}
        />
        <Input
          required={true}
          fieldName="location"
          state={location}
          setState={setLocation}
        />
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
          className="w-full rounded-md p-3 text-white border-none bg-blue-500 hover:bg-blue-700 w-100"
        >
          Listen
        </button>
      </form>
    </Layout>
  );
};

export default ListenerForm;
