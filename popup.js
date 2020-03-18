chrome.tabs.query({ currentWindow: true, active: true }, function(
    tabs
  ) {
    chrome.tabs.sendMessage(tabs[0].id, "response",cb);
  })
  
function cb(res){
    if(res){
        var div=document.getElementById("reset")
        div.innerHTML="Reset Timer";
        div.style.padding="0.4em 1em"
        div.addEventListener("click",reset,false)
        document.getElementById("reset")
    }
}
function reset(){
    chrome.tabs.query({ currentWindow: true, active: true }, function(
        tabs
      ) {
        chrome.tabs.sendMessage(tabs[0].id, "delete",cb);
      })
}