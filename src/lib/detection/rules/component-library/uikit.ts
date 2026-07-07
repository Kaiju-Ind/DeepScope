import type { TechnologyDefinition } from '../../types';

export const uikitTechnologyDefinition = {
	id: "uikit",
	name: "UIKit",
	website: "https://getuikit.com",
	description: "UIKit is the framework used for developing iOS applications.",
	icon: "UIKit.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "uikit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("uikit.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uikit:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]+class=\"[^\"]*(?:uk-container|uk-section)"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
