import type { TechnologyDefinition } from '../../types';

export const allInOneAccessibilityTechnologyDefinition = {
	id: "all-in-one-accessibility",
	name: "All in One Accessibility",
	website: "https://www.skynettechnologies.com/all-in-one-accessibility",
	description: "All in One Accessibility is a website accessibility widget developed by Skynet Technologies to enhance compliance with WCAG 2.0, 2.1, 2.2, and ADA accessibility standards.",
	icon: "Skynet Technologies.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "all-in-one-accessibility:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.skynettechnologies\\.com\\/accessibility\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "all-in-one-accessibility:jsGlobal:1",
			kind: "jsGlobal",
			property: "aiao_modal_footer_height",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "all-in-one-accessibility:jsGlobal:2",
			kind: "jsGlobal",
			property: "aioa_accessibility_profiles_STATUS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
