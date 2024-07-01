# Plop Path

Install the extension on the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=keyzog.plop-path).

Run Plop commands from the context menu with path or folder selection. This extension allows you to easily generate files and folders using Plop templates directly from the VS Code explorer context menu.

## Features

![](https://i.imgur.com/31AVeN6.gif)

-  Quickly run Plop commands from the context menu.
   ![](https://i.imgur.com/HDZwo5H.jpeg)

-  Customize the Plop command and path argument name via settings.
-  Works with any Plop setup, including plopit and npx plop.

## Installation

-  Open the Extensions view in VS Code (Ctrl+Shift+X).
-  Search for Plop Path.
-  Click Install.

#### Setting up Plop

We recommend using [plopit](https://www.npmjs.com/package/plopit), which this extension is specifically designed to complement. However, it can also work with the standard Plop setup.

**💧Installing Plopit**
To install plopit globally, use the following command:

```bash
npm install -g plopit
```

---

**💧Alternatively you can use standard plop package**

1. To install Plop.js, use the following command:

```bash
# global install:
npm install plop -g

# or instal for current project:
npm install plop --save-dev
```

2. Create a new file called plopfile.js at the root of your project (in the same folder as package.json):

```js
// plopfile.js
module.exports = function (plop) {
	plop.setGenerator("myTemplate", {
		prompts: [
			{
				// Always include a "path" prompt when using this extension,
				// as it will automatically be answered for the user.
				type: "input",
				name: "path",
				message: "Template destination path",
			},
			{
				type: "input",
				name: "name",
				message: "File name",
			},
		],
		actions: [
			{
				type: "add",
				path: "{{path}}/{{name}}.js",
				templateFile: "plop-templates/component.tsx.hbs",
			},
		],
	});
};
```

## Usage

-  Right-click on any file or folder in the VS Code explorer.
-  Select "Run Plop Here..." from the context menu.
-  The configured Plop command will run in a new terminal with the selected path.

## Settings

The extension provides the following settings for customization:

-  **plop-path.plopCommand:** The command to run Plop. This can be customized to any Plop command you want to use. By default: `plopit` if you use plopit installed globally or `npx plop --` for default plop.

   -  **Default:** plopit
   -  **Description:** The command to run Plop. This can be customized to any Plop command you want to use. For example, if the command is `plopit`, and the path argument name is `path`, the generated command will be `plopit --path <directory_path>`. Command template: `${plopCommand} --${pathArgName} <directory_path>`.

-  **plop-path.pathArgName:** The argument name for the path. This is used to pass the directory path to the Plop command.

   -  **Default:** path
   -  **Description:** The argument name for the path. This is used to pass the directory path to the Plop command.

## Contributing

Contributions are welcome! If you encounter any issues or have feature requests, please [open an issue](https://github.com/keyzog/plop-vscode/issues) on GitHub.
