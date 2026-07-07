import type { TechnologyDefinition } from '../../types';

export const progressWsFtpTechnologyDefinition = {
	id: "progress-ws-ftp",
	name: "Progress WS_FTP",
	website: "https://www.progress.com/ws_ftp",
	description: "Progress WS_FTP is a file transfer client software developed by Progress Software Corporation, supporting FTP, FTPS, SFTP, and HTTPS protocols with features like drag-and-drop support, file synchronization, and encrypted data transmission.",
	icon: "Progress.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "progress-ws-ftp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ThinClient\\/(?:WTM|WebResource)(?:\\.axd|\\/public)"),
			confidence: 60,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "progress-ws-ftp:dom:1",
			kind: "dom",
			selector: "form[name='formLogin'][action='login.aspx' i][id='formLogin']\\;confidence:40",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "progress-ws-ftp:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/thinclient\\/(?:wtm|webresource)(?:\\.axd|\\/public)"),
			confidence: 60,
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:progress:ws_ftp_server:*:*:*:*:*:*:*:*",
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
