import { mount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'

describe('Todo.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Todo)
  })

  // Test 1: Computed property - filteredTodos
  describe('filteredTodos computed property', () => {
    it('filters todos correctly based on selected filter', async () => {
      // Set initial todos
      await wrapper.setData({
        todos: [
          { id: 1, text: 'Short' },
          { id: 2, text: 'This is a long todo' }
        ]
      })

      // Test 'all' filter
      await wrapper.setData({ filter: 'all' })
      expect(wrapper.vm.filteredTodos.length).toBe(2)

      // Test 'short' filter
      await wrapper.setData({ filter: 'short' })
      expect(wrapper.vm.filteredTodos.length).toBe(1)
      expect(wrapper.vm.filteredTodos[0].text).toBe('Short')

      // Test 'long' filter
      await wrapper.setData({ filter: 'long' })
      expect(wrapper.vm.filteredTodos.length).toBe(1)
      expect(wrapper.vm.filteredTodos[0].text).toBe('This is a long todo')
    })
  })

  // Test 2: User interaction - adding a todo
  describe('addTodo functionality', () => {
    it('adds a new todo when Enter is pressed with valid input', async () => {
      const input = wrapper.find('input')
      await input.setValue('New todo item')
      await input.trigger('keydown.enter')

      expect(wrapper.vm.todos.length).toBe(1)
      expect(wrapper.vm.todos[0].text).toBe('New todo item')
      expect(wrapper.vm.newTodo).toBe('')
      expect(wrapper.find('.error').exists()).toBe(false)
    })
  })

  // Test 3: Edge case - submitting empty input
  describe('input validation', () => {
    it('shows error when trying to add empty todo', async () => {
      const input = wrapper.find('input')
      await input.setValue('')
      await input.trigger('keydown.enter')

      expect(wrapper.vm.todos.length).toBe(0)
      expect(wrapper.vm.error).toBe('Todo cannot be empty')
      expect(wrapper.find('.error').text()).toContain('Todo cannot be empty')
    })
  })
})



