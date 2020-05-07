import React, { useEffect } from "react";
import styles from "./Scene.module.scss";
import { CircularProgress } from "@rmwc/circular-progress";

type SceneProps = {
  children: any;
  sceneName: string;
  isFirebaseInitialized: boolean;
  verityAuthState: Function;
};

const Scene = ({
  children,
  isFirebaseInitialized,
  verityAuthState,
  sceneName
}: SceneProps) => {
  useEffect(() => {
    if (!isFirebaseInitialized) {
      verityAuthState();
    }
  }, [isFirebaseInitialized]);

  const createSplashScreen = () => {
    return (
      <div className={styles.SplashScreen}>
        <img
          className={styles.Logo}
          src="images/icon-pot.svg"
          alt="Cookbook logo"
        />
        <div className={styles.InfiniteSpinner}>
          <CircularProgress size="xlarge" />
        </div>
      </div>
    );
  };

  const loadScreen = () => {
    console.log("[Scene.component] " + sceneName);

    if (!isFirebaseInitialized) {
      return createSplashScreen();
    }
    // return createSplashScreen();
    return <>{children}</>;
  };

  return <>{loadScreen()}</>;
};

export default Scene;
