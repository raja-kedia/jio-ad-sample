console.log("index.js", JioAds);

const setAdsOptions = () => {
  JioAds.onAdFailedToLoad = function (placementId, options) {
    console.log("CB: onAdFailedToLoad", JSON.stringify(options));
    var placementNode = document.getElementById(placementId);
    if (placementNode) {
      placementNode.remove();
    }
  };

  JioAds.onAdRefresh = function (placementId) {
    console.log("CB: onAdRefresh", placementId);
  };

  JioAds.onAdRender = function (placementId) {
    console.log("CB: onAdRender", placementId);
    const ad = document.getElementById(placementId);
    const adSize = ad.getBoundingClientRect();
    console.log("adSize: ", adSize);

    const adContainer = document.getElementById("box-ad");
    const adContainerSize = adContainer.getBoundingClientRect();

    console.log("adContainerSize: ", adContainerSize);

    const adFitRatio = adSize.width / adSize.height;
    const adContainerFitRatio = adContainerSize.width / adContainerSize.height;

    if (adFitRatio > adContainerFitRatio) {
      const scaling = adContainerSize.width / adSize.width;
      ad.style.transform = `scale(${scaling}) translate(${
        (-adSize.width / 2 + adContainerSize.width / 2) / scaling
      }px , ${(-adSize.height / 2 + adContainerSize.height / 2) / scaling}px)`;
    } else {
      const scaling = adContainerSize.height / adSize.height;
      ad.style.transform = `scale(${scaling})`;
    }
  };
  JioAds.onAdPrepared = function (placementId) {
    console.info("CB: onAdPrepared Ad is ready to be displayed!", placementId);
    console.log("CB: onAdPrepared", placementId);
  };

  JioAds.setConfiguration({
    endpoint: "jioads",
    clkSelf: false,
    adRequestTimeout: 3000,
    adRenderingTimeout: 4000,
  });
};

const createAd = (size) => {
  const elem = document.getElementById("box-ad");
  const ads = document.createElement("ins");
  ads.id = "ui_159926";
  ads.dataset.adspotKey = "7sbaj6z4";
  ads.dataset.source = "www.fancode.com";
  ads.dataset.adSizes = size;
  ads.dataset.refreshRate = "5";
  // ads.dataset.containerId = "banner";
  elem.appendChild(ads);
};

const validateAdSize = (size) => {
  const sizes = size.split("x");
  if (sizes.length !== 2) {
    return false;
  }
  const [width, height] = sizes;
  if (width < 0 || height < 0) {
    return false;
  }
  return true;
};

const onClick = () => {
  const adInput = document.getElementById("ad-input");
  if (adInput.value && !validateAdSize(adInput.value)) {
    alert("Invalid Ad Size");
    return;
  }
  const value = adInput.value || "320x100";
  document.getElementById("box-ad").innerHTML = "";
  createAd(value);
  console.log("onClick: ", value);
};

const main = () => {
  const adBtn = document.getElementById("ad-btn");
  adBtn.onclick = onClick;
};

setAdsOptions();
main();
