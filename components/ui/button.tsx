'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-2xl active:translate-y-[1px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500',
	{
		variants: {
			variant: {
				default: 'bg-orange-500 text-white hover:bg-orange-500/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-orange-400 border text-orange-400 bg-transparent hover:bg-secondary',
				secondary: 'bg-orange-50 text-orange-500 hover:bg-orange-50/50',
				ghost: 'hover:bg-orange-50 hover:text-orange-50-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			children,
			disabled,
			loading,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				disabled={disabled || loading}
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{!loading ? children : <Loader className='w-5 h-5 animate-spin' />}
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
