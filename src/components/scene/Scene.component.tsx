import React, { useEffect } from "react";

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

  const createInitScreen = () => {
    return <>Empty Screen</>;
  };

  const loadScreen = () => {
    console.log("[Scene.component] " + sceneName);

    if (!isFirebaseInitialized) {
      return createInitScreen();
    }
    return <>{children}</>;
  };

  return <>{loadScreen()}</>;
};

export default Scene;
