type Variant = 'primary' | 'iconPrimary' | 'link' | 'iconLink'

interface Props {
  title: string
  variant: Variant
  onClick?(): void
  extraClasses?: string
  disabled?: boolean
  children: any
}

const classes: { [key in Variant]: string } = {
  primary: 'inline-flex justify-center items-center px-9 py-1.5 w-full text-sm select-none border rounded',
  iconPrimary: 'inline-flex justify-center items-center gap-2 px-9 py-1.5 w-full text-sm select-none border-2 rounded',
  link: 'inline-flex justify-center items-center px-4 py-1.5 text-sm select-none rounded',
  iconLink: 'inline-flex justify-center items-center gap-2 px-1 py-1 text-sm select-none rounded'
}

export function Button(props: Props) {
  const { onClick = () => {}, variant = 'primary', extraClasses = '', disabled = false, title, children } = props

  return (
    <button
      class={classes[variant] + ' ' + extraClasses}
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
