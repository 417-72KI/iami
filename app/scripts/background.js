// Based: https://stackoverflow.com/questions/39333408

// Remember tab URLs
var tabsInfo = {};

function createTabRecordIfNeeded(tabId) {
    if(!tabsInfo.hasOwnProperty(tabId) || typeof tabsInfo[tabId] !== 'object') {
        // This is the first time we have encountered this tab.
        // Create an object to hold the collected info for the tab.
        tabsInfo[tabId] = new InfoForTab();
    }
}

function blockUrlIfMatch(details) {
    console.log(details);
    createTabRecordIfNeeded(details.tabId);
    
    if (!matchesUrlToBlock(details.url)) { return; }
    
    console.log('Blocking URL:', details.url);
    console.log('Returning to URL:', tabsInfo[details.tabId].completeUrl);
    if(details.frameId !== 0) {
        // This navigation is in a subframe. We currently handle that by
        //   navigating to the page prior to the current one.
        //   Probably should handle this by changing the src of the frame.
        //   This would require injecting a content script to change the src.
        //   Would also need to handle frames within frames. 
        // Must navigate to priorCmpleteUrl as we can not load the current one.
        tabsInfo[details.tabId].completeUrl = tabsInfo[details.tabId].priorCompleteUrl;
    }
    var urlToUse = tabsInfo[details.tabId].completeUrl;
    urlToUse = (typeof urlToUse === 'string') ? urlToUse : '';
    chrome.tabs.update(details.tabId, {url: urlToUse}, function(tab) {
        if(chrome.runtime.lastError) {
            if(chrome.runtime.lastError.message.indexOf('No tab with id:') > -1) {
                // Chrome is probably loading a page in a tab which it is expecting to swap out with a current tab.
                // Need to decide how to handle this case.
                // For now just output the error message.
                console.log('Error:', chrome.runtime.lastError.message)
            } else {
                console.log('Error:', chrome.runtime.lastError.message)
            }
        }
    });
    // Notify the user URL was blocked.
    notifyOfBlockedUrl(details.url);
}

function matchesUrlToBlock(_url) {
    const url = new URL(_url);
    console.log(url);
    if(url.protocol === 'chrome') { return false; }
    // Detect `ɢoogle` (fake domain of google)
    // ref: https://gigazine.net/news/20161122-google-is-not-google/
    if(url.hostname.includes('xn--oogle-wmc')) { return true; }
    return url.hostname.includes('і');
}

function completedLoadingUrlInTab(details) {
    // console.log('details:', details);
    // We have completed loading a URL.
    createTabRecordIfNeeded(details.tabId);
    if(details.frameId !== 0) {
        // Only record inforamtion for the main frame
        return;
    }
    // Remember the newUrl so we can check against it the next time an event is fired.
    tabsInfo[details.tabId].priorCompleteUrl = tabsInfo[details.tabId].completeUrl;
    tabsInfo[details.tabId].completeUrl = details.url;
}

class InfoForTab {
    constructor(_url, _priorUrl) {
        this.completeUrl = (typeof _url !== 'string') ? "" : _url;
        this.priorCompleteUrl = (typeof _priorUrl !== 'string') ? "" : _priorUrl;
    }
}

function notifyOfBlockedUrl(url) {
    chrome.notifications.create(
        {
            type: 'basic',
            iconUrl: 'icon-128.png',
            title:'Blocked URL',
            message: url
        },
        (id) => { console.log(`Sent: ${id}`); }
    );
}

chrome.webNavigation.onCompleted.addListener(completedLoadingUrlInTab);
chrome.webNavigation.onBeforeNavigate.addListener(blockUrlIfMatch);

// Detect all loaded tabs
chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
        createTabRecordIfNeeded(tab.id);
        tabsInfo[tab.id].completeUrl = tab.url;
        blockUrlIfMatch({
            tabId : tab.id,
            frameId : 1,
            url : tab.url
        });        
    });
});
