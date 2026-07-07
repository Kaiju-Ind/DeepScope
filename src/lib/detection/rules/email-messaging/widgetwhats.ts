import type { TechnologyDefinition } from '../../types';

export const widgetwhatsTechnologyDefinition = {
	id: "widgetwhats",
	name: "WidgetWhats",
	website: "https://widgetwhats.com",
	description: "WidgetWhats is a fully customizable chat widget with appearance, text, color, button style and position.",
	icon: "WidgetWhats.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "widgetwhats:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.widgetwhats\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "widgetwhats:jsGlobal:1",
			kind: "jsGlobal",
			property: "wwwa_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
