import type { TechnologyDefinition } from '../../types';

export const isayTechnologyDefinition = {
	id: "isay",
	name: "ISAY",
	website: "https://www.icisleri.gov.tr/internet-sayfalari-yonetimi-isay",
	description: "ISAY (Internet Pages Management) is a CMS service provided by the Turkish Ministry of Interior for governorships, district governorships and various official websites.",
	icon: "ISAY.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "isay:dom:0",
			kind: "dom",
			selector: "div.topbar-img img[src*='/Areas/WebPart/Contents/FHeader/img/ataturk.svg']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
