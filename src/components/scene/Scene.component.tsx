import React, { useEffect } from "react";
import { Typography } from "@rmwc/typography";
import styles from "./Scene.module.scss";
import { CircularProgress } from "@rmwc/circular-progress";

type SceneProps = {
  children: any;
  sceneName: string;
  isFirebaseInitialized: boolean;
  verityAuthState: () => void;
};

const Scene = ({
  children,
  isFirebaseInitialized,
  verityAuthState,
  sceneName,
}: SceneProps) => {
  useEffect(() => {
    if (!isFirebaseInitialized) {
      verityAuthState();
    }
  }, [isFirebaseInitialized]);

  const createInitScreen = () => {
    return (
      <div className={styles.SplashScreen}>
        <img src="images/icon-pot.svg" alt="Cookbook logo"></img>
        <div className={styles.InfiniteSpinner}>
          <CircularProgress size="xlarge" />
        </div>
      </div>
    );
  };

  const loadScreen = () => {
    console.log("[Scene.component] " + sceneName);

    if (!isFirebaseInitialized) {
      return createInitScreen();
    }
    // return createInitScreen();
    return <>{children}</>;
  };

  return <>{loadScreen()}</>;
};

export default Scene;
