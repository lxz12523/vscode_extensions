// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as tss from "./test";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @returns aaaaaaaaa
 * @param context 
 */

/**
 * A document selector is the combination of one or many document filters.
 *
 * @sample `let sel:DocumentSelector = [{ language: 'typescript' }, { language: 'json', pattern: '**∕tsconfig.json' }]`;
 */

let timeOut: undefined | NodeJS.Timeout = undefined;
export function activate(context: vscode.ExtensionContext) {

	

	// This line of code will only be executed once when your extension is activated
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('Congratulations, your extension "hello" is now active!');

	let documentSelector: vscode.DocumentSelector =  [
		{ scheme: 'file', language: 'cpp' },
		{ scheme: 'file', language: 'chr', pattern:"**/*.char"},
		{pattern:"**/*.{cr,ce}"}
	];

	vscode.workspace.onDidOpenTextDocument((textDocument)=>{
		if (vscode.languages.match(documentSelector, textDocument)) {
			vscode.window.showInformationMessage(textDocument.uri.fsPath);
		}

	});
	vscode.workspace.onDidChangeTextDocument((changeEvent)=>{ //可以获取用户输入字符，判断最后一个字符是否是空格

		console.log(`change begin`);
		if (timeOut !== undefined) {
			clearTimeout(timeOut);
			//console.log(`clearTime:`);
		}
		timeOut = setTimeout(function() {
			 console.log(`test change x`);
		},0);
	
	});
	vscode.window.onDidChangeTextEditorSelection((selectionChange)=>{
			if (selectionChange.kind === vscode.TextEditorSelectionChangeKind.Mouse) {
				//vscode.window.showWarningMessage("鼠标出发选中事件");
				// 用户选择停止后0.5秒触发选中事件
				// if (timeOut !== undefined) {
				// 	clearTimeout(timeOut);
				// 	//console.log(`clearTime:`);
				// }
				// timeOut = setTimeout(function() {
				// 	let start : vscode.Position= selectionChange.selections[0].start;
				// 	let end : vscode.Position = selectionChange.selections[0].end;
				// 	let range : vscode.Range = new vscode.Range(start,end);
				// 	let selectText : string = selectionChange.textEditor.document.getText(range);
				// 	// console.log(`select:  ${selectText}`);
				// },300);
				// console.log("selecting");

			}
	});
	// 获取所有命令
vscode.commands.getCommands().then(allCommands => {
	console.log('所有命令：', allCommands); // 都是字符串
});

let options: Object = {
	content: String,
	language: "chr"
  };
  

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.call', (args:any[]) => {
		// The code you place here will be executed every time your command is executed
		let result = test3(args);
		
		result.then((v)=>{
			console.log(v+"###");
		});
		
		setTimeout(() => {
			// reveice
			console.log("reveice message");
			response_resolve("return result");
		  }, 1500);
		  return result;
	});
	vscode.commands.registerCommand('vscode.window.test', ()=>{
		
		return;
			vscode.window.showInputBox(
				{ // 这个对象中所有参数都是可选参数
					password:false, // 输入内容是否是密码
					ignoreFocusOut:true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
					placeHolder:'你到底想输入什么？', // 在输入框内的提示信息
					prompt:'赶紧输入，不输入就赶紧滚', // 在输入框下方的提示信息
					validateInput:function(text){return null;} // 对输入内容进行验证并返回
				}).then(function(msg){
				console.log("用户输入："+msg);
			});


			vscode.window.showOpenDialog(
				{ // 可选对象
					canSelectFiles:true, // 是否可选文件
					canSelectFolders:false, // 是否可选文件夹
					canSelectMany:true, // 是否可以选择多个
					defaultUri:vscode.Uri.file("/D:/"), // 默认打开本地路径
					openLabel:'按钮文字说明'
				}).then(function(msg){
					console.log(msg);
				});
		// vscode.window.showInputBox
		// vscode.window.showOpenDialog
		// vscode.window.showQuickPick
		// vscode.window.showSaveDialog
		// vscode.window.createQuickPick
		// 下拉列表
		vscode.window.showQuickPick(
            [
                "阳光",
                "帅气",
                "呆萌",
                "逗比"
            ],
            {
                canPickMany:true,
                ignoreFocusOut:true,
                matchOnDescription:true,
                matchOnDetail:true,
                placeHolder:'温馨提示，请选择你是哪种类型？'
            })
            .then(function(msg){
            console.log(msg);
        });

	});
	context.subscriptions.push(disposable);
	let test = new tss.Test(10);
	context.subscriptions.push(test);
	let call2 = vscode.commands.registerCommand('t1234', async() => {
		let result =await vscode.commands.executeCommand('extension.call',['a','b','c',66]).then(async (v)=>{
			console.log(v);
			return v;
		});
		console.log(result);
		return result;
	});
	context.subscriptions.push(call2);
	
};

