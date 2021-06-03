/**
 * Server calls of application client.
 */
import { Client } from "uu_appg01";


const call = async (method, uri, dtoIn) => {
  let response = await Client[method](uri, dtoIn, {});
  return response.data;
};
let Calls = {
  /** URL containing app base, e.g. "https://uuapp.plus4u.net/vendor-app-subapp/awid/". */
  //@@APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  listVideos(dtoIn) {
    let commandUri = Calls.getCommandUri("video/list");
    return call("get", commandUri, dtoIn);
  },
  getVideo(dtoIn) {
    let commandUri = Calls.getCommandUri("video/get");
    return call("get", commandUri, dtoIn);
  },
  createVideo(dtoIn) {
    let commandUri = Calls.getCommandUri("video/create");
    return call("post", commandUri, dtoIn);
  },
  updateVideo(dtoIn) {
    let commandUri = Calls.getCommandUri("video/update");
    return call("post", commandUri, dtoIn);
  },
  deleteVideo(dtoIn) {
    let commandUri = Calls.getCommandUri(`video/delete`);
    return call("post", commandUri, dtoIn);
  },
  ratingVideo(dtoIn) {
    let commandUri = Calls.getCommandUri("video/rating");
    return call("post", commandUri, dtoIn);
  },
  listCategory() {
    let commandUri = Calls.getCommandUri("category/list");
    return call("get", commandUri, {});
  },
  createCategory(dtoIn) {
    let commandUri = Calls.getCommandUri("category/create");
    return call("post", commandUri, dtoIn);
  },
  updateCategory(dtoIn) {
    let commandUri = Calls.getCommandUri("category/update");
    return call("post", commandUri, dtoIn);
  },
  deleteCategory(dtoIn) {
    let commandUri = Calls.getCommandUri("category/delete");
    return call("post", commandUri, dtoIn);
  },


  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json, for example:
   {
     ...
     "uu5Environment": {
       "gatewayUri": "https://uuapp.plus4u.net",
       "awid": "b9164294f78e4cd51590010882445ae5",
       "vendor": "uu",
       "app": "demoappg01",
       "subApp": "main"
     }
   }
   */
  
  getCommandUri(aUseCase, uri = "http://localhost:3000") {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    if (uri.charAt(uri.length - 1) !== "/") uri += "/";
    return uri + aUseCase.replace(/^\/+/, "");
},
};

export default Calls;
