import { PiWarningCircle } from "react-icons/pi";
import Spinner from "../animation/spinner";

export default function PromptMessageController({ message }) {
    //initiate extraction first
    //extracting document
    //sync ready
    //failed
    //sync ready
    if (message === "requireExtraction") {
      return (
        <div className="text-xs bg-orange-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Please initiate Extraction first</div>
        </div>
      );
    }

    if (message === "extracting") {
      return (
        <div className="text-xs bg-yellow-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <Spinner
                className=""
                size={`w-3 h-3`}
                tintColor={"fill-black"}
                bgColor={"dark:text-gray-300"}
              />
          <div>Extracting document</div>
        </div>
      );
    }

    if (message === "syncReady") {
      return (
        <div className="text-xs bg-green-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Sync ready</div>
        </div>
      );
    }

    if (message === "failed") {
      return (
        <div className="text-xs bg-red-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2">
          <PiWarningCircle className="text-xl font-bold" />
          <div>Failed</div>
        </div>
      );
    }
    if (message === "") {
      return (
        <div className="">
          
        </div>
      );
    }
  }