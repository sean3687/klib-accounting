import moment from "moment";

export default function formatType(type) {
    if (type === "general") {
        return "General";
    } 
    if(type === "receipt"){
        return "Receipt"
    }

    return "General";
    
  
}