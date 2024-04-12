import Layout from "./Layout";
import axios from "axios";

const ListingsView = ({ requestData }) => {
  const fetchData = async () => {
    const data = await axios.get(
      `https://localhost:8000/api?query=${requestData["searchTerm"]}`
    );
    console.log(data);
  };
  fetchData();
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
      </Layout>
    </>
  );
};

export default ListingsView;
