import { ComponentMeta, ComponentStory } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { CreateTabButton } from './CreateTabButton';

export default {
  title: 'CreateTabButton',
  component: CreateTabButton,
} as ComponentMeta<typeof CreateTabButton>;

export const CreateTabButtonComponent: ComponentStory<typeof CreateTabButton> = () => <CreateTabButton onClick={action('onClick')} />;
