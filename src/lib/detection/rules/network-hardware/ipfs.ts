import type { TechnologyDefinition } from '../../types';

export const ipfsTechnologyDefinition = {
	id: "ipfs",
	name: "IPFS",
	website: "https://ipfs.tech/",
	description: "IPFS is a peer-to-peer hypermedia protocol that provides a distributed hypermedia web.",
	icon: "IPFS.svg",
	categories: [
		"network-hardware",
	],
	rules: [],
} as const satisfies TechnologyDefinition;
