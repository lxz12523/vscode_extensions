// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var num = 0;
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "charui" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('charui.create', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('create CharUI project');
	});

	let disposable1 = vscode.commands.registerCommand('charui.build', async () => {
		// The code you place here will be executed every time your command is executed
		
		// vscode.window.visibleTextEditors[0]?.edit(editBuilder => {
		// 	const end = new vscode.Position(0,9);
		// 	const begin = new vscode.Position(0, 0);
		// 	editBuilder.replace(new vscode.Range(begin, end), "100");
		// 	vscode.window.showErrorMessage("kkkkkkkkkkkkkkk");
		// });
		// Dis5play a message box to the user
		const sleep1 = (milliseconds:number) => {
			return new Promise(resolve => setTimeout(resolve, milliseconds));
		};
		await sleep1(13000);
		vscode.window.showInformationMessage(`build ${num++}`);

		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
