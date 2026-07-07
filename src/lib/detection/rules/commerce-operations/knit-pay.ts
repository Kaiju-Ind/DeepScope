import type { TechnologyDefinition } from '../../types';

export const knitPayTechnologyDefinition = {
	id: "knit-pay",
	name: "Knit pay",
	website: "https://www.knockcrm.com",
	description: "Knit Pay is a platform designed for collecting payments and managing businesses while ensuring customer data security.",
	icon: "Knitpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "knit-pay:jsGlobal:0",
			kind: "jsGlobal",
			property: "knit_pay_payment_button_ajax_object",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
