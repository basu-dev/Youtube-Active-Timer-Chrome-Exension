
chrome.runtime.onMessage.addListener((req, sender, res) => {
  console.log(req);
  if (req === "delete") {
    var truth = confirm("Do you want to reset timer?");
    if (truth) {
      reset();
    }
  }
  res(true);
});

function reset() {
  chrome.storage.sync.set({ timer: 0 }, () => {
    timer = 0;
  });
}
let timer = 0;

chrome.storage.sync.get(["timer"], res => (timer = res.timer));
if(timer=="NaN"){
    timer=0
}
startTimer();
console.log("You opened Youtube.com");

function startTimer() {
  setInterval(() => {
    minutes = 00;
    let seconds;
    let hour=00;
    seconds = parseInt(timer % 60);
    minutes = parseInt(timer / 60);
    if(minutes>60){
        hour=parseInt(minutes/60)
        minutes=parseInt(minutes%60)
    }
    document.getElementById("country-code").innerHTML = `${hour}:${minutes}:${seconds}`;

    if (!document.hidden) {
      timer++;

      chrome.storage.sync.set({ timer: timer }, () => {
        "set";
      });
    }
  }, 1000);
}

function confirmExit(e) {
  e.preventDefault();
  return false;
}
function saveTimer() {
  return new Promise(result => {
    let truth = confirm("Do you want to close?");
    if (truth) {
      chrome.storage.sync.set({ timer: timer }, () => {});
    }
  });
}
