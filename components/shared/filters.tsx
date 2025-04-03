'use client'

import { FilterCheckbox } from '@/components/shared'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import React from 'react'
import { Input } from '../ui'
import { CheckboxFiltersGroups } from './checkbox-filters-groups'
import { RangeSlider } from './range-slider'
import { Title } from './title'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()
	const items = ingredients.map(item => ({
		text: item.name,
		value: String(item.id),
	}))
	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox name='qwe' text='Можно собирать' value='1' />
				<FilterCheckbox name='ewq' text='Новинки' value='2' />
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						defaultValue={0}
					/>
					<Input type='number' placeholder='1000' min={100} max={1000} />
				</div>
				<RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
			</div>

			<CheckboxFiltersGroups
				title='Ингредиенты'
				className='mt-5'
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={onAddId}
				selectedIds={selectedIds}
				name='ingredients'
			/>
		</div>
	)
}
