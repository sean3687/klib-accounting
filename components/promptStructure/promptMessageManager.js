import { PiWarningCircle, PiCheckBold } from "react-icons/pi";
import Spinner from "../animation/spinner";

export default function PromptMessageController({ message, extractStructureData, sync }) {
    //initiate extraction first
    //extracting document
    //sync ready
    //failed
    //sync ready
    if (message === "requireExtraction") {
      return (
        <div className="text-xs bg-orange-200 rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-2" onClick={extractStructureData}>
          <PiWarningCircle className="text-xl font-bold" />
          <div className="ml-1">Please initiate Extraction first</div>
        </div>
      );
    }

    if (message === "extracting") {
      return (
        <div className="text-xs bg- rounded-md px-2 py-1 text-gray-700 flex items-center justify-center">
          <Spinner
                className=""
                size={`w-3 h-3`}
                tintColor={"fill-black"}
                bgColor={"dark:text-gray-200"}
              />
          <div className="ml-1">Extracting content</div>
        </div>
      );
    }

    if (message === "syncReady") {
      return (
        
        <button className="relative transform transition-transform hover:scale-105 active:scale-95 px-2" onClick={sync}>
          <PiCheckBold className="text-xl text-green-600 font-bold" />
        <div className="relative group text-xs bg-green-500 px-2 py-1 rounded-lg text-white">
          Sync content ready
        </div>
      </button>
      );
    }

    if (message === "syncCompleted") {
      return (
        <div className="text-xs rounded-md px-2 py-1 text-gray-700 flex items-center justify-center mr-1">
          <PiCheckBold className="text-xl text-green-600 font-bold" />
          <div className="ml-1">Sync completed</div>
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