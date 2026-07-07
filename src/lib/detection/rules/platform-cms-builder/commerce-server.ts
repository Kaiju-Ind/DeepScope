import type { TechnologyDefinition } from '../../types';

export const commerceServerTechnologyDefinition = {
	id: "commerce-server",
	name: "Commerce Server",
	website: "https://commerceserver.net",
	icon: "Commerce Server.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:commerce_server:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
