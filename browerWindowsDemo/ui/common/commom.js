function setLanguage(key) {
	let language = require('./../../lib/locale.json');
	let lan = JSON.parse(process.env.VSCODE_NLS_CONFIG || `{locale: 'zh-cn'}`).locale.toLowerCase();
	if (language[key]) {
		return lan === 'zh-cn' ? language[key].chinese : language[key].english;
	}
	return '';
}

function show(ele) {
	if (arguments) {
		for (let i = 0; i < arguments.length; i++) {
			if (arguments[i]) {
				arguments[i].classList.remove('hide');
			}
		}
	}
}

function hide(ele) {
	if (arguments) {
		for (let i = 0; i < arguments.length; i++) {
			if (arguments[i]) {
				arguments[i].classList.add('hide');
			}
		}
	}

}

function resizeWin(width,height, win) {
	// 根据分辨率设置窗口，宽高由初始化话数据时传入
	const clientWidth = width;
	const clientHeight = height;
	const screenHeight = window.screen.height;
	const screenWidth = window.screen.width;
	const screenRatio = screenWidth / screenHeight;
	const clientRatio = clientWidth / clientHeight;
	if (screenRatio < clientRatio) { // 受屏幕宽度主导
		// 需要缩放的场景，屏幕宽度小于弹窗宽度所需界面，或者屏幕宽度大于弹框所需界面的两倍
		if (screenWidth >= clientWidth * 2 || screenWidth < clientWidth) {
			window.resizeTo(screenWidth * 0.8, screenWidth * 0.8 / clientRatio);
			document.body.style = `width:${clientWidth}px;height:${clientHeight}px;transform-origin:0 0;transform:scale(${(screenWidth * 0.8) / clientWidth});`;
		} else {
			window.resizeTo(clientWidth, clientHeight);
			document.body.style = `width:${clientWidth}px;height:${clientHeight}px;`;
		}
	} else { // 受屏幕高度主导
		// 需要缩放的场景，屏幕高度小于弹窗宽度所需界面，或者屏幕高度大于弹框所需界面的两倍
		if (screenHeight >= clientHeight * 2 || screenHeight < clientHeight) {
			window.resizeTo(screenHeight * 0.8 * clientRatio, screenHeight * 0.8);
			document.body.style = `width:${clientWidth}px;height:${clientHeight}px;transform-origin:0 0;transform:scale(${(screenHeight * 0.8) / clientHeight});`;
		} else {
			window.resizeTo(clientWidth, clientHeight);
			document.body.style = `width:${clientWidth}px;height:${clientHeight}px;`;
		}
	}
	// 进行比例缩放后为了确保屏幕居中显示，需要100ms执行居中命令，确保屏幕居中
	setTimeout(() => {
		win.center();
	}, 100)

}
exports.setLanguage = setLanguage;
exports.show = show;
exports.hide = hide;
exports.resizeWin = resizeWin;
