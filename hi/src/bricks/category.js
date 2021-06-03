//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Css from "css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: "Category",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Css.css`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`,
  delet: () => Css.css`
  float: right;
  border-radius: 4px;
`,
  header: () => Css.css`
  font-size: 16px;
  color: #005da7;
  font-family: ClearSans-Medium, ClearSans, sans-serif;
  align-items: left;
  padding: 16px 16px 0;
  cursor: pointer;
  line-height: 25px;
  `,
};

export const Category = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    category: UU5.PropTypes.shape({
      categoryId: UU5.PropTypes.string.isRequired,
      categoryName: UU5.PropTypes.string.isRequired,
    }),
    onDelete: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    category: null,
    onDelete: () => {},
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps

  render({ category, onDelete, onUpdate }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(category);
    }

    function handleUpdate() {
      onUpdate(category);
    }

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function renderDelete() {
      return (
        <UU5.Bricks.Button
          className={CLASS_NAMES.delet()}
          onClick={handleDelete}
          bgStyle="transparent"
          colorSchema="red"
        >
          <UU5.Bricks.Icon icon="mdi-delete" />
        </UU5.Bricks.Button>
      );
    }

    function renderUpdate() {
      return (
        <UU5.Bricks.Button
          className={CLASS_NAMES.delet()}
          onClick={handleUpdate}
          bgStyle="transparent"
          colorSchema="green"
        >
          <UU5.Bricks.Icon icon="mdi-pencil" />
        </UU5.Bricks.Button>
      );
    }

    function renderHeader() {
      return (
        <UU5.Bricks.Div level={6} className={CLASS_NAMES.header()}>
          <UU5.Bricks.Link href={"home/?category=" + category.categoryId} target="_self">
            <UU5.Bricks.Icon icon="mdi-tag" /> {category.categoryName}
          </UU5.Bricks.Link>
          {renderDelete()}
          {renderUpdate()}
        </UU5.Bricks.Div>
      );
    }

    if (!category) {
      return null;
    }

    return (
      <UU5.Bricks.Column colWidth="xs-12 m-6 l-4">
        <UU5.Bricks.Card className={CLASS_NAMES.main()} colorSchema="blue" header={renderHeader()}></UU5.Bricks.Card>
      </UU5.Bricks.Column>
    );
    //@@viewOff:render
  },
});

export default Category;
