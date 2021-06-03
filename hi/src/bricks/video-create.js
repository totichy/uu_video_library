//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import { useHistory } from "react-router-dom";
import { createComponent, useState, useLsi } from "uu5g04-hooks";
//import validator from "validator";
import VideoCreateForm from "video-create-form";
import Form from "config-createform";
import Errors from "config-error";
import Css from "css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: "VideoCreate",
  //@@viewOff:statics
};

const Mode = {
  BUTTON: "BUTTON",
  FORM: "FORM",
};

const CLASS_NAMES = {
  addVideoUse: () => Css.css`
    text-align: right;
    padding: 26px 26px 0 0;
    display: inline-block;
    vertical-align: baseline;
    width:100%;
  `,
  addVideoItem: () => Css.css`
  padding: 0px 26px 0px 0;
  display: inline-block;
  vertical-align: baseline;
`,
  addSearchItem: () => Css.css`
padding: 0 26px 0 0;
display: inline-block;
vertical-align: baseline;
`,
  magnifyc: () => Css.css`
  padding:10px;
`,
  input: () => Css.css`
  flex: 1,
  width: 100%;
  height: 32px;
  padding: 6px 30px 6px 8px;
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  background-image: none;
  border: 1px solid #bdbdbd;
  border-radius: 2px;
  margin-right: -30px;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
`,
  searchSection: () => Css.css`
  display: inline-block;
  flex: 1;
  flex-direction: row;
  align: 'right';
  background-color: '#fff';
  padding: 0;
  `,
};

export const VideoCreate = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    searchQuery: UU5.PropTypes.any,
    onCreate: UU5.PropTypes.func,
    setSearchQuery: UU5.PropTypes.func,
    categoryQuery: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryQuery: null,
    searchQuery: "",
    setSearchQuery: () => {},
    onCreate: () => {},
  },
  //@@viewOff:defaultProps

  render({ onCreate, searchQuery, setSearchQuery, categoryQuery }) {
    const addBtn = Form.addButtonCgi || {};
    let addButton = useLsi(addBtn);

    const urlValid = Errors.validURL || {};
    let validURL = useLsi(urlValid);
    const titleValid = Errors.validDescription || {};
    let validTitle = useLsi(titleValid);
    const descValid = Errors.validTitle || {};
    let validDescription = useLsi(descValid);
    const searchV = Form.searchCgi || {};
    let searchPlaceHolder = useLsi(searchV);
    const errorTtl = Errors.titleError || {};
    let headerError = useLsi(errorTtl);

    const errorName = Errors.nameError || {};
    let nameError = useLsi(errorName);

    function handleFormChange() {}

    //@@viewOn:hooks
    const [mode, setMode] = useState(Mode.BUTTON);

    const history = useHistory();
    const onSubmitt = (e) => {
      if (categoryQuery) {
        history.push(`?category=${categoryQuery}&s=${searchQuery}`);
      } else {
        history.push(`?s=${searchQuery}`);
      }
      e.preventDefault();
    };
    //@@viewOff:hooks

    //@@viewOn:private
    function handleClick() {
      setMode(Mode.FORM);
    }


    function isURL(str) {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }

    const letters = /^[A-Za-z,ňďěščřžýáíéůúäÄĚŠČŘŽÝÁÍÉÚŮŇ]+$/;

    function handleSave({ values }) {
      if (
        !values.title ||
        !values.category[0] ||
        !values.videoUrl ||
        !values.description ||
        !values.authorName ||
        !values.authorSurname
      ) {
        return null;
      }
      let errorMessage = "";

      if (!isURL(values.videoUrl)) {
        errorMessage = errorMessage + validURL;
        UU5.Environment.getPage().getAlertBus().addAlert({
          content: validURL,
          colorSchema: "red",
          closeTimer: 3000,
          header: headerError,
          block: true,
          stacked: true,
        });
      }
    

        if (!values.authorName.match(letters) || !values.authorSurname.match(letters)) {
        errorMessage = errorMessage + validTitle;
        UU5.Environment.getPage().getAlertBus().addAlert({
          content: nameError,
          colorSchema: "red",
          closeTimer: 3000,
          header: headerError,
          block: true,
          stacked: true,
        });
      }

      if (values.title.length < 3 || values.title.length > 100) {
        errorMessage = errorMessage + validTitle;
        UU5.Environment.getPage().getAlertBus().addAlert({
          content: validTitle,
          colorSchema: "red",
          closeTimer: 3000,
          header: headerError,
          block: true,
          stacked: true,
        });
      }
      if (values.description.length < 3 || values.description.length > 500) {
        errorMessage = errorMessage + validDescription;
        UU5.Environment.getPage().getAlertBus().addAlert({
          content: validDescription,
          colorSchema: "red",
          closeTimer: 3000,
          header: headerError,
          block: true,
          stacked: true,
        });
      }

      if (errorMessage != "") {
        return null;
      }

      let video = {
        code: new Date().getTime().toString(),
        authorName: values.authorName,
        authorSurname: values.authorSurname,
        title: values.title,
        videoUrl: values.videoUrl,
        description: values.description,
        category: values.category,
        visible: true,
        averageRating: 0,
        ratingCount: 0,
        ratingTotal: 0,
      };

      onCreate(video);
      setMode(Mode.BUTTON);
    }
    function handleCancel() {
      setMode(Mode.BUTTON);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function renderButton() {
      return (
        <div>
          <UU5.Bricks.Div className={CLASS_NAMES.addVideoUse()}>
            <UU5.Bricks.Div className={CLASS_NAMES.addSearchItem()}>
              <UU5.Bricks.Div className={CLASS_NAMES.searchSection()}>
                <form action="/" method="get" autoComplete="off" onSubmit={onSubmitt}>
                  <input
                       className={CLASS_NAMES.input()}
                    value={searchQuery}
                    onInput={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder={searchPlaceHolder}
                    onChange={handleFormChange}
                    name="s"
                  />
                  <UU5.Bricks.Icon icon="mdi-magnify"  />
                </form>
              </UU5.Bricks.Div>
            </UU5.Bricks.Div>
            <UU5.Bricks.Div  className={CLASS_NAMES.addVideoItem()}>
              <UU5.Bricks.Button onClick={handleClick} content={addButton} colorSchema="blue" />
            </UU5.Bricks.Div>
          </UU5.Bricks.Div>
        </div>
      );
    }
    function renderForm() {
      return (
        <UU5.Bricks.Modal size="l" offsetTop={100} shown={true}>
          <VideoCreateForm onSubmit={handleSave} onCancel={handleCancel} />
        </UU5.Bricks.Modal>
      );
    }

    if (mode === Mode.BUTTON) {
      return renderButton();
    } else {
      return renderForm();
    }
    //@@viewOff:render
  },
});

export default VideoCreate;
