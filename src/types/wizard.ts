import type { BaseForm } from "./form";

export type BaseWizard = {
    title: string,
    description?: string,
    windows: WizardWindowContent[],
}

interface WizardWindowContent {
    title: string,
    description?: string,
    form?: BaseForm,
    action?: WizardWindowContentAction
}

export interface WizardWindowContentAction {
    name: string,
    subroutine: () => void,
}