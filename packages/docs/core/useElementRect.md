---
category: '@Core'
---

# useElementRect

Reactive Element bounding client rect.

## Usage

```ts
import { useElementRect } from '@use-composable/core'

const { domRef, domRect } = useElementRect()
// use reactive Rect: domRect.width | domRect.height
```

```html
<some-dom ref="domRef" /> d
```
