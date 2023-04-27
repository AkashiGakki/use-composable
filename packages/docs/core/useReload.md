---
category: '@Core'
---

# useReload

Manually reflow the dom.

## Usage

```ts
import { useReload } from '@use-composable/core'

const { load, reload } = useReload()

reload() // somewhere you want to re-render
```

```html
<some-dom v-if="load" />
```

::: tip
It is recommended to use [useForceRerender](https://use-composable.netlify.app/core/useForceRerender.html) instead.
:::
