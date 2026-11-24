import FilterIcon from '~icons/fluent/filter-24-regular';
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';

import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

/** Props for the shared compact filter control used by investigation lists. */
export interface FilterMenuPropsType {
	/** Number of non-default filter dimensions currently active. */
	readonly count: number;
	/** Accessible name for the filter trigger. */
	readonly label: string;
	/** Filter sections rendered inside the dropdown. */
	readonly children: JSX.Element;
	/** Optional width override for unusually large filter menus. */
	readonly class?: string;
}

/**
 * Render one consistent filter trigger while leaving filter semantics to its page.
 *
 * Search, sort, and view selection remain separate controls because they answer
 * different user questions. This component owns only the repeated trigger and
 * dropdown presentation.
 */
export function FilterMenu(props: FilterMenuPropsType) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger as={Button} variant="outline" class="shrink-0 gap-2" aria-label={props.label}>
				<FilterIcon class="size-4" aria-hidden="true" />
				<span class="hidden xs:inline">Filter</span>
				<Show when={props.count > 0}><Badge class="tabular-nums">{props.count}</Badge></Show>
			</DropdownMenuTrigger>
			<DropdownMenuContent class={props.class ?? 'min-w-60'}>{props.children}</DropdownMenuContent>
		</DropdownMenu>
	);
}
