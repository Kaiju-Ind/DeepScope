import type { TechnologyDefinition } from '../../types';

export const varbaseTechnologyDefinition = {
	id: "varbase",
	name: "Varbase",
	website: "https://www.vardot.com/solutions/varbase",
	icon: "varbase.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "varbase:dom:0",
			kind: "dom",
			selector: "meta[content='Varbase'],div[class*='varbase_'],div[class*='_varbase'],div[class*='varbase-'],div[class*='block-varbase'],div[class*='blockvarbase']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "varbase:jsGlobal:1",
			kind: "jsGlobal",
			property: "drupalSettings.ajaxPageState.libraries",
			valuePattern: new RegExp(".+varbase_.+"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:vardot:varbase:*:*:*:*:*:*:*:*",
	},
	implies: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
