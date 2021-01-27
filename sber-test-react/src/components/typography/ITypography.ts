type TypoVariant = 'p' | 'h1-title' | 'h2-title' | 'h3-title'

export interface Props {
    variant: TypoVariant,
    title?: string
}