import type { TechnologyDefinition } from '../../types';

export const brizyCloudTechnologyDefinition = {
	id: "brizy-cloud",
	name: "Brizy Cloud",
	website: "https://brizy.io",
	description: "Brizy Cloud is a platform for creating and managing websites using an intuitive drag-and-drop editor, allowing users to design and publish sites without any coding knowledge.",
	icon: "Brizy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "brizy-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("b-cloud\\.b-cdn\\.net\\/builds\\/(?:free|pro)\\/\\d+-cloud"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brizy-cloud:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']brz-root__container"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
