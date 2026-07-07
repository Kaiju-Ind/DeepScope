import type { TechnologyDefinition } from '../../types';

export const webwareTechnologyDefinition = {
	id: "webware",
	name: "Webware",
	website: "https://www.webware.ai",
	description: "Webware is a platform that provides a user-friendly toolkit designed to help businesses establish an online presence.",
	icon: "Webware.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webware:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("iglu:io\\.webware\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
