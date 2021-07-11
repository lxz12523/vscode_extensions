// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as colors from 'colors';
import { URL, pathToFileURL } from 'url';
import * as path from 'path';
import { resourceUsage } from 'process';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "browerWindowDemo" is now active!');


	let config = vscode.commands.registerCommand('configPage',(args: any) => {
		vscode.window.showInformationMessage(args + "after windows");
	});
	let disposable = vscode.commands.registerCommand('browerWindowDemo.helloWorld', () => {
		//console.log("hello tttt");
		// The code you place here will be executed every time your command is executed
		// const extensionPath = context.extensionUri;
		// let url = vscode.Uri.joinPath(extensionPath,"createWindow","index.html");
		// console.log("mytest" + url.fsPath);
		vscode.commands.executeCommand("workbench.action.deveco.showOpenDialog", "hellok");
		//console.log("hello kkkk");
	});

	let browserWindow = vscode.commands.registerCommand('browerWindowDemo.browserWindow', () => {

		const extensionPath = vscode.Uri.file(__dirname);//extensionUri
		console.log("__dirname:" + __dirname);
		let url =path.join(__dirname, "..", "ui", "createWindow", "index.html");
		console.log("path of index:" + url);
		let url1 = pathToFileURL(url);
		vscode.commands.executeCommand("workbench.action.openBrowserWindow", [
			{
				winId: "pageConfig",
				height: 200,
				width: 300,
				darkBackgroundColor: "#3E475B",
				lightBackgroundColor: "#FFF",
				// c:\Users\z00356184\.vscode-oss\extensions\someone.browerWindowDemo-0.0.1\out\ui\createWindow\index.html
				loadURL: url1.href,
				data: {
					theme: vscode.workspace
						.getConfiguration()
						.get("workbench.colorTheme"),
					overseasFlag: false,
					height: 200,
					width:  300,
				},
				events: [
					{
						channel: "configPage",
						command: "configPage",
					},
				],
			},
		]).then(() => {
			
		});

	});
	
    const outputChannel = vscode.window.createOutputChannel("colors output");
    // 无效，只有在命令行窗口才能打印颜色，比如vscode TERMINAL;
    // output 窗口显示： [31m利用colors库打印带颜色字符串[39m
    outputChannel.appendLine(colors.red("利用colors库打印带颜色字符串"));
	context.subscriptions.push(disposable, browserWindow);
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
