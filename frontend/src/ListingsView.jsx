import { useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";

const ListingsView = ({ requestData, setListening }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api?query=${requestData["searchTerm"]}`
      );
      console.log(response.data);
    };
    fetchData();
  }, [requestData]);

  Notification.requestPermission();

  return (
    <>
      <Layout>
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
          className="w-full rounded-md p-3 text-white border-none bg-red-500 hover:bg-red-700 w-100"
        >
          Stop
        </button>
      </Layout>
    </>
  );
};

export default ListingsView;
