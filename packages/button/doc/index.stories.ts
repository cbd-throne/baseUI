export default {
  title: 'Button',
}

export const NormalButton = (): string => '<nb-button>With Text</nb-button>'
export const ButtonTwo = (): string => '<nb-button type="warning">button two</nb-button>'
export const ButtonGroup = (): string => `<nb-button-group>
<nb-button type="primary">Left</nb-button>
<nb-button type="primary">Right</nb-button>
</nb-button-group>`