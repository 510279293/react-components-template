---
order: 7
title: Customize Theme
---

Ant Design allows you to customize our design tokens to satisfy UI diversity from business or brand requirements, including primary color, border radius, border color, etc.

In version 5.0, we provide a new way to customize themes. Different from the less and CSS variables of the 4.x version, with CSS-in-JS, the ability of theming has also been enhanced, including but not limited to:

1. Switching theme dynamically；
2. Multiple themes；
3. Customizing theme variables for some component；
4. ...

## Customize theme with `ConfigProvider`

In version 5.0 we call the smallest element that affects the theme **Design Token**. By modifying the Design Token, we can present various themes or components.

### Customize Design Token

You can pass `theme` to ConfigProvider to customize theme. After migrate to V5, theme of V5 will be applied by default. Here's a simple example:

```tsx
import { Button, ConfigProvider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <Button />
  </ConfigProvider>
);

export default App;
```
