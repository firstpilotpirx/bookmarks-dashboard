import { addons } from '@storybook/addons';
import MyTheme from './my-theme';

addons.setConfig({
  theme: MyTheme,
});

// export const parameters = {
//   docs: {
//     theme: themes.dark,
//   },
// };