function test1()
{
	let num  = 0;
	// Display a message box to the user
	let items = provideCompletionItems(3);
	console.log(items);

	setTimeout(() => {
		console.log("Async is done!!!");
		responsePromises[String(3)].resolve(3);
	  }, 1500);
}
let response_resolve:any;
function test2()
{

	function greet(){
		var promise = new Promise(function(resolve,reject){
			var greet = "hello  world";
			response_resolve = resolve;
			//resolve(greet);
		});
		return promise;
		}
		var p = greet().then(v=>{
		console.log(v+"!!!!!");
		}).then(v=>{
			console.log(v);
		});
		setTimeout(() => {
			console.log("reviece message!!!");
			response_resolve("bbbb");
		  }, 1500);
		console.log(p + "!");
}
async function test_await(args:any) {
	let result = await test3(args);
	return result;
}
function  test3(args:any[])
{
	function greet(){
		var promise = new Promise<string>(function(resolve,reject){
			//var greet = "hello  world";
			sendM(args);
			response_resolve = resolve;
		});
		return promise;
	}
	let result = greet().then(asCompletionResult);
	// result.then(v=>{
	// 	console.log(`${v} update date`);
	// });
	// //then 方法可以被同一个 promise 调用多次
	// result.then(v=>{
	// 	console.log(`${v} update date2`);
	// });

	console.log(result+"??");
	return result;
	// greet().then(v=>{
	// 	console.log(v+"1");
	// 	return v;
	// })
	// .then(v=>{
	// 	console.log(v+"2");
	// 	return v;
	// })
	// .then(v=>{
	// 	console.log(v+"3");
	// });
	
}
// sendRequest<R, E, RO>(type: RequestType0<R, E, RO>, token?: CancellationToken): Thenable<R>;
// sendRequest<P, R, E, RO>(type: RequestType<P, R, E, RO>, params: P, token?: CancellationToken): Thenable<R>;
// sendRequest<R>(method: string, token?: CancellationToken): Thenable<R>;
// sendRequest<R>(method: string, param: any, token?: CancellationToken): Thenable<R>;
let client = {
	//sendRequest: (type, ...params) => connection.sendRequest(Is.string(type) ? type : type.method, ...params),
};

function asCompletionResult(result:string) {
	if (!result) {
		return undefined;
	}
	return result+"$$$$$";
}
let responsePromises = Object.create(null);
function test_result(num:number) {
	console.log(`resolve: ${num}!!!!!!!!`);
	return num + 100;
}

let provideCompletionItems = (arg:number) => {
	return asyncAction(arg).then(test_result, (error) => {
		console.log(`error1`);
		return Promise.resolve([]);
	});
};
function asyncAction(num:number) {
	var promise = new Promise<number>((resolve, reject) => {
		// if (num === 4) {
		// 	reject(`error ${num}`);
		// 	return void 0;
		// }
		console.log("Async is done");
		let result = "dd";//sendM(args);
		console.log(result);
		result = result + 3;
		let responsePromise = {resolve,reject};
		responsePromises[String(num)] = responsePromise;
	});
	return promise;
  }

function sendM(args:any[])
{
	for (let i in args) {
		console.log("send message"+args[i]);
	}
	return 1000;
}


// this method is called when your extension is deactivated
export function deactivate() {}
