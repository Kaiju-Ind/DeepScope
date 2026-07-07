import type { TechnologyDefinition } from '../../types';

export const microsoftHttpapiTechnologyDefinition = {
	id: "microsoft-httpapi",
	name: "Microsoft HTTPAPI",
	website: "https://learn.microsoft.com/en-us/windows/win32/http/http-api-start-page",
	description: "Microsoft HTTPAPI is a kernel-mode HTTP driver in the Windows operating system responsible for handling HTTP requests and responses with efficiency, scalability, and security.",
	icon: "Microsoft.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "microsoft-httpapi:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Microsoft-HTTPAPI(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-httpapi:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("microsoft-httpapi(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: false,
	},
} as const satisfies TechnologyDefinition;
