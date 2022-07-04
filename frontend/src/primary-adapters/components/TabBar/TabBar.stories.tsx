import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TabBar } from './TabBar';
import { TabButton } from '../TabButton/TabButton';
import { CreateTabButton } from '../CreateTabButton/CreateTabButton';

export default {
  title: 'TabBar',
  component: TabBar,
} as ComponentMeta<typeof TabBar>;

const tabs = [
  {
    name: 'Work',
    isActive: false,
    onClick: () => {
      // @ts-ignore
      tabs[1].isActive = true;
    },
    onChangeGridName: action('onChangeGridName'),
    onDelete: action('onDelete'),
  },
  {
    name: 'Home',
    isActive: true,
    onClick: () => {
      // @ts-ignore
      tabs[1].isActive = true;
    },
    onChangeGridName: action('onChangeGridName'),
    onDelete: action('onDelete'),
  },
  {
    name: 'Series',
    isActive: false,
    onClick: () => {
      // @ts-ignore
      tabs[1].isActive = true;
    },
    onChangeGridName: action('onChangeGridName'),
    onDelete: action('onDelete'),
  },
  {
    name: 'Entertainment',
    isActive: false,
    onClick: () => {
      // @ts-ignore
      tabs[1].isActive = true;
    },
    onChangeGridName: action('onChangeGridName'),
    onDelete: action('onDelete'),
  },
  {
    name: 'Others',
    isActive: false,
    onClick: () => {
      // @ts-ignore
      tabs[1].isActive = true;
    },
    onChangeGridName: action('onChangeGridName'),
    onDelete: action('onDelete'),
  },
];
export const TabBarComponent: ComponentStory<typeof TabBar> = () => (
  <TabBar>
    {tabs.map((tab) => (
      <TabButton
        name={tab.name}
        isActive={tab.isActive}
        onClick={tab.onClick}
        onChangeGridName={tab.onChangeGridName}
        onDelete={tab.onDelete}
      />
    ))}
    <CreateTabButton onClick={action('onClick')} />
  </TabBar>
);
