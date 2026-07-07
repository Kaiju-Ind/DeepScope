import type { TechnologyDefinition } from '../../types';

export const labradorCmsTechnologyDefinition = {
	id: "labrador-cms",
	name: "Labrador CMS",
	website: "https://www.labradorcms.com",
	description: "Labrador CMS is a cloud-based CMS for professional publishers and newsrooms.",
	icon: "LabradorCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "labrador-cms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("Device from labrador"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "labrador-cms:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("device from labrador"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
