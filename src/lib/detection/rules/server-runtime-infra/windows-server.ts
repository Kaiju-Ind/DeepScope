import type { TechnologyDefinition } from '../../types';

export const windowsServerTechnologyDefinition = {
	id: "windows-server",
	name: "Windows Server",
	website: "https://microsoft.com/windowsserver",
	description: "Windows Server is a brand name for a group of server operating systems.",
	icon: "WindowsServer.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "windows-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Win32|Win64", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "windows-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("win32|win64", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:microsoft:windows:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
