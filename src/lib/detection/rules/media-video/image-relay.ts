import type { TechnologyDefinition } from '../../types';

export const imageRelayTechnologyDefinition = {
	id: "image-relay",
	name: "Image Relay",
	website: "https://www.imagerelay.com",
	description: "Image Relay is a digital asset management system that allows organizations to upload, manage, organize, monitor and track their digital assets.",
	icon: "Image Relay.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "image-relay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.imagerelay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "image-relay:dom:1",
			kind: "dom",
			selector: "a[href*='.imagerelay.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "image-relay:jsGlobal:2",
			kind: "jsGlobal",
			property: "ImageRelay.accounts",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
