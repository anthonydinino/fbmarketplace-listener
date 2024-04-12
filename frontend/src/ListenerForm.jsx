import Input from "./Input";
import { useState } from "react";
import Layout from "./Layout";

const ListenerForm = ({ setListening, setRequestData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [refreshRate, setRefreshRate] = useState("");

  const prepareRequest = () => {
    setRequestData({
      searchTerm,
      location,
      refreshRate,
    });
    setListening(true);
  };

  return (
    <Layout>
      <fieldset className="md:w-1/2">
        <Input
          fieldName="search-term"
          state={searchTerm}
          setState={setSearchTerm}
        />
        <Input fieldName="location" state={location} setState={setLocation} />
        <Input
          fieldName="refresh-rate"
          state={refreshRate}
          setState={setRefreshRate}
        />
        <button
          onClick={() => prepareRequest()}
          className="w-full rounded-md p-3 text-white border-none bg-blue-500 hover:bg-blue-700 w-100"
        >
          Listen
        </button>
      </fieldset>
    </Layout>
  );
};

export default ListenerForm;
