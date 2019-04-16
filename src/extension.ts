// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "spanner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.spanner', () => {
		vscode.window.showInformationMessage('Hello');
		const editor = vscode.window.activeTextEditor;
		const getInput = async () => {
			const input = await vscode.window.showInputBox();
			console.log(input);
			if (editor && editor.selection.start && editor.selection.end) {
				const selectRange = new vscode.Range(editor.selection.start, editor.selection.end);
				const select = editor.document.getText(selectRange);
				let newString = "";
				console.log(select);
				for (let i = 0; i < select.length; i++) {
					newString += '<span>' + select[i] + '</span>';
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
