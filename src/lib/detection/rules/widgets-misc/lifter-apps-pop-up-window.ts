import type { TechnologyDefinition } from '../../types';

export const lifterAppsPopUpWindowTechnologyDefinition = {
	id: "lifter-apps-pop-up-window",
	name: "Lifter Apps Pop-up Window",
	website: "https://lifterapps.com",
	description: "Lifter Apps Pop-up Window is a customizable on-site feature designed to capture visitor emails and highlight sales promotions.",
	icon: "LifterApps.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lifter-apps-pop-up-window:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("(?:\\.lifterpopup\\.com|popup\\.lifterapps\\.com)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
