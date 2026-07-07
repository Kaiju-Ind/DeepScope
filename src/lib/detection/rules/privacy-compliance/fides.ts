import type { TechnologyDefinition } from '../../types';

export const fidesTechnologyDefinition = {
	id: "fides",
	name: "Fides",
	website: "https://ethyca.com/fides",
	description: "Fides is a privacy engineering and consent-management platform for governing user privacy choices and compliance workflows.",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "fides:dom:0",
			kind: "dom",
			selector: "#fides-modal-link, [id^='fides-'], [class*='fides-']",
			confidence: 90,
			description: "DOM markers match Fides consent-management controls.",
		},
		{
			id: "fides:html:1",
			kind: "html",
			pattern: new RegExp("\\bfides-(modal|banner|toggle|consent|privacy)", "i"),
			confidence: 80,
			description: "HTML contains bounded Fides consent-management markers.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
