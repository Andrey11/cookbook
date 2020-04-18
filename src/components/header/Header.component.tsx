import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon
} from "@rmwc/top-app-bar";
import { Avatar } from "@rmwc/avatar";

import "@material/top-app-bar/dist/mdc.top-app-bar.css";

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
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon icon="share" />
            <TopAppBarNavigationIcon icon="favorite" />
            <TopAppBarNavigationIcon icon="more_vert" />
            <TopAppBarNavigationIcon
              icon="directions_run"
              onClick={() => logoutUser()}
            />
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

const defaultHeader = (id: string | undefined, history: any) => {
  return (
    <>
      <TopAppBar fixed>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon
              unselectable="on"
              disabled
              ripple={{ accent: false, surface: false, unbounded: false }}
              icon={{
                icon: "images/icon-pot.svg",
                strategy: "url"
              }}
            />
            <TopAppBarTitle>Default Scene</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <TopAppBarNavigationIcon icon="share" />
            <TopAppBarNavigationIcon icon="favorite" />
            <TopAppBarNavigationIcon icon="account_circle" />
            <TopAppBarNavigationIcon
              icon="directions_run"
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
