import type { TechnologyDefinition } from '../../types';

export const ampTechnologyDefinition = {
	id: "amp",
	name: "AMP",
	website: "https://www.amp.dev",
	description: "AMP, originally created by Google, is an open-source HTML framework developed by the AMP open-source Project. AMP is designed to help webpages load faster.",
	icon: "Accelerated-Mobile-Pages.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "amp:html:0",
			kind: "html",
			pattern: new RegExp("<html[^>]* (?:amp|⚡)[^-]"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "amp:html:1",
			kind: "html",
			pattern: new RegExp("<link rel=\"amphtml\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "amp:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("cdn\\.ampproject\\.org"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:3",
			kind: "jsGlobal",
			property: "AMP_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:4",
			kind: "jsGlobal",
			property: "AMP_EXP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:5",
			kind: "jsGlobal",
			property: "__AMP_BASE_CE_CLASS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:6",
			kind: "jsGlobal",
			property: "__AMP_EXTENDED_ELEMENTS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:7",
			kind: "jsGlobal",
			property: "__AMP_TAG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:8",
			kind: "jsGlobal",
			property: "ampInaboxIframes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amp:jsGlobal:9",
			kind: "jsGlobal",
			property: "ampInaboxPendingMessages",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
