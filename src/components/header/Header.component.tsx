import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Search from "../fields/search/Search.component";
import { Icon } from "@rmwc/icon";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon
} from "@rmwc/top-app-bar";

const recipeDetailsHeader = (id: string | undefined, history: any) => {
  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon
              icon="arrow_back"
              onClick={() => history.goBack()}
            />
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon icon="share" />
            <TopAppBarNavigationIcon icon="favorite" />
            <TopAppBarNavigationIcon icon="more_vert" />
          </TopAppBarSection>
        </TopAppBarRow>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle>Some text {id}</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust prominent />
    </>
  );
};

const cookbookHeader = (id: string | undefined, logoutUser: Function) => {
  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <Icon icon="images/icon-pot.svg" name="Cookbook" />
            <div className={"headerSearchFieldWrapper"}>
              <Search
                submit={(val: string) => {
                  console.log("Clicked sumbit with: " + val);
                }}
              />
              {/* <TextField
                className={"headerSearchField"}
                icon="search"
                outlined
                trailingIcon={{
                  icon: "close",
                  tabIndex: 1,
                  onClick: () => console.log("Clear")
                }}
              /> */}
            </div>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon
              icon="account_circle"
              onClick={() => logoutUser()}
            />
            <TopAppBarNavigationIcon icon="more_vert" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
};

const defaultHeader = (id: string | undefined, history: any) => {
  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <Icon icon="images/icon-pot.svg" name="Cookbook" />
            <TopAppBarTitle>Cookbook</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon
              className={"material-icons-outlined"}
              icon="account_circle"
              onClick={() => history.push("/login")}
            />
            <TopAppBarNavigationIcon icon="more_vert" />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
};

const loginHeader = (history: any) => {
  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarNavigationIcon
              icon="arrow_back"
              onClick={() => history.goBack()}
            />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust prominent />
    </>
  );
};

type HeaderProps = {
  type: string;
  logoutUser: Function;
};

const Header = ({ type, logoutUser }: HeaderProps) => {
  const history = useHistory();
  const { id } = useParams();

  switch (type) {
    case "login":
      return loginHeader(history);
    case "recipe-details":
      return recipeDetailsHeader(id, history);
    case "cookbook":
      return cookbookHeader(id, logoutUser);
    default:
      return defaultHeader(id, history);
  }
};

export default Header;
