import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TextField } from "@rmwc/textfield";

type SearchFieldProps = {
  submit: (searchString: string) => void;
};

const Search = ({ submit }: SearchFieldProps) => {
  const [searchText, setSearchText] = useState("");
  const [closeIcon, setCloseIcon] = useState("");

  useEffect(() => {
    setCloseIcon(searchText.length > 0 ? "close" : "");
  }, [searchText]);

  return (
    <>
      <TextField
        className={"headerSearchField"}
        icon="search"
        value={searchText}
        type="text"
        onChange={(ev: any) => {
          setSearchText(ev.target.value);
        }}
        onKeyUp={(ev: any) => {
          if (ev.key === "Enter") {
            submit(searchText);
          }
        }}
        outlined
        trailingIcon={{
          icon: closeIcon,
          onClick: () => {
            setSearchText("");
          }
        }}
      />
    </>
  );
};

export default Search;
