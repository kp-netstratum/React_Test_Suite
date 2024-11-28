import { useState } from "react";
import axios from "axios";


interface Account {
  id: number;
  // Add other account properties as needed
}

interface Scrub {
  test1: string;
  test2: string;
}


export const ZohoCRM: React.FC = () => {
  const [data, setData] = useState<Account[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [scrubdata, setScrubdata] = useState<Scrub[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [test1, setTest1] = useState<string>("");
  const [test2, setTest2] = useState<string>("");

  // const selfClientId = "1000.4YW23XBMXY4QGNFKW4TP6REVIY02XH";
  // const selfClientSecret = "6b8070232c388c3f1bf85c021e9479c9ca0ff4725f";
  // const selfClientCode = "1000.2d0e8dfa9bfb217589d7bbe70d7b47e3.353fdfb4ba29e1403311cd0aa553471a";

  const getModules = async (): Promise<void> => {
    try {
      await axios
        .get<Account[]>("http://localhost:3000/getAccounts", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          // console.log(response);
          setData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getScrubs = async (id: number): Promise<void> => {
    // console.log(id);

    try {
      await axios
        .get<{Subform: Scrub[]}>(`http://localhost:3000/getScrubs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          // console.log(response);
          setScrubdata(response.data[0]?.Subform || []);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addScrub = async (data:Scrub, scrubdata:Scrub[], userId:string) => {

    //add data to the existing scrub data
    scrubdata.push(data);


    // console.log(data, scrubdata, 'datas for scrubbing');
    try {
      await axios
        .post(`http://localhost:3000/addScrub/${userId}`, {
          data: scrubdata,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(userId);
  // console.log(scrubdata);

  return (
    <div className=" relative flex flex-col justify-center items-center h-[100vh] w-full">
      <div className="relative flex flex-col justify-center items-center gap-5 w-full">
      <h1 className="text-3xl font-bold">Zoho CRM</h1>
      <div>
        <div>
          note: fetch all the accounts and display them as dropdown and select
          one to display the details of the account and an add button to add new
          data. this is for scrubbing.
        </div>
        <div className="flex flex-col items-center pt-10 gap-10 w-full">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getModules}>Fetch Account Data</button>
            {data.length>0 && 
                <div className="text-black flex gap-10 justify-center">
                  <select className="border border-gray-300 px-4 py-2 rounded"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                    }}
                  >
                    <option value="">Select Account</option>
                    {data.map((item, index) => (
                      <option value={item?.id} key={index}>
                        {item?.id}
                      </option>
                    ))}
                  </select>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => getScrubs(userId)}>Fetch Scrubs</button>
                  {scrubdata.length > 0 && 
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        add scrub data
                    </button>}
                </div>
            }
          <div>
            {scrubdata.length > 0 ? (
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Test 1</th>
                    <th className="border border-gray-300 px-4 py-2">Test 2</th>
                  </tr>
                </thead>
                <tbody>
                  {scrubdata.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item?.test1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item?.test2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      </div>
      {isModalOpen && (
        <div className="absolute z-20 w-1/2 h-1/2 bg-white p-5 rounded shadow-lg text-black">
          <form>
            <input
              type="text"
              name="test1"
              onChange={(e)=>setTest1(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-full"
              placeholder="Test 1"
              required
            />
            <input
              type="text"
              name="test2"
              onChange={(e)=>setTest2(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-full"
              placeholder="Test 2"
              required
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                addScrub({ test1, test2 }, scrubdata, userId);
                setIsModalOpen(false);
                getScrubs(userId);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </form>
        </div>
        )}
    </div>
  );
};
