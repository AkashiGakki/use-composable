---
category: '@Core'
---

# useForceRerender

Manually re-render the dom somewhere you want.

## Usage

```ts
import { useForceRerender } from '@use-composable/core'

const {
  renderKey,
  forceRerender,
  genRenderKey
} = useForceRerender()

forceRerender() // somewhere you want to re-render
```

```html
<some-dom :key="renderKey" />

<!-- or -->
<some-dom :key="genRenderKey()" />
```
