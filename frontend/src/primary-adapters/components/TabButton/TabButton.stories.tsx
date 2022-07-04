import { ComponentMeta, ComponentStory } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { TabButton } from './TabButton';

export default {
  title: 'TabButton',
  component: TabButton,
  argTypes: {
    name: {
      defaultValue: 'Tab 1',
    },
    isActive: {
      defaultValue: true,
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof TabButton>;

export const TabButtonComponent: ComponentStory<typeof TabButton> = (args) => (
  <TabButton
    name={args.name}
    isActive={args.isActive}
    onClick={action('onClick')}
    onChangeGridName={action('onChangeGridName')}
    onDelete={action('onDelete')}
  />
);
