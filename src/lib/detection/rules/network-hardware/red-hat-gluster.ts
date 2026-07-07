import type { TechnologyDefinition } from '../../types';

export const redHatGlusterTechnologyDefinition = {
	id: "red-hat-gluster",
	name: "Red Hat Gluster",
	website: "https://www.gluster.org",
	description: "Gluster is a free and open source scalable network filesystem.",
	icon: "gluster.png",
	categories: [
		"network-hardware",
	],
	rules: [],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
