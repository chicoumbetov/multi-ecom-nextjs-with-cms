import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateColor } from '@/application/hooks/queries/colors/useCreateColor'
import { useDeleteColor } from '@/application/hooks/queries/colors/useDeleteColor'
import { useUpdateColor } from '@/application/hooks/queries/colors/useUpdateColor'
import { Button } from '@/presentation/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form-elements/Form'
import { Input } from '@/presentation/components/ui/form-elements/Input'
import { Heading } from '@/presentation/components/ui/Heading'
import { ConfirmModal } from '@/presentation/components/ui/modals/ConfirmModal'
import { IColor, IColorInput } from '@/shared/domain/entities/color.interface'
import styles from '../Store.module.css'

interface ColorFormProps {
	color?: IColor
}

export function ColorForm({ color }: ColorFormProps) {
	const { createColor, isLoadingCreate } = useCreateColor()
	const { updateColor, isLoadingUpdate } = useUpdateColor()
	const { deleteColor, isLoadingDelete } = useDeleteColor()

	const title = color ? 'Изменить данные' : 'Создать цвет'
	const description = color
		? 'Изменить данные о цвете'
		: 'Добавить новый цвет в магазин'
	const action = color ? 'Сохранить' : 'Создать'

	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name || '',
			value: color?.value || ''
		}
		/* || {
			name: '',
			value: ''
		}
			*/
	})

	const onSubmit: SubmitHandler<IColorInput> = data => {
		if (color) updateColor(data)
		else createColor(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{color && (
					<ConfirmModal handleClick={() => deleteColor()}>
						<Button
							size='icon'
							variant='primary'
							disabled={isLoadingDelete}
						>
							<Trash className='size-4' />
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='name'
							rules={{
								required: 'Название обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											placeholder='Название цвета'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							rules={{
								required: 'Значение обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Значение</FormLabel>
									<FormControl>
										<Input
											placeholder='Значение цвета'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						variant='primary'
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{action}
					</Button>
				</form>
			</Form>
		</div>
	)
}
