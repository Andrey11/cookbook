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
    return <div>Empty Screen</div>;
  };

  const loadScreen = () => {
    console.log("[Scene.component] " + sceneName);

    if (!isFirebaseInitialized) {
      return createInitScreen();
    }
    return <div>{children}</div>;
  };

  return <>{loadScreen()}</>;
};

export default Scene;
