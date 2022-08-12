chrome.contextMenus.create({
  id: "Get-Meaning",
  title: "Get Meaning",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "Get-Meaning") {
    let meaning = "";
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          var word = window.getSelection().toString();
          fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((response) => response.json())
            .then((data) => {
              var check = Array.isArray(data);
              meaning = check
                ? data[0].meanings[0].definitions[0].definition
                : data.message;
              chrome.runtime.sendMessage(meaning);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
      () => {}
    );
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  var opt = {
    iconUrl: "mg128.png",
    type: "basic",
    title: "Meaning",
    message,
  };
  chrome.notifications.create(opt);
});
