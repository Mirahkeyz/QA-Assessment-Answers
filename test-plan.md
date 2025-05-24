# Test Plan for Todo Vue.js Application

1. **Unit Tests (High Priority)**
   - Test individual components/functions in isolation
   - Focus on: todo addition/removal logic, filtering logic, input validation
   - Tools: Vitest/Jest with Vue Test Utils

2. **Component Tests (High Priority)**
   - Test component rendering and interactions
   - Verify DOM updates, event handling, and state changes
   - Tools: Vue Test Utils with Testing Library

3. **End-to-End Tests (Medium Priority)**
   - Test user flows across the application
   - Verify complete functionality from user perspective
   - Tools: Cypress

## Test Cases

### Test Case 1: Adding a Valid Todo
**Description**: Verify that a user can add a valid todo item  
**Preconditions**:
* Todo list is empty or contains existing items
* Application is loaded and ready for input

**Steps**:
1. Type "Buy groceries" in the input field
2. Press Enter key

**Expected Result**:
* New todo "Buy groceries" appears in the list
* Input field is cleared
* No error message is displayed

### Test Case 2: Adding an Empty Todo
**Description**: Verify validation prevents adding empty todos  
**Preconditions**:
* Todo list may be empty or contain items
* Application is loaded

**Steps**:
1. Leave input field empty
2. Press Enter key

**Expected Result**:
* No new todo is added to the list
* Error message "Todo cannot be empty" appears
* Input field remains empty

### Test Case 3: Deleting a Todo
**Description**: Verify user can delete a todo item  
**Preconditions**:
* Todo list contains at least one item
* Application is loaded

**Steps**:
1. Locate a todo item in the list
2. Click its "Delete" button

**Expected Result**:
* The selected todo is removed from the list
* Other todos remain unaffected
* No error messages appear

### Test Case 4: Filtering Short Todos
**Description**: Verify filter shows only short todos (≤10 chars)  
**Preconditions**:
* Todo list contains both short and long todos
* Application is loaded

**Steps**:
1. Add a short todo ("Walk dog")
2. Add a long todo ("Complete project documentation")
3. Select "Short (≤ 10 chars)" from filter dropdown

**Expected Result**:
* Only "Walk dog" is displayed
* "Complete project documentation" is hidden
* Filter dropdown shows "Short" as selected

### Test Case 5: Filtering Long Todos
**Description**: Verify filter shows only long todos (>10 chars)  
**Preconditions**:
* Todo list contains both short and long todos
* Application is loaded

**Steps**:
1. Add a short todo ("Call mom")
2. Add a long todo ("Schedule dentist appointment")
3. Select "Long (> 10 chars)" from filter dropdown

**Expected Result**:
* Only "Schedule dentist appointment" is displayed
* "Call mom" is hidden
* Filter dropdown shows "Long" as selected
