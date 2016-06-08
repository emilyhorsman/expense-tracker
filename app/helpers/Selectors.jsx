export const getItemById = (items, id) => items.find(item =>
	item.get('id') === id)

export const editable = (editItems, items) => {
	return items.map(item =>
		item.set('edit', getItemById(editItems, item.get('id'))))
}
