# Bento Grid Layout Example - 10 Items

## Item Sizing Pattern
- Index % 4 === 0 → **Large** (8 columns)
- Index % 3 === 0 (but not % 4 === 0) → **Medium** (6 columns)  
- Otherwise → **Small** (4 columns)

## Layout Breakdown

### Row 1 (12 columns total)
```
[Item 0: Large (8 cols)] [Item 1: Small (4 cols)]
```
✅ Row complete - no gap

### Row 2 (12 columns total)
```
[Item 2: Small (4 cols)] [Item 3: Medium (6 cols)] [Gap: 2 cols]
```
⚠️ Row complete - 2 column gap

### Row 3 (12 columns total)
```
[Item 4: Large (8 cols)] [Item 5: Small (4 cols)]
```
✅ Row complete - no gap

### Row 4 (12 columns total)
```
[Item 6: Medium (6 cols)] [Item 7: Small (4 cols)] [Gap: 2 cols]
```
⚠️ Row complete - 2 column gap

### Row 5 (12 columns total)
```
[Item 8: Large (8 cols)] [Item 9: Medium (6 cols) - SPANS REMAINING]
```
✅ Last item spans remaining 4 columns to fill the row

## Visual Grid Representation

```
┌─────────────────────────────────────────────────────────────┐
│ Row 1: 12 columns                                           │
│ ┌──────────────────┐ ┌────────┐                            │
│ │ Item 0 (Large)   │ │ Item 1 │                            │
│ │ 8 columns        │ │ 4 cols │                            │
│ └──────────────────┘ └────────┘                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Row 2: 12 columns                                           │
│ ┌────────┐ ┌──────────────┐ ┌──┐                           │
│ │ Item 2 │ │ Item 3       │ │  │ Gap (2 cols)              │
│ │ 4 cols │ │ Medium       │ │  │                           │
│ │        │ │ 6 cols       │ │  │                           │
│ └────────┘ └──────────────┘ └──┘                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Row 3: 12 columns                                           │
│ ┌──────────────────┐ ┌────────┐                            │
│ │ Item 4 (Large)   │ │ Item 5 │                            │
│ │ 8 columns        │ │ 4 cols │                            │
│ └──────────────────┘ └────────┘                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Row 4: 12 columns                                           │
│ ┌──────────────┐ ┌────────┐ ┌──┐                           │
│ │ Item 6       │ │ Item 7 │ │  │ Gap (2 cols)              │
│ │ Medium       │ │ 4 cols │ │  │                           │
│ │ 6 cols       │ │        │ │  │                           │
│ └──────────────┘ └────────┘ └──┘                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Row 5: 12 columns (Last Row)                               │
│ ┌──────────────────┐ ┌──────────────────────────────────┐│
│ │ Item 8 (Large)   │ │ Item 9 (Medium - SPANS REMAINING) ││
│ │ 8 columns        │ │ Would be 6, but spans remaining 4 ││
│ └──────────────────┘ └──────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Summary
- **Total Items**: 10
- **Total Rows**: 5
- **Rows with gaps**: 2 (Row 2 and Row 4, each with 2 column gaps)
- **Last row**: Item 9 spans remaining columns to fill the row completely

## Current Logic Behavior
- Items 0-7: Follow normal sizing pattern
- Item 8: Large (8 cols) - normal
- Item 9: Medium (6 cols) but would only have 4 cols remaining
  - **Condition check**: `remainingColumns (4) < columnSpan (6)` → TRUE
  - **Result**: Spans remaining 4 columns using `grid-column: auto / -1`

