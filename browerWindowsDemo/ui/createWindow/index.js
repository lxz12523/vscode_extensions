const path = require('path');
const { setLanguage, resizeWin } = require("./../common/commom");
const { ipcRenderer} = require("electron");
const { ok } = require('assert');
//const win = remote.getCurrentWindow();
let click_close,cancelBtn, okbtn, inputText;
//win.webContents.openDevTools();

window.onload = function () {
	click_close = getElemetById('close');
	cancelBtn = getElemetById('cancelBtn');
	okbtn = document.getElementById('okBtn');
	inputText = document.getElementById('inputPageName');
	inputText.focus();
	inputText.addEventListener('porpertychange', OnPropChanged);// IE
	inputText.addEventListener('input', OnPropChanged);// other browser
	setValue();
	ipcRenderer.on('stored-data', (event, arg) => {
		// 根据分辨率进行缩放
		//resizeWin(arg.width, arg.height, win);
		console.log(arg.width);
		console.log(arg.height);
		console.log(arg.extensionPath);
		console.log(arg);
		streamArgs = arg;
		setDarkTheme(streamArgs);
	});


	click_close.addEventListener('click', function () {
		closeWindow();
	});
	cancelBtn.addEventListener('click', function () {
		closeWindow();
	});
	okBtn.addEventListener('click', function () {
		console.log("click ok");
		ipcRenderer.send('configPage', inputText.value);
		closeWindow();
	});
};
function closeWindow()
{
	ipcRenderer.send('vscode:closeBrowserWindow');
}
function OnPropChanged(event)
{
		console.log("event:" + event.srcElement.value);
}

function getElemetById(id) {
	return document.getElementById(id);
}

// 国际化设置
function setValue() {
	//document.getElementById('title').innerHTML = setLanguage('newPage');
	//document.getElementById('inputPageName').placeholder = setLanguage('inputPageName');
	//document.getElementById('inputPageName').title = setLanguage('inputPageName');
	document.getElementById('cancelBtn').value = setLanguage('cancelBtn');
	document.getElementById('okBtn').value = setLanguage('okBtn');
}

function setDarkTheme(streamArgs) {
	if (streamArgs.theme && streamArgs.theme.indexOf('Dark') !== -1) {
		document.body.classList.add('dark');
	}
}