# SaltyCube

SaltyCube is a debug menu for Twine/SugarCube games. 

# How to use

1. Put `salty-cube.js` near `index.html`
2. Add script block to the `<head>` of the document
```html
<!DOCTYPE html>
<html data-init="no-js">
<head>
<script defer src="salty-cube.js"></script>
...
```

# Configuration

You can configure some options with data-attributes on `<script>` tag:

|data-attribute|Value (Default)|Description|
|---|---|---|
|`data-salty-cube-theme`|`light` \| `dark` \| `compact` (`light`)|Application theme|
|`data-salty-cube-color`|html or hex color (`#1677ff`)|Primary color of application|
|`data-salty-cube-lang`|`ru` \| `en` (`ru`)|Application language|
|`data-salty-cube-position`|`Position` value (`bottom;right`)|Menu position|

## Position value

Position value must contain 2 keywords (representing the corresponding screen corner) and optional offset values. Keywords are `top`, `left`, `bottom` and `right`. Values such as `top:bottom` and `left:right` are considered invalid.

Offset values correspond to the distance in `px` from the corresponding edge of the screen. Thus, the value `top:0;left:10` corresponds to the top left corner, 10px from the left edge and 0px from the top edge.

## Example

```html
<script defer src="salty-cube.js" data-salty-cube-theme="compact" data-salty-cube-color="tomato" data-salty-cube-lang="en" data-salty-cube-position="top;right:40"></script>
```
