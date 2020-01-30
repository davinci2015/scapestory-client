export const matchItemToValue = (item: string, value: string) =>
    item.toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1

export const isProduction = () => process.env.NODE_ENV === 'production'

export const shareOnFacebook = (url: string) => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'facebook-share-dialog')
}

export const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
