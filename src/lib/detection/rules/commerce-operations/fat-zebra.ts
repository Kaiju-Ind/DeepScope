import type { TechnologyDefinition } from '../../types';

export const fatZebraTechnologyDefinition = {
	id: "fat-zebra",
	name: "Fat Zebra",
	website: "https://www.fatzebra.com/",
	description: "Fat Zebra provides a process of accepting credit card payments online.",
	icon: "fatzebra.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "fat-zebra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("paynow\\.pmnts\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fat-zebra:html:1",
			kind: "html",
			pattern: new RegExp("<(?:iframe|img|form)[^>]+paynow\\.pmnts\\.io"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fat-zebra:html:2",
			kind: "html",
			pattern: new RegExp("<(?:iframe)[^>]+FatZebraFrame"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fat-zebra:dom:3",
			kind: "dom",
			selector: "iframe[src*='paynow.pmnts.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fat-zebra:dom:4",
			kind: "dom",
			selector: "form[action*='paynow.pmnts.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fat-zebra:dom:5",
			kind: "dom",
			selector: "iframe[src*='FatZebraFrame']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fat-zebra:html:6",
			kind: "html",
			pattern: new RegExp("<(?:iframe)[^>]+fatzebraframe"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fat-zebra:dom:7",
			kind: "dom",
			selector: "iframe[src*='paynow.pmnts.io'], form[action*='paynow.pmnts.io'], iframe[src*='FatZebraFrame']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
