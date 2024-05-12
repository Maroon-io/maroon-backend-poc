import { toast } from "react-hot-toast";
import colors from "../../constants/colors";

export const CustomToast = (message: string, type: string) => {
  let options = {
    style: {
      zIndex: "99999999999",
      border: "1px solid #555596",
      padding: "16px",
      color: "white",
      fontSize: "14px",
      background: colors.primary,
      top: "5rem",
    },
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast(message, options); // No specific method for info, so use default toast method
      break;
    default:
      toast(message, options);
  }
};

export default CustomToast;
