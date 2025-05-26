import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../store/redux/dataSlice";
import { useNavigate } from "react-router-dom";
import userService from "./services/api/service";
import DeleteButton from "./services/api/Delete";

const ListView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  const fetchData = async () => {
    try {
      const fetchedData = await userService.get();
      if (fetchedData.length > 0) {
        fetchedData.forEach((item) => {
          dispatch(setData(item));
        });
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const addData = () => navigate("/add");

  const editData = (user) => navigate("/edit", { state: { userData: user } });

  const handleDelete = () => {
    fetchData();
    window.location.reload();
    console.log("Data berhasil dihapus");
  };

  return (
    <>
      <section className="mx-10 mt-[2rem]">
        <h2 className="text-2xl font-bold mb-4">Data dari API</h2>
        <button className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4" onClick={addData}>
          Tambah Data
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-transparent border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left bg-gray-700 font-semibold text-white border-b">No</th>
                <th className="px-6 py-3 text-left bg-gray-700 font-semibold text-white border-b">Username</th>
                <th className="px-6 py-3 text-left bg-gray-700 font-semibold text-white border-b">Email</th>
                <th className="px-6 py-3 text-left bg-gray-700 font-semibold text-white border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-700">
                  <td className="px-6 py-4 text-white">{index + 1}</td>
                  <td className="px-6 py-4 text-white">{item.username}</td>
                  <td className="px-6 py-4 text-white">{item.email}</td>
                  <td className="flex gap-2 items-center py-4">
                    <button className="bg-cyan-400 rounded-md p-1 text-xs" onClick={() => editData(item)}>
                      Edit
                    </button>
                    <DeleteButton id={item.id} onDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ListView;
