import type { TechnologyDefinition } from '../../types';

export const zonalBookingsTechnologyDefinition = {
	id: "zonal-bookings",
	name: "Zonal Bookings",
	website: "https://www.zonal.co.uk/products/bookings",
	description: "Zonal Bookings is a reservations platform that enables hospitality businesses to centralize and manage all booking activities without charging commissions.",
	icon: "Zonal.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zonal-bookings:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.reservationDetails\\.zonalBookingReference"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "zonal-bookings:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.reservationdetails\\.zonalbookingreference"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
