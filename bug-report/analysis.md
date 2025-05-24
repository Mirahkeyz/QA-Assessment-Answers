# Bug Analysis: Duplicate Todo Items with Rapid Entry

## Issue Confirmation
The bug report describes a race condition where:
1. Rapid Enter key presses create duplicate todos
2. Deletion behavior becomes unpredictable (multiple items may disappear)
3. Issue appears related to timestamp-based ID generation

## Expanded Steps to Reproduce
1. Type a todo (e.g., "Pay bills")
2. Within 500ms, press Enter 3-4 times rapidly
3. Observe 2-3 identical todos appearing
4. Click delete on one duplicate:
   - Sometimes only the clicked item disappears
   - Sometimes all duplicates disappear together

## Root Cause Analysis
1. **ID Collision**:
   - Current ID uses `Math.floor(Date.now() / 1000)` (second precision)
   - Rapid submissions get identical IDs when within the same second

2. **Vue Reactivity Timing**:
   - State updates (`newTodo` clearing) may not propagate before next submission
   - Multiple adds execute before Vue's reactive updates complete

3. **Deletion Anomaly**:
   - Duplicates share identical IDs
   - `deleteTodo` removes ALL todos matching that ID

## Recommended Fixes

### Immediate Solution (Bugfix)

function addTodo() {
  if (!newTodo.value.trim()) {
    error.value = 'Todo cannot be empty'
    return
  }

  // Use microsecond precision + random component
  const newId = Date.now() + Math.floor(Math.random() * 1000)
  
  todos.value.push({
    id: newId,
    text: newTodo.value.trim()
  })

  newTodo.value = ''
  error.value = ''
}


### Robust Solution (Production-grade)
1. **Debounced Input Handler**:

import { debounce } from 'lodash-es'

const addTodo = debounce(() => {
  // ... existing logic ...
}, 300, { leading: true, trailing: false })
```

2. **Prevent Duplicate Text**:
```javascript
if (todos.value.some(t => t.text === newTodo.value.trim())) {
  error.value = 'Todo already exists'
  return
}


## Regression Prevention Strategy

1. **Unit Tests**:

describe('Duplicate Prevention', () => {
  it('generates unique IDs for rapid submissions', async () => {
    const wrapper = mount(Todo)
    await wrapper.find('input').setValue('Urgent task')
    await wrapper.find('input').trigger('keydown.enter')
    await wrapper.find('input').trigger('keydown.enter')
    
    const ids = wrapper.vm.todos.map(t => t.id)
    expect(new Set(ids).size).toBe(2) // Unique IDs
  })
})


2. **E2E Test**:

test('rapid entry creates no duplicates', async ({ page }) => {
  await page.fill('input', 'Critical bugfix')
  for (let i = 0; i < 5; i++) {
    await page.press('input', 'Enter')
  }
  const items = await page.locator('li').count()
  expect(items).toBe(1) // Only one should exist
})


3. **Monitoring**:
- Add console warning when duplicate detection triggers
- Log unusual cases (e.g., >2ms between same-text submissions)

## Impact Assessment
**Severity**: Medium  
**Priority**: High  
**Affected Users**: All users performing rapid data entry  
**Workaround**: Slow, deliberate typing (not acceptable UX)
