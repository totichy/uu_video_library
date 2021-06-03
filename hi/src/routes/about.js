//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import Lsi from "lsi";
import AboutCfg from "about-config";
import Css from "css";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: "About",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Css.css`
    .plus4u5-app-about > .uu5-bricks-header,
    .plus4u5-app-licence > .uu5-bricks-header,
    .plus4u5-app-authors > .uu5-bricks-header,
    .plus4u5-app-technologies > .uu5-bricks-header {
      border-bottom: 0;
    }
    .plus4u5-app-about {
      margin: 0 20px;
    }

    .plus4u5-app-authors > .uu5-bricks-header {
      margin: 20px 0 10px 0;
      text-align: center;
    }

    > *:last-child {
      padding-bottom: 56px;
    }
  `,
  logos: () => Css.css`
    text-align:center;
    margin-top: 56px;

    .uu5-bricks-image {
      height: 80px;
    }
  `,
  termsOfUse: () => Css.css`
    text-align:center;
    margin-top: 56px;
  `,
};

export const About = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const aboutLsi = AboutCfg.about || {};
    const licence = AboutCfg.licence || {};
    const usedTechnologies = AboutCfg.usedTechnologies || {};

    // NOTE Some of these cannot be passed as prop={<UU5.Bricks.Lsi />} therefore we're using useLsi() hook.
    let about = useLsi(aboutLsi);
    let organisation = useLsi(licence.organisation);
    let authorities = useLsi(licence.authorities);
    let technologies = useLsi(usedTechnologies.technologies);
    let content = useLsi(usedTechnologies.content);

    let header = useLsi(Lsi.about.header);
    let creatorsHeader = useLsi(Lsi.about.creatorsHeader);
    let termsOfUse = useLsi(Lsi.about.termsOfUse);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function getAuthors(authors) {
      return (
        authors &&
        authors.slice().map((author) => {
          author = UU5.Common.Tools.merge({}, author);
          author.role =
            author.role && typeof author.role === "object" ? <UU5.Bricks.Lsi lsi={author.role} /> : author.role;
          // author.src =
          //   author.src || Calls.getCommandUri("getAppAuthorPhoto", { uuIdentity: author.uuIdentity }).toString();
          return author;
        })
      );
    }
    const leadingAuthors = getAuthors(AboutCfg.leadingAuthors);
    const otherAuthors = getAuthors(AboutCfg.otherAuthors);
    const attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
    return (
      
      <UU5.Bricks.Section {...attrs}>
        <Plus4U5.App.ArtifactSetter territoryBaseUri="" artifactId="" />
        <Plus4U5.App.About header={header} content={about} />
        <Plus4U5.App.Licence organisation={organisation} authorities={authorities} />
        <Plus4U5.App.Authors header={creatorsHeader} leadingAuthors={leadingAuthors} otherAuthors={otherAuthors} />
        <Plus4U5.App.Technologies technologies={technologies} content={content} />
        {licence.termsOfUse && (
          <UU5.Bricks.P className={CLASS_NAMES.termsOfUse()}>
            <UU5.Bricks.Link href={licence.termsOfUse} target="_blank" content={termsOfUse} />
          </UU5.Bricks.P>
        )}
        <UU5.Bricks.Div className={CLASS_NAMES.logos()}>
          <UU5.Bricks.Image responsive={false} src="https://www.sekerka.cz/uu/assets/plus4u.svg" />
          <UU5.Bricks.Image responsive={false} src="https://www.sekerka.cz/uu/assets/unicorn.svg" />
        </UU5.Bricks.Div>
      </UU5.Bricks.Section>
    );
  },
  //@@viewOff:render
});

export default About;
