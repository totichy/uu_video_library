//@@viewOn:imports
import React from "react";
import "uu5g04-bricks";
import { createVisualComponent, useRef, useState, useLsi, useDataList,useDataObject } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import VideoProvider from "video-provider";
import VideoCreate from "video-create";
import Video from "video-detail";
import VideoLsi from "config-video";
import Calls from "calls";
import Errors from "config-error";
import VideoUpdateForm from "video-update-form";
import Css from "css";
//@@viewOff:imports

const CLASS_NAMES = {
  footer: () => Css.css`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 93, 167, 0.12);
  padding: 0 8px;
  margin: 0 8px;
  height: 48px;
  justify-content: space-between;
`,
  main: () => Css.css`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`,
  linkCat: () => Css.css`
margin-right: 10px;
`,
  vimeo: () => Css.css`
  margin: 16px;
  padding: 57% 0 0 0;
  position:relative;
  `,
  novideo: () => Css.css`
  margin-bottom: 5px;
  border:0;
  width: 100%;
  height: 100%;
  `,
  vimeoframe: () => Css.css`
  position: absolute;
  border:0;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  `,
  video: () => Css.css`
  margin 0 16px 0 16px;
  `,
  header: () => Css.css`
  font-size: 20px;
  color: #005da7;
  font-family: ClearSans-Medium, ClearSans, sans-serif;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  line-height: 20px;
  `,
  right: () => Css.css`
  float:right;
  `,
  content: () => Css.css`
  padding: 16px;
  `,
  textContent: () => Css.css`
  color: black;
  padding: 16px 0;
  `,
};

const STATICS = {
  //@@viewOn:statics
  displayName: "VideoDetailCode",
  //@@viewOff:statics
};

