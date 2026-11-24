import type { TechnologyDefinition } from '@/lib/detection/types';

export const ipfsTechnologyDefinition: TechnologyDefinition = {
	id: 'ipfs',
	name: 'IPFS',
	website: 'https://ipfs.tech/',
	description: 'IPFS is a peer-to-peer hypermedia protocol that provides a distributed hypermedia web.',
	icon: 'IPFS.svg',
	categories: [
		'network-hardware',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
