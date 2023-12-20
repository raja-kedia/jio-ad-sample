console.log("index.js", JioAds);

const setAdsOptions = () => {
  JioAds.onAdFailedToLoad = function (placementId, options) {
    console.log("CB: onAdFailedToLoad", JSON.stringify(options));
    var placementNode = document.getElementById(placementId);
    if (placementNode) {
      placementNode.remove();
    }
  };

  JioAds.onAdRender = function (placementId) {
    console.log("CB: onAdRender", placementId);
  };
  JioAds.onAdPrepared = function (placementId) {
    console.info("CB: onAdPrepared Ad is ready to be displayed!", placementId);
  };

  JioAds.setConfiguration({
    endpoint: "jioads",
    reqType: "dev",
    clkSelf: false,
    adRequestTimeout: 3000,
    adRenderingTimeout: 4000,
  });
};

const createAd = () => {
  const elem = document.getElementById("box-ad");
  const ads = document.createElement("ins");
  ads.id = "159926";
  ads.dataset.adspotKey = "7sbaj6z4";
  ads.dataset.source = "www.fancode.com";
  elem.appendChild(ads);
};

createAd();
setAdsOptions();
