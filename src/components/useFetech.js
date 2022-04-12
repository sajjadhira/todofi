import axios from "axios";
import { useQuery } from "react-query";

let useFetech = (args) => {
  // config we support from useFetech request
  // args.url for request url -- its must required
  // args.key for useQuery caching -- its must required and should have unique for each page
  // args.key can be array and string with key and id array index or only key //
  // args.method = get/post/put/delete -- its not required
  // args.payload = json data from post -- its required for post method
  // args.interval = Its for interval data, its not required
  // token from get session storage

  const controller = new AbortController();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (
    typeof localStorage.getItem("token") !== "undefined" &&
    localStorage.getItem("token") != null
  ) {
    const token = localStorage.getItem("token");
    const auth = {
      Authorization: "Bearer " + token,
    };
    Object.assign(config.headers, auth);
  }
  let method = args.method ? args.method : "get";
  let payload = args.payload ? args.payload : {};
  let url = args.page ? args.url + "?_limit=1&_page=" + args.page : args.url;

  let basicConig = { method: method, url: url, data: payload };
  Object.assign(config, basicConig);

  // console.log(config);

  let request = () => {
    return axios(config).catch((err) => {
      controller.abort(err);
    });
  };

  let property =
    args.key["property"] && args.key["id"]
      ? [args.key["property"], args.key["id"]]
      : args.key;

  return useQuery(property, request, {
    enabled: args.display ? false : true,
    refetchInterval: args.interval ? args.interval : false,
    keepPreviousData: args.page ? true : false,
    //  onSuccess: (data) =>{
    //      console.log(data)
    //  }
  });
};

export default useFetech;
