export class InfoForTab {
    constructor(_url, _priorUrl) {
        this.completeUrl = (typeof _url !== 'string') ? "" : _url;
        this.priorCompleteUrl = (typeof _priorUrl !== 'string') ? "" : _priorUrl;
    }
}

export var tabsInfo = {};

export function createTabRecordIfNeeded(tabId) {
    if(!tabsInfo.hasOwnProperty(tabId) || typeof tabsInfo[tabId] !== 'object') {
        // This is the first time we have encountered this tab.
        // Create an object to hold the collected info for the tab.
        tabsInfo[tabId] = new InfoForTab();
    }
}
