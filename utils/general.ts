export const matchItemToValue = (item: string, value: string) =>
    item.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1

export const isProduction = () => process.env.NODE_ENV === 'production'
