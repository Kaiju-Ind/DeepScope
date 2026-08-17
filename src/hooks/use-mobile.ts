import { createMediaQuery } from '@solid-primitives/media'

const MOBILE_MEDIA_QUERY = '(max-width: 767px)'

/** Returns a reactive media-query accessor for the mobile sidebar breakpoint. */
export function useIsMobile() {
	return createMediaQuery(MOBILE_MEDIA_QUERY)
}
