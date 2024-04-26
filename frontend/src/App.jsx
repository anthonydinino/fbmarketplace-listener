import Listener from "./Listener";
import Layout from "./Layout";
import Variance from "./Variance";
import { useState } from "react";

function App() {
  const [listeners, setListeners] = useState(["default"]);
  const [variance, setVariance] = useState(0);

  return (
    <>
      <header className="flex flex-col">
        <h1 className="text-5xl text-center mb-3">
          Facebook Marketplace Listener
        </h1>
        <div className="flex justify-center items-center mx-auto gap-5">
          <button
            onClick={() => {
              setListeners([...listeners, Date.now().toString(36)]);
            }}
            className="btn btn-accent text-white text-center mx-auto mb-3"
          >
            Add Listener
          </button>
          <Variance variance={variance} setVariance={setVariance} />
        </div>
      </header>
      <Layout>
        {listeners.map((l) => {
          return (
            <div key={l} className="border-2 p-3 flex-grow">
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setListeners(listeners.filter((li) => li !== l))
                  }
                  className="btn btn-circle bg-red-400 hover:bg-red-500 text-white"
                >
                  x
                </button>
              </div>
              <Listener variance={variance} />
            </div>
          );
        })}
      </Layout>
    </>
  );
}

export default App;
