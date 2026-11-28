import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';

import { cn } from '../utils/cn.ts';

/** Kaiju Design's surface contract, bound to DeepScope's existing input tokens. */
const inputVariants = cva(
	'w-full min-w-0 outline-hidden file:inline-flex file:border-0 file:bg-transparent file:text-white',
	{
		variants: {
			surface: {
				default: 'z-input',
				bare: 'z-input-bare',
			},
		},
		defaultVariants: { surface: 'default' },
	},
);

/** Native input attributes with an optional surface; the default keeps the product's border and background. */
type InputProps = ComponentProps<'input'> & VariantProps<typeof inputVariants>;

/**
 * Render a native input with the selected surface and forwarded attributes, events and ref.
 *
 * A supplied value follows Solid's normal input contract; this component keeps
 * no separate value state. Callers own validation and submission. The bare
 * surface removes the local focus ring, so its containing control must show focus.
 */
const Input = (props: InputProps) => {
	const [local, others] = splitProps(props, ['class', 'surface']);
	return (
		<input
			data-slot="input"
			class={cn(inputVariants({ surface: local.surface }), local.class)}
			{...others}
		/>
	);
};

export { Input, type InputProps, inputVariants };
