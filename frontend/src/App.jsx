import { useState } from "react";
import ListenerForm from "./ListenerForm";
import ListingsView from "./ListingsView";

function App() {
  const [listening, setListening] = useState(false);
  const [requestData, setRequestData] = useState(null);

  return (
    <>
      {listening ? (
        <ListingsView requestData={requestData} setListening={setListening} />
      ) : (
        <ListenerForm
          setListening={setListening}
          setRequestData={setRequestData}
          requestData={requestData}
        />
      )}
    </>
  );
}

export default App;
