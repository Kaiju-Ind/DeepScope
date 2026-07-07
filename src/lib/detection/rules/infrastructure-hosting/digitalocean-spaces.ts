import type { TechnologyDefinition } from '../../types';

export const digitaloceanSpacesTechnologyDefinition = {
	id: "digitalocean-spaces",
	name: "DigitalOcean Spaces",
	website: "https://www.digitalocean.com/products/spaces",
	description: "DigitalOcean Spaces is a cloud-based object storage service provided by DigitalOcean, a cloud infrastructure provider. It allows users to store and retrieve large amounts of data, such as images, videos, audio files, backups, and logs, using a simple RESTful API or a web-based graphical user interface (GUI).",
	icon: "DigitalOcean.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "digitalocean-spaces:dom:0",
			kind: "dom",
			selector: "img[data-src*='.digitaloceanspaces.com'], img[src*='.digitaloceanspaces.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