export const VideoDetailCode = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOn:propTypes

  //@@viewOff:propTypes
  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render(props) {

    const queryCode = window.location.search;
    const urlParams = new URLSearchParams(queryCode).get("code");
    if (urlParams === null) {
      return  <UU5.Bricks.Error content={"Video s code neexistuje"} />;
    }

    let listData = useDataObject({
      handlerMap: {
          load: Calls.getVideo
      },
      initialDtoIn:  {code: urlParams} 
  
  });


  let { state, data, errorData, pendingData, handlerMap } = listData;


    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedVideoShow, setSelectedVideoShow] = useState(false);
    //@@viewOn:hook
    const createVideoRef = useRef();
    const deleteVideoRef = useRef();
    const ratingVideoRef = useRef();
    const updateVideoRef = useRef();
  
    //@@viewOff:hook

    const delVideoText = VideoLsi.delVideo || {};
    const wasDeleted = VideoLsi.wasDeleted || {};
    const wasCreated = VideoLsi.wasCreated || {};
    const wasUpdated = VideoLsi.wasUpdated || {};
    const createError = VideoLsi.errorCreate || {};
    const updateError = VideoLsi.errorVideoUpdate || {};
    const errorServerData = VideoLsi.errorServer || {};
    const AllVideos = VideoLsi.AllVideos || {};


    let VideoListHeader = useLsi(AllVideos);
    let videoWithTitle = useLsi(delVideoText);
    let wasDeletedC = useLsi(wasDeleted);
    let wasCreatedC = useLsi(wasCreated);
    let wasUpdatedC = useLsi(wasUpdated);
    let errorCreated = useLsi(createError);
    let errorUpdated = useLsi(updateError);
    let serverErrorData = useLsi(errorServerData);
    let VideoHeader = VideoListHeader;

    const errorTtl = Errors.titleError || {};
    let headerError = useLsi(errorTtl);
    const errorDn = Errors.titleDone || {};
    let headerDone = useLsi(errorDn);
    const ratingSuccessCgi = VideoLsi.ratingSuccess || {};
    let ratingSuccess = useLsi(ratingSuccessCgi);
    const isFailedCgi = VideoLsi.isFailed || {};
    let isFailed = useLsi(isFailedCgi);
    
    const deletionOfCgi = VideoLsi.deletionOf || {};
    let deletionOf = useLsi(deletionOfCgi);
    
    const ratingOfCgi = VideoLsi.ratingOf || {};
    let ratingOf = useLsi(ratingOfCgi);

    const loadingCgi = VideoLsi.loading || {};
    let loading = useLsi(loadingCgi);
    

    // const categoryListResult = useDataList({
    //   handlerMap: {
    //     load: Calls.listCategory,
    //   },
    //   initialDtoIn: { data: {} },
    // });

    // const categoryMap = {};
    // if (categoryListResult.data) {
    //   categoryListResult.data.forEach(
    //     (category) => (categoryMap[category.data.categoryId] = category.data.categoryName)
    //   );
    // }

    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
        closeTimer: 3000,
        header: headerError,
        block: true,
      });
    }

    function showSuccess(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "green",
        closeTimer: 3000,
        header: headerDone,
        block: true,
      });
    }

    async function handleCreateVideo(video) {
      try {
        await createVideoRef.current(video);
        showSuccess(`${videoWithTitle} ${video.title} ${wasCreatedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.error[0].message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(errorCreated);
        } else {
          showError(errorCreated);
        }
      }
    }

    function handleCancel() {
      setSelectedVideo(null);
      setSelectedVideoShow(false);
    }

    function handleUpdateVideo2(video) {
      setSelectedVideo(video);
      setSelectedVideoShow(true);
        }

    async function handleUpdateVideo(video) {
      try {
        await updateVideoRef.current(video);
        showSuccess(`${videoWithTitle} ${video.title} ${wasUpdatedC}`);
        setSelectedVideo(null);
        setSelectedVideoShow(false);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(errorUpdated);
        } else {
          showError(errorUpdated);
        }
      }
    }

    async function handleDeleteVideo(video) {
      try {
        await deleteVideoRef.current({ code: video.code }, video.code);
        showSuccess(`${videoWithTitle} ${video.title} ${wasDeletedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.error_message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(`${deletionOf} ${video.title} ${isFailed}`);
        } else {
          showError(`${deletionOf} ${video.title} ${isFailed}`);
        }
      }
    }

    async function handleRatingVideo(video, mrating) {
      try {
        await ratingVideoRef.current({ code: video.code, mrating: Number(mrating) });
        showSuccess(ratingSuccess + mrating);
      } catch (e) {
        showError(`${ratingOf} ${video.title} ${isFailed}`);
      }
    }
    function renderLoad() {
      return <UU5.Bricks.Loading>{loading}</UU5.Bricks.Loading>;
    }

    function renderError(errorData) {
      return <UU5.Bricks.Error content={errorData.error_message} />;
    }


    //@@viewOn:private



    function renderReady(video) {
      

  
      const attrs = UU5.Common.VisualComponent.getAttrs(props);
      return (
        <div>
           
      
          <div {...attrs}>
            <VideoUpdateForm
              setSelectedVideo={setSelectedVideo}
              onCancel={handleCancel}
              onUpdateVideo={handleUpdateVideo}
              selectedVideoShow={selectedVideoShow}
              selectedVideo={selectedVideo}
              selectedVideoShow={selectedVideoShow}
            />
          </div>

            <VideoCreate
              onCreate={handleCreateVideo}
            />
          <UU5.Bricks.Section>
            <div>
              <UU5.Bricks.Container>
                <UU5.Bricks.Header level={3} content={VideoHeader} underline={true} />
                <Video
                  video={video}
                  onDelete={handleDeleteVideo}
                  onUpdate={handleUpdateVideo2}
                  onRating={handleRatingVideo}
                />
              </UU5.Bricks.Container>
            </div>
          </UU5.Bricks.Section>
        </div>
      );
    }

    //@@viewOn:interface

    //@@viewOff:interface

    //@@viewOn:render
   
    return (
      <div>
      
          {({ state, data, newData, pendingData, errorData, handlerMap }) => {

           
            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderError(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReady(data);
            }
          }}

      </div>
    );
    //@@viewOff:render
  },
});

export default VideoDetailCode;
