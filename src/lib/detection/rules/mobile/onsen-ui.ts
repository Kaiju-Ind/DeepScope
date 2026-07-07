import type { TechnologyDefinition } from '../../types';

export const onsenUiTechnologyDefinition = {
	id: "onsen-ui",
	name: "Onsen UI",
	website: "https://onsen.io",
	description: "Onsen UI is an open-source HTML5 hybrid app framework offering mobile UI components for PhoneGap and Cordova development.",
	icon: "OnsenUI.svg",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "onsen-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(\\/.*onsen.*min\\.js|.*angular-onsenui\\.min\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
