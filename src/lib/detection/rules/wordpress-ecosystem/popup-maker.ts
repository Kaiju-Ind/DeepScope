import type { TechnologyDefinition } from '../../types';

export const popupMakerTechnologyDefinition = {
	id: "popup-maker",
	name: "Popup Maker",
	website: "https://wppopupmaker.com",
	description: "Popup Maker is a plugin that lets you create popup windows for your WordPress website.",
	icon: "Popup Maker.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "popup-maker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/popup-maker\\/(?:.+site(?:\\.min)?\\.js\\?.+ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "popup-maker:jsGlobal:1",
			kind: "jsGlobal",
			property: "pum_popups",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:code-atlantic:popup_maker:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
