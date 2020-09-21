export default {
  title: 'Button',
}

export const NormalButton = (): string => '<nb-button>With Text</nb-button>'
export const ButtonTwo = (): string => '<nb-button>button two</nb-button>'
export const ButtonGroup = (): string => `<nb-button-group>
<nb-button type="primary" icon="nb-icon-arrow-left">Left</nb-button>
<nb-button type="primary">Right<i class="nb-icon-arrow-right nb-icon--right"></i></nb-button>
</nb-button-group>`