<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        square
        filled
        bg-color="white"
        placeholder="Agregar tarea"
        maxlength="50"
        dense
        autofocus
      >
        <template v-slot:append>
          <q-btn
            @click="addTask"
            round
            dense
            flat
            icon="add"
          />
        </template>
      </q-input>
    </div>
    <!-- <div class="row q-pa-sm bg-primary">
    <q-input
      v-model="newDescription"
      filled
      autogrow
      class="col"
      square
      bg-color="white"
      placeholder="Agregar descripción(Opcional)"
      dense/>
    </div> -->
    <div class="q-pa-md q-gutter-sm bg-primary">
    <q-editor v-model="editor" placeholder="Descripción de la tarea" min-height="5rem" />

    <!-- <q-card flat bordered>
      <q-card-section v-html="editor" />
    </q-card> -->
    </div>

    <q-list
    class="bg-white"
    separator
    bordered>

      <TodoList
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        :id="task.id"
        @setDone="(value) => updateTask({ id: task.id, done: value  })"
        @delete="(id) => deleteTask(id)"
      />

    </q-list>

    <div
      v-if="!Object.keys(tasks).length"
      class="no-tasks absolute-center"
      align="center"
    >

      <q-icon
        name="check"
        size="100px"
        color="primary"
      />

      <div class="text-h5 text-primary text-center">
        No hay tareas
      </div>

    </div>

    <img
      class="flex flex-center"
      alt="Snabb logo"
      src="~assets/logo_snabb1.da61e3c1.svg"
    >

  </q-page>

</template>

<script>
import TodoList from 'components/Todo_list'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      newTask: '',
      editor: '',
      submitTask: {}
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },

  components: {
    TodoList
  },

  methods: {
    /* deleteTask (index) {
      this.$q.onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify('Tarea eliminada satisfactoriamente.')
      })
    },
    */
    addTask () {
      if (this.newTask !== '') {
        this.submitTask.title = this.newTask
        this.submitTask.description = this.editor
        this.submitTask.done = false
        // this.submitTask.push({
        //   title: this.newTask,
        //   description: this.editor,
        //   done: false
        // })
        // console.log('Tarea a agregar: ', this.submitTask)
        this.addingTask(this.submitTask)
        this.newTask = ''
        this.editor = ''
      }
      console.log('addTask')
    },
    ...mapActions('tasks', ['updateTask', 'deleteTask', 'addingTask', 'loadCurrentUser', 'loadFromStorage'])
  },
  mounted () {
    this.loadCurrentUser()
    this.loadFromStorage()
  }
}
</script>

<style lang="scss">
  .done {
    .q-item__label {
      text-decoration: line-through;
      color: #bbb;
    }
  }
  .no-tasks {
    opacity: 0.5;
  }
</style>
