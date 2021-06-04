//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent, useState} from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Left from "left";
import About from "about";
import Home from "home";
import VideoDetailCode from "route-video-detail";
import Categories from "categories";
import NotFoundRoute from "not-found";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName:  "Spa",
  //@@viewOff:statics
};

//@@const About = UU5.Common.Component.lazy(() => import("about"));
const vquery = new URLSearchParams(window.location).get("code");
const DEFAULT_USE_CASE = "home";
const ROUTES = {
  "": DEFAULT_USE_CASE,
  home: { component: <Home /> },
  notFound: { component: <NotFoundRoute /> },
  video: { component: <VideoDetailCode /> },
  about: { component: <About /> },
  categories: { component: <Categories /> },
};
export const Spa = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let [initialActiveItemId] = useState(() => {
        let url = UU5.Common.Url.parse(window.location.href);
        if(url === "test" || url === "category" ) {
          return "home";
        } else if (url === "video"  && !vquery) {
          return "notFound";

        }
        return url.useCase || "home";
      });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
        <Plus4U5.App.MenuProvider activeItemId={initialActiveItemId}>
          <Plus4U5.App.Page
            {...props}
            top={<Plus4U5.App.Top />}
            topFixed="smart"
           //@@ bottom={<Bottom />}
            leftWrapperProps={{ style: { backgroundColor: '#fafafa' } }}
            type={3}
            displayedLanguages={["cs", "en"]}
            left={<Left />}
            leftFixed
            leftWidth="!xs-300px !s-300px !m-288px !l-288px !xl-288px"
            leftRelative="m l xl"
            leftResizable="m l xl"
            leftResizableMinWidth={220}
            leftResizableMaxWidth={500}
            isLeftOpen="m l xl"
            fullPage
            showLeftToggleButton       
             >
            <Plus4U5.App.MenuConsumer>
              {({ setActiveItemId }) => {
                let handleRouteChanged = ({ useCase, parameters }) => setActiveItemId(useCase || "home");
                return <UU5.Common.Router 
                basePath={"/"}
                routes={ROUTES} notFoundRoute="notFound" controlled={false} onRouteChanged={handleRouteChanged} />;
              }}
            </Plus4U5.App.MenuConsumer>
          </Plus4U5.App.Page >
        </Plus4U5.App.MenuProvider>
      );
      //@@viewOff:render
    },
  });

export default Spa;
