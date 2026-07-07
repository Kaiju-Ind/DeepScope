import type { TechnologyDefinition } from '../../types';

export const magemailTechnologyDefinition = {
	id: "magemail",
	name: "MageMail",
	website: "https://magemail.co",
	description: "MageMail is a triggered email application for Magento that helps online retailers enhance customer engagement and increase revenue.",
	icon: "MageMail.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "magemail:jsGlobal:0",
			kind: "jsGlobal",
			property: "Mage.Cookies",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "magemail:jsGlobal:1",
			kind: "jsGlobal",
			property: "MageMailData.capture_email",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "magemail:jsGlobal:2",
			kind: "jsGlobal",
			property: "MageRewards",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
