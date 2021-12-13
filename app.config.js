export default {
  expo: {
    name: "SmUsh Stage Bans",
    slug: "smUsh-stage-bans",
    version: "1.0.0",
    platforms: ["android"],
    version: "1.0.0",
    owner: "xhudaman",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.xhudaman.smush_stage_bans",
      versionCode: 1
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  }
};
