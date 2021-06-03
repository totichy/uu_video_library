//@@viewOn:imports
import React from "react";
import "uu5g04-bricks";
import { createVisualComponent, useRef, useState, useLsi } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import UU5 from "uu5g04";
import CategoryList from "category-list";
import CategoryProvider from "category-provider";
import CategoryCreate from "category-create";
import CategoryLsi from "config-category";
import Errors from "config-error";
import CategoryUpdateForm from "category-update-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: "Categories",
  //@@viewOff:statics
};

export const Categories = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOn:propTypes

  //@@viewOff:propTypes

  //@@viewOn:defaultProps

  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hook
    const createCategoryRef = useRef();
    const deleteCategoryRef = useRef();
    const updateCategoryRef = useRef();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryShow, setSelectedCategoryShow] = useState(false);

    const delcategoryText = CategoryLsi.delCategory || {};
    const wasDeleted = CategoryLsi.wasDeleted || {};
    const wasCreated = CategoryLsi.wasCreated || {};
    const wasUpdated = CategoryLsi.wasUpdated || {};
    const createError = CategoryLsi.errorCreate || {};
    const updateError = CategoryLsi.errorCategoryUpdate || {};
    const errorServerData = CategoryLsi.errorServer || {};

    let categoryWithTitle = useLsi(delcategoryText);
    let wasDeletedC = useLsi(wasDeleted);
    let wasUpdatedC = useLsi(wasUpdated);
    let wasCreatedC = useLsi(wasCreated);
    let errorCreated = useLsi(createError);
    let errorUpdated = useLsi(updateError);
    let serverErrorData = useLsi(errorServerData);

    const errorTtl = Errors.titleError || {};
    let headerError = useLsi(errorTtl);
    const errorDn = Errors.titleDone || {};
    let headerDone = useLsi(errorDn);
    //@@viewOff:hook

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

    async function handleCreateCategory(category) {
      try {
        await createCategoryRef.current(category);
        showSuccess(`${categoryWithTitle} ${category.categoryName} ${wasCreatedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.error_message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(errorCreated);
        } else {
          showError(errorCreated);
        }
      }
    }

    async function handleDeleteCategory(category) {
      try {
        await deleteCategoryRef.current({ categoryId: category.categoryId });
        showSuccess(`${categoryWithTitle} ${category.categoryName} ${wasDeletedC}`);
      } catch (e) {
        if (e.response) {
          // client received an error response (5xx, 4xx)
          showError(`${e.response.data.error_message}`);
        } else if (e.request) {
          // client never received a response, or request never left
          showError(`Deletion of ${category.categoryName} is failed.`);
        } else {
          showError(`Deletion of ${category.categoryName} is failed.`);
        }
      }
    }

    function handleCancel() {
      setSelectedCategory(null);
      setSelectedCategoryShow(false);
    }

    function handleUpdateCategory(category) {
      setSelectedCategory(category);
      setSelectedCategoryShow(true);
    }

    async function handleCategoryUpdate(category) {
      try {
        await updateCategoryRef.current(category);
        showSuccess(`${categoryWithTitle} ${category.categoryName} ${wasUpdatedC}`);
        setSelectedCategory(null);
        setSelectedCategoryShow(false);
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
    //@@viewOff:private

    //@@viewOn:interface
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderError(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return <UU5.Bricks.Error content={serverErrorData} error={errorData.error} errorData={errorData.data} />;
      }
    }

    function renderReady(categories) {
      return (
        <div>
          <CategoryUpdateForm
            setSelectedCategory={setSelectedCategory}
            onCancel={handleCancel}
            onUpdateCategory={handleCategoryUpdate}
            selectedCategoryShow={selectedCategoryShow}
            selectedCategory={selectedCategory}
            selectedCategoryShow={selectedCategoryShow}
          />
          <CategoryCreate onCreate={handleCreateCategory} />
          <UU5.Bricks.Section>
            <CategoryList categories={categories} onDelete={handleDeleteCategory} onUpdate={handleUpdateCategory} />
          </UU5.Bricks.Section>
        </div>
      );
    }
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <CategoryProvider>
          {({ state, data, newData, pendingData, errorData, handlerMap }) => {
            createCategoryRef.current = handlerMap.createCategory;
            deleteCategoryRef.current = handlerMap.deleteCategory;
            updateCategoryRef.current = handlerMap.updateCategory;

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
        </CategoryProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default Categories;
