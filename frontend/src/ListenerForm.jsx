import Input from "./Input";
import { useState } from "react";
import Layout from "./Layout";

const ListenerForm = ({ setListening, setRequestData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [refreshRate, setRefreshRate] = useState("");

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
    <Layout>
      <form onSubmit={(e) => prepareRequest(e)}>
        <Input
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
          fieldName="refresh-rate"
          placeholder={"refresh rate (seconds)"}
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
