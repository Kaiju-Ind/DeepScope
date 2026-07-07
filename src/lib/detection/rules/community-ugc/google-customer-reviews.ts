import type { TechnologyDefinition } from '../../types';

export const googleCustomerReviewsTechnologyDefinition = {
	id: "google-customer-reviews",
	name: "Google Customer Reviews",
	website: "https://support.google.com/merchants/answer/7105655?hl=en",
	description: "Google Customer Reviews is a badge on your site that can help users identify your site with the Google brand and can be placed on any page of your site.",
	icon: "Google.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "google-customer-reviews:dom:0",
			kind: "dom",
			selector: "iframe[src*='.google.com/shopping/customerreviews/'], a[href*='.google.com/shopping/customerreviews/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
