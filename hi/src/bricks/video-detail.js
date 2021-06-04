//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import { createVisualComponent, useScreenSize, useLsi, useDataList, useState } from "uu5g04-hooks";
import { nl2br } from "string-helper";
import VideoLsi from "config-video";
import Calls from "calls";
import Form from "config-createform";
import Css from "css";
//@@viewOff:imports

const CLASS_NAMES = {
  footer: () => Css.css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 93, 167, 0.12);
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

export const VideoDetail = createVisualComponent({
  displayName: "VideoDetail",

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
    onRating: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    video: null,
    onRating: () => {},
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps

  render({ video, onRating, onUpdate }) {
    //@@viewOn: hooks
    const screenSize = useScreenSize();

    const queryCode = window.location.search;
    const urlParams = new URLSearchParams(queryCode).get("code");
    //@@viewOff: hooks
    const [mrating, setRating] = useState(video.averageRating);
    const [ratingVote, setRatingVote] = useState(true);
    const handleChange = (value) => {
      setRating(Number(value));
      setRatingVote(false);
    };
    //@@viewOn:private
    const descCg = Form.descriptionCgi || {};
    const urlCg = Form.urlCgi || {};
    const categoryCg = Form.category || {};
    const copyButtonCg = Form.copyButton || {};

    let copyButton = useLsi(copyButtonCg);
    let description = useLsi(descCg);
    let videoUrl = useLsi(urlCg);
    let category = useLsi(categoryCg);

    const date = new Date(Number(video.code)).toLocaleDateString("cs-CZ");

    const catListResult = useDataList({
      handlerMap: {
        load: Calls.listCategory,
      },
      initialDtoIn: { data: {} },
    });
    const categoryMap = {};
    if (catListResult.data) {
      catListResult.data.forEach((cat) => (categoryMap[cat.data.categoryId] = cat.data));
    }

    //@@viewOff:private

    function categoryList() {
      let result = [];
      video.category.forEach((categoryId) =>
        result.push(
          <UU5.Bricks.Link href={"home/?category=" + categoryId} target="_self" className={CLASS_NAMES.linkCat()}>
            <UU5.Bricks.Icon icon="mdi-tag" /> {categoryMap[categoryId] && categoryMap[categoryId].categoryName}
          </UU5.Bricks.Link>
        )
      );
      result.join(", ");

      return result;
    }

    function handleUpdate() {
      onUpdate(video);
    }
    function handleRating(i) {
      let ratingAverage = ((Number(video.ratingTotal) + i) / (Number(video.ratingCount) + 1)).toFixed(1);
      handleChange(ratingAverage);
      onRating(video, Number(i));
    }

    //@@viewOn:interface
    let nameAuthor = video.authorName + " " + video.authorSurname;

    function renderRating() {
      if (screenSize === "xs") {
        return null;
      }

      let ratingSize = screenSize === "s" ? null : "m";

      if (urlParams === null || !ratingVote) {
        return (
          <UU5.Bricks.Section>
            <UU5.Bricks.Rating count={5} value={video.averageRating} size={ratingSize} colorSchema="orange" />{" "}
            <UU5.Bricks.Lsi lsi={VideoLsi.vote} /> {video.ratingCount}
          </UU5.Bricks.Section>
        );
      } else {
        return (
          <UU5.Bricks.Section>
            <UU5.Bricks.Rating
              count={5}
              value={mrating}
              size={"m"}
              colorSchema="orange"
              onChange={handleChange}
              onClick={(i) => handleRating(i)}
            />
          </UU5.Bricks.Section>
        );
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
        //@@return  <UU5.Bricks.Iframe src={videoId} height={168} allow="fullscreen" allowfullscreen />;
      } else {
        if (video.videoUrl.indexOf("vimeo") !== -1) {
          var urlParts3 = video.videoUrl.replace("//", "").split("/");
          videoId = "https://player.vimeo.com/video/" + urlParts3[1].substring(0, 11) + "?title=0&byline=0&portrait=0";
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
              <UU5.Bricks.Audio src={video.videoUrl} className={CLASS_NAMES.vimeoframe()} autoPlay={false} />
            </UU5.Bricks.Div>
          );
        } else {
          return (
            <UU5.Bricks.Div className={CLASS_NAMES.vimeo()}>
              <UU5.Bricks.Video src={video.videoUrl} className={CLASS_NAMES.vimeoframe()} autoPlay={false} />
            </UU5.Bricks.Div>
          );
        }
      } else {
        return (
          <UU5.Bricks.Div className={CLASS_NAMES.video()}>
            <UU5.Bricks.Link href={video.videoUrl} target="_blank">
              <UU5.Bricks.Image
                src="https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg?auto=compress"
                className={CLASS_NAMES.novideo()}
                responsive={true}
              />
            </UU5.Bricks.Link>
          </UU5.Bricks.Div>
        );
      }
    }

    function renderUpdate() {
      return (
        <UU5.Bricks.Button onClick={handleUpdate} bgStyle="transparent" colorSchema="green">
          <UU5.Bricks.Icon icon="mdi-pencil" />
        </UU5.Bricks.Button>
      );
    }

    //@@viewOn:render
    if (!video) {
      return null;
    }

    if (urlParams === null) {
      return (
        <UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <UU5.Bricks.Div>{viodeShow()}</UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>
              <strong>{"Originál " + videoUrl}</strong>
              {": "}
              <UU5.Bricks.Link href={video.videoUrl} target="_blank">
                {video.videoUrl}
              </UU5.Bricks.Link>
              <UU5.Bricks.Div className={CLASS_NAMES.textContent()}>
                <strong>{"Server " + videoUrl}</strong>
                {": "}
                <UU5.Bricks.Link href={"video?code=" + video.code} className={CLASS_NAMES.linkCat()}>
                  {"http://localhost:3000/video?code=" + video.code}
                </UU5.Bricks.Link>
                <UU5.Bricks.Button
                  onClick={() => {
                    navigator.clipboard.writeText("http://localhost:3000/video?code=" + video.code);
                  }}
                  colorSchema="blue"
                >
                  <UU5.Bricks.Icon icon="mdi-content-copy" /> {copyButton}
                </UU5.Bricks.Button>
              </UU5.Bricks.Div>
            </UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>
              <strong>{description}</strong>
              {": "}
              <br />
              {nl2br(video.description)}
            </UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>
              <strong>{category}</strong>
              {": "}
              {categoryList}
            </UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>{nameAuthor + " | " + date}</UU5.Bricks.Div>
          </UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.footer()}>{renderRating()}</UU5.Bricks.Div>
        </UU5.Bricks.Div>
      );
    } else {
      return (
        <UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.right()}>{renderUpdate()}</UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.footer()}>{renderRating()}</UU5.Bricks.Div>
          <UU5.Bricks.Div className={CLASS_NAMES.content()}>
            <UU5.Bricks.Div>{viodeShow()}</UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>
              <strong>{"Originál " + videoUrl}</strong>
              {": "}
              <UU5.Bricks.Link href={video.videoUrl} target="_blank">
                {video.videoUrl}
              </UU5.Bricks.Link>
              <UU5.Bricks.Div className={CLASS_NAMES.textContent()}>
                <strong>{"Server " + videoUrl}</strong>
                {": "}
                <UU5.Bricks.Link href={"video?code=" + video.code} className={CLASS_NAMES.linkCat()}>
                  {"http://localhost:3000/video?code=" + video.code}
                </UU5.Bricks.Link>
                <UU5.Bricks.Button
                  onClick={() => {
                    navigator.clipboard.writeText("http://localhost:3000/video?code=" + video.code);
                  }}
                  colorSchema="blue"
                >
                  <UU5.Bricks.Icon icon="mdi-content-copy" /> {copyButton}
                </UU5.Bricks.Button>
              </UU5.Bricks.Div>
            </UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>
              <strong>{description}</strong>
              {": "}
              <br />
              {nl2br(video.description)}
            </UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>
              <strong>{category}</strong>
              {": "}
              {categoryList}
            </UU5.Bricks.Div>
            <UU5.Bricks.Div className={CLASS_NAMES.content()}>{nameAuthor + " | " + date}</UU5.Bricks.Div>
          </UU5.Bricks.Div>
        </UU5.Bricks.Div>
      );
    }
    //@@viewOff:render
  },
});

export default VideoDetail;
