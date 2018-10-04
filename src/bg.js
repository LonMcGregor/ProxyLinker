const SEARCH_NAME_HWP = "View on HW Proxy";
const SEARCH_URL_TEMPLATE_HWP = "https://%domain.ezproxy1.hw.ac.uk";
const UNIQUE_MENU_ID_HWP = "lonm-context-view-hw-proxy";

chrome.contextMenus.create({
    "type": "normal",
    "id": UNIQUE_MENU_ID_HWP,
    "title": SEARCH_NAME_HWP,
    "contexts": ["page", "frame"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if(info.menuItemId===UNIQUE_MENU_ID_HWP){
        const url = info.frameUrl ? new URL(info.frameUrl) : new URL(info.pageUrl);
        const proxyDomain = url.host.replace(/\./g, "-");
        const proxyPath = url.pathname;
        const proxyParams = url.search;
        const proxyUrl = SEARCH_URL_TEMPLATE_HWP.replace("%domain", proxyDomain) + proxyPath + proxyParams;
        chrome.tabs.create({"url": proxyUrl});
    }
});
