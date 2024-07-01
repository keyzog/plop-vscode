// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fs from "fs";
import { dirname } from "path";

const terminalName = "Plopit Terminal";

const getTerminal = () => {
	const terminals = vscode.window.terminals;
	const terminal = terminals.find((v) => v.name === terminalName);
	return terminal || vscode.window.createTerminal(terminalName);
};

const runPlopInTerminal = (uri: vscode.Uri) => {
	if (!uri) {
		vscode.window.showErrorMessage(
			"Please use the context menu on the folder or file to call this command!"
		);
		return;
	}

	const terminal = getTerminal();

	const getConfig = vscode.workspace.getConfiguration().get;
	const plopCommand = getConfig<string>("plop-path.plopCommand") || "plopit";
	const pathArgName = getConfig<string>("plop-path.pathArgName") || "path";

	let path = uri.fsPath;

	if (path) {
		let fsStat = fs.statSync(path);
		if (!fsStat.isDirectory()) {
			path = dirname(path);
		}
	} else {
		vscode.window.showInformationMessage(
			`Couldn't find a target location "destPath", the value of destPath: "${path}"`
		);
		return;
	}

	const command = `${plopCommand} --${pathArgName} ${path}`;
	terminal.sendText(command);
	terminal.show();
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"plop-path.openTerminalWithPath",
		(uri: vscode.Uri) => {
			try {
				runPlopInTerminal(uri);
			} catch (e: any) {
				vscode.window.showErrorMessage(e);
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
