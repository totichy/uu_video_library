//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import { createVisualComponent, useScreenSize, useState } from "uu5g04-hooks";
import { nl2br } from "string-helper";
import VideoDetail from "video-detail";
import Css from "css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: "Video",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

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
  vimeo: () => Css.css`
  margin:0 0 10px 0;
  padding: 57% 0 0 0;
  position:relative;
  `,
  vimeoframe: () => Css.css`
  position: absolute;
  border:0;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  padding:0;
  margin:0;
  `,
  novideo: () => Css.css`
  margin-bottom: 14px;
  border:0;
  width: 100%;
  height: 100%;
  `,
  video: () => Css.css`
  width: 100%;
  margin 0px;
  `,
  header: () => Css.css`
  font-size: 20px;
  color: #005da7;
  font-family: ClearSans-Medium, ClearSans, sans-serif;
  display: flex;
  padding: 5px 0;
  overflow: hidden;
  white-space: nowrap; 
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 16px 0;
  line-height: 26px;
  `,
  right: () => Css.css`
  float:right;
  `,
  content: () => Css.css`
  padding: 0 16px;
  overflow: hidden;
  `,
  textContent: () => Css.css`
  overflow: hidden;
  height: 90px;
  color: black;
  `,
};

export const Video = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    video: UU5.PropTypes.shape({
      code: UU5.PropTypes.string.isRequired,
      title: UU5.PropTypes.string.isRequired,
      authorName: UU5.PropTypes.string.isRequired,
      authorSurname: UU5.PropTypes.string.isRequired,
      category: UU5.PropTypes.any.isRequired,
      videoUrl: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string.isRequired,
      visible: UU5.PropTypes.bool,
      averageRating: UU5.PropTypes.number,
      ratingCount: UU5.PropTypes.number,
      ratingTotal: UU5.PropTypes.number,
    }),
    onDelete: UU5.PropTypes.func,
    onRating: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    video: null,
    onDelete: () => {},
    onRating: () => {},
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps

  render({ video, onDelete, onRating, onUpdate }) {
    //@@viewOn:hooks
    const screenSize = useScreenSize();
    const date = new Date(Number(video.code)).toLocaleDateString("cs-CZ");
    const [mrating, setRating] = useState(video.averageRating);
    const [ratingVote, setRatingVote] = useState(true);
    const handleChange = (value) => {
      setRating(Number(value));
      setRatingVote(false);
    };
    const nameAuthor = video.authorName + " " + video.authorSurname;
    const videoDetailModal = <VideoDetail key={video.code} video={video} onRating={onRating} />;
    //@@viewOff:hooks

    //@@viewOn:private

    function handleDelete() {
      onDelete(video);
    }

    function handleUpdate() {
      onUpdate(video);
    }

    function handleRating(i) {
      let ratingAverage = ((Number(video.ratingTotal) + i) / (Number(video.ratingCount) + 1)).toFixed(1);
      handleChange(ratingAverage);
      onRating(video, Number(i));
    }
    //@@viewOff:private

    //@@viewOn:interface
    function renderHeader() {
      return (
        <UU5.Bricks.Div level={6} className={CLASS_NAMES.header()}>
          <UU5.Bricks.LinkModal
            children={video.title}
            hidden={false}
            modalProps={{ size: "l" }}
            colorSchema="blue"
            component={videoDetailModal}
          />
          {/* <UU5.Bricks.Link href={"video?code=" + video.code} target="_self" colorSchema="blue">
            {video.title}
          </UU5.Bricks.Link> */}
        </UU5.Bricks.Div>
      );
    }

    function descriptionLength() {
      if (video.description.length > 110) {
        return nl2br(video.description.slice(0, 110) + "...");
      } else {
        return nl2br(video.description);
      }
    }

    function viodeShow() {
      var videoId = "";
      if (video.videoUrl.indexOf("youtube") !== -1) {
        var urlParts = video.videoUrl.split("?v=");
        videoId = "https://www.youtube.com/embed/" + urlParts[1].substring(0, 11);
      } else if (video.videoUrl.indexOf("youtu.be") !== -1) {
        var urlParts2 = video.videoUrl.replace("//", "").split("/");
        videoId = "https://www.youtube.com/embed/" + urlParts2[1].substring(0, 11);
      }
      if (videoId !== "") {
        return (
          <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
            <iframe
              className={CLASS_NAMES.vimeoframe()}
              src={videoId}
              title="YouTube video player"
              width="100%"
              style={{ border: 0 }}
              height="100%"
              allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            ></iframe>
          </UU5.Bricks.Div>
        );
      } else {
        if (video.videoUrl.indexOf("vimeo") !== -1) {
          var urlParts3 = video.videoUrl.replace("//", "").split("/");
          videoId = "https://player.vimeo.com/video/" + urlParts3[1].substring(0, 11) + "?byline=0&portrait=0";
        }
      }
      if (videoId !== "") {
        return (
          <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
            <iframe
              className={CLASS_NAMES.vimeoframe()}
              src={videoId}
              allow="autoplay; fullscreen; picture-in-picture"
            ></iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </UU5.Bricks.Div>
        );
      }

      if (video.videoUrl.includes(".mp4") || video.videoUrl.includes(".ogg") || video.videoUrl.includes(".mp3")) {
        if (video.videoUrl.includes(".mp3")) {
          return (
            <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
              <UU5.Bricks.Audio
                src={video.videoUrl}
                className={CLASS_NAMES.vimeoframe()}
                autoPlay={false}
              />
            </UU5.Bricks.Div>
          );
        } else {
          return (
            <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
              <UU5.Bricks.Video
                src={video.videoUrl}
               //@@ poster={"https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress"}
                className={CLASS_NAMES.vimeoframe()}
                autoPlay={false}
              />
            </UU5.Bricks.Div>
          );
        }
      } else {
        return (
          <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
            <UU5.Bricks.Link href={video.videoUrl} target="_blank">
              <UU5.Bricks.Image src="https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress" className={CLASS_NAMES.vimeoframe()} responsive={true} />
            </UU5.Bricks.Link>
          </UU5.Bricks.Div>
        );
      }
    }

    //@@viewOff:interface

    //@@viewOn:render

    function renderDelete() {
      return (
        <UU5.Bricks.Button onClick={handleDelete} bgStyle="transparent" colorSchema="red">
          <UU5.Bricks.Icon icon="mdi-delete" />
        </UU5.Bricks.Button>
      );
    }

    function renderUpdate() {
      return (
        <UU5.Bricks.Button onClick={handleUpdate} bgStyle="transparent" colorSchema="green">
          <UU5.Bricks.Icon icon="mdi-pencil" />
        </UU5.Bricks.Button>
      );
    }
    function renderRating() {
      if (screenSize === "xs") {
        return null;
      }
      let ratingSize = screenSize === "s" ? "m" : "s";
      if (!ratingVote) {
        return (
          <UU5.Bricks.Section>
            <UU5.Bricks.Rating count={5} value={video.averageRating} size={ratingSize} colorSchema="orange" />
          </UU5.Bricks.Section>
        );
      } else {
      return (
        <UU5.Bricks.Section>
          <UU5.Bricks.Rating
            count={5}
            value={mrating}
            size={ratingSize}
            colorSchema="orange"
            onChange={handleChange}
            onClick={(i) => handleRating(i)}
          />
        </UU5.Bricks.Section>
      );
      }
    }

    if (!video) {
      return null;
    }

    return (
      <UU5.Bricks.Column colWidth="xs-12 m-6 l-4">
        <UU5.Bricks.Card className={CLASS_NAMES.main()}>
          <UU5.Bricks.Div>{viodeShow()}</UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            {renderHeader()}
            <UU5.Bricks.Div className={CLASS_NAMES.textContent()}>{descriptionLength()}</UU5.Bricks.Div>
            <UU5.Bricks.Div>{nameAuthor + " | " + date}</UU5.Bricks.Div>
          </UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.footer()}>
            {renderRating()}
            <UU5.Bricks.Div className={CLASS_NAMES.right()}>
              {renderUpdate()}
              {renderDelete()}
            </UU5.Bricks.Div>
          </UU5.Bricks.Div>
        </UU5.Bricks.Card>
      </UU5.Bricks.Column>
    );
    //@@viewOff:render
  },
});

export default Video;