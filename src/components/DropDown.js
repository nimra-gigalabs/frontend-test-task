import React from "react";
import Downshift from "downshift";
import classNames from "classnames";

import './dropDown.css'

const ChevronDown = ({ up }) => (
  <div
    className={classNames("ChevronDown__container", {
      "ChevronDown__container--up": up
    })}
  >
    <div className="ChevronDown" />
  </div>
);

const Dropdown = ({ items, ...rest }) => {
  return (
    <Downshift {...rest}>
      {({
        getLabelProps,
        getInputProps,
        getButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
        itemToString
      }) => (
        <div className="dropdown_style"
          style={{
            width: 100,
            margin: "auto",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div className="Dropdown__inputWrapper" onClick={toggleMenu}>
            <div
              className={classNames("Dropdown__inputField", {
                "Dropdown__inputField--placeholder": !selectedItem
              })}
              style={{ display: "block", flex: 1, textAlign: "left" }}
            >
              {inputValue ? inputValue : "Select an item"}
            </div>
            <button
              id="my-select"
              type="button"
              className="Dropdown__toggleMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <ChevronDown up={isOpen} />
            </button>
          </div>
          {isOpen ? (
            <div className="Dropdown__menu">
              {items.map(item => (
                <button
                  {...getItemProps({ item })}
                  key={item.id}
                  className="Dropdown__menuItem"
                  style={{ cursor: "pointer" }}
                >
                  {itemToString(item)}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}
export default Dropdown;