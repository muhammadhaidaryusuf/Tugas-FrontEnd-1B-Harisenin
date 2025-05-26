
import { useDispatch } from "react-redux";
import { removeData } from "/store/redux/dataSlice";
import userService from "./service";

const DeleteButton = ({ id, onDelete }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    if(window.confirm("Yakin ingin menghapus data ini?")){
      try {
        await userService.delete(id);
        dispatch(removeData(id));
        onDelete();
        console.log("Data berhasil dihapus dari Redux Store.");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <button 
      type="button"
      className="bg-red-600 rounded-lg p-1 text-xs hover:bg-red-800 transition duration-300" 
      onClick={handleClick}
    >
      Hapus
    </button>
  );
};

export default DeleteButton;