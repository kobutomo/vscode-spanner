// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.spanner', () => {
		vscode.window.showInformationMessage('input command and press enter');
		const editor = vscode.window.activeTextEditor;
		const getInput = async () => {
			const input = await vscode.window.showInputBox();
			let newString = "";
			if (editor && editor.selection.start && editor.selection.end && input) {
				const selectRange = new vscode.Range(editor.selection.start, editor.selection.end);
				let select = editor.document.getText(selectRange);
				switch (input) {
					case "span": {
						for (let i = 0; i < select.length; i++) {
							newString += '<span>' + select[i] + '</span>';
						}
						break;
					}
					case "ul": {
						select = select.replace(/\r/g, "");
						const arr = select.split("\n");
						newString = `<ul class="list">`;
						arr.forEach((str) => {
							newString += `\n<li class="item">${str}</li>`;
						});
						newString += "\n</ul>";
						break;
					}
					case "ol": {
						select = select.replace(/\r/g, "");
						const arr = select.split("\n");
						newString = `<ol class="list">`;
						arr.forEach((str) => {
							str.replace("\n","");
							newString += `\n<li class="item">${str}</li>`;
						});
						newString += "\n</ol>";
						break;
					}
					default: {
						vscode.window.showInformationMessage('aaa');
						break;
					}
				}
				editor.edit((builder) => {
					builder.replace(selectRange, newString);
				});
			} else {
				return false;
			}
		};
		getInput();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
