import {defineStore} from "pinia";

export const useModalStore = defineStore('modal', {
    state: () => ({
        modalOpen: false,
        component: '',
        props: {},
    }),
    actions: {
        close() {
            this.modalOpen = false
            document.body.style.overflow = 'initial'
        },
        open() {
            this.modalOpen = true
        },
        initModal(component, props = {}) {
            this.props = {...this.props, ...props}
            this.component = component
            document.body.style.overflow = 'hidden'
            this.open()
        }
    }
});