import { useDispatch } from "react-redux";
import { updateData } from "/store/redux/dataSlice";
import userService from "./service";

const UpdateButton = ({ id, updatedData, onUpdateSuccess }) => {
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      const data = await userService.update(id, updatedData);
      dispatch(updateData(data));
      onUpdateSuccess();
      console.log("Data berhasil diupdate di Redux Store dan API.");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <button type="button" className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-300" onClick={handleUpdate}>
      Update
    </button>
  );
};

export default UpdateButton;
