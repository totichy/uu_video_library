//@@viewOn:imports
//@@import UU5 from "uu5g04";
import React from "react";
import { createComponent, useDataList, useState } from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: "VideoProvider",
  //@@viewOff:statics
};

export const VideoProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render({ children }) {

    const { search } = window.location;
    const query = new URLSearchParams(search).get("s");
   

    //@@viewOn:hooks
    let listData = useDataList({
     itemIdentifier: "code",
      handlerMap: {
        load: Calls.listVideos,
        createVideo: Calls.createVideo,
        deleteVideo: Calls.deleteVideo,
        ratingVideo: Calls.ratingVideo,
        updateVideo: Calls.updateVideo,
      },
      initialDtoIn: {title: query},
    });


    let { state, data, newData, pendingData, errorData, handlerMap } = listData;
    //@@viewOff:hooks
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children({ state, data, newData, pendingData, errorData, handlerMap });
    //@@viewOff:render
  },
});

export default VideoProvider;
