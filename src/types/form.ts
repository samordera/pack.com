import type { WizardWindowContentAction } from "./wizard"

export type BaseForm = {
    title?: string | undefined,
    fields: FormField[],
    buttons?: FormButton[] | undefined,
    action?: WizardWindowContentAction,
    otherInnerHTML?: string[],
}

type BaseFormField = {
    label: string,
    name: string,
    value: any,
    type: string,
    description?: string,
}

type SelectField = BaseFormField & {
    type: 'select',
    options: SelectFieldOption[]
}

type NonSelectField = BaseFormField & {
    type: Exclude<string, 'select'>,
    options?: never
}

type FormField = SelectField | NonSelectField

interface SelectFieldOption {
    label: string,
    value: string | number | Date,
    type?: string
}

interface FormButton {
    label: string,
    type: string,
}
