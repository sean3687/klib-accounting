import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

const AuthorizeQuickBook = () => {
  const router = useRouter();
  const { code, realmId } = router.query;
  const [qbAccessToken, setQbAccessToken] = useSessionStorage(
    "qb_access_token",
    ""
  );
  const [qbRefreshToken, setQbRefreshToken] = useSessionStorage(
    "qb_refresh_token",
    ""
  );

  useEffect(() => {
    if (code && realmId) {
      // Handle the authorization logic here
      // For example, send these to your API to exchange for an access token
    }
  }, [code, realmId]);

  const exchangeToken = async () => {
    try {
      const response = await axios.post(
        "https://cpal-admin.com/get_token/",
        {
          code: code,
          realm_id: realmId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setQbAccessToken(response.data.access_token);
      setQbRefreshToken(response.data.refresh_token);
      console.log(
        "This is access token from quickbook: ",
        response.data.accessToken
      );
      toast.success("Autorized successfully");
      //add 2 second delay

      window.location.href = "/profile";
      console.log(response.data); // Handle the response data
    } catch (error) {
        toast.error("Please Try Again Later");
      console.error("Error during token exchange:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="">
        {code && realmId ? (
          <div>
            <div className="flex items-center mx-20">
              <div className="rounded-full bg-blue-400 w-20 h-20 flex items-center justify-center">
                <div className="font-bold text-xl text-white">CPAL</div>
              </div>
              <div className="flex-grow border-t-2 border-dotted border-gray-400 relative">
                <IoIosCheckmarkCircle className="text-green-500 text-5xl bg-gray-100 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <Image
                src="/quickbook_logo.svg"
                alt="quickbook_logo"
                width={80}
                height={80}
              />
            </div>
            <div className="text-center text-xl font-bold mt-10 mb-5">
              CPAL by Trise would like permission to:{" "}
            </div>

            <div className="bg-white py-8 rounded-lg shadow-md w-full max-w-md flex flex-col justify-center items-center">
              <div className="text-xs text-gray-500 px-8">
                By clicking Authorize QuickBooks, you are agreeing to share your
                data with CPAL
              </div>
              
              <ul className="list-disc text-xs w-full px-14 mt-2 mb-2">
                <li>data about your company,</li>
                <li>data about your customers, suppliers and/or employees,</li>
                <li>
                  any updates you may make to your QuickBooks Online data after
                  you connect
                </li>
              </ul>

              <div className="border-b rounded-md border-gray-300 w-full px-8 mt-2"></div>
              <div className="w-full flex gap-2 text-sm px-8">
                <button
                  onClick={() => router.push("/profile")}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Cancel
                </button>
                <button
                  onClick={exchangeToken}
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Authorize QuickBooks
                </button>
              </div>
              <div className="text-center text-xs mt-2">
                <div>authorizing will redirect to</div>
                <div className="font-bold">
                  <a className="">https://klib-accounting.vercel.app/</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Please finish login on quickbook.com</div>
        )}
      </div>
    </div>
  );
};

export default AuthorizeQuickBook;
