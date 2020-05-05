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
      maxlength="12"
      dense>
        <template v-slot:append>
          <q-btn
          @click="addTask"
          round
          dense
          flat
          icon="add" />
        </template>
      </q-input>
    </div>
    <div class="row q-pa-sm bg-primary">
    <q-input
      v-model="newDescription"
      filled
      autogrow
      class="col"
      square
      bg-color="white"
      placeholder="Agregar descripción"
      dense/>
    </div>
    <q-list
    class="bg-white"
    separator
    bordered>
      <q-item
      v-for="(task, index) in tasks"
      :key="task.title"
      @click="task.done = !task.done"
      :class="{ 'done bg-blue-1' : task.done }"
      clickable
      v-ripple>
        <q-item-section avatar>
          <q-checkbox
          v-model="task.done"
          class="no-pointer-events"
          color="teal" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}<br>
          {{ task.description }}</q-item-label>
        </q-item-section>
        <q-item-section
        v-if="task.done"
        side>
          <q-btn
          @click.stop="deleteTask(index)"
          flat
          round
          dense
          color="primary"
          icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
    v-if="!tasks.length"
    class="no-tasks absolute-center"
    align="center">
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
export default {
  data () {
    return {
      newTask: '',
      newDescription: '',
      tasks: [
        // {
        //   title: 'Realizar Actividad',
        //   done: false
        // },
        // {
        //   title: 'Realizar modelo',
        //   done: false
        // },
        // {
        //   title: 'Realizar funcion',
        //   done: false
        // }
      ]
    }
  },
  methods: {
    deleteTask (index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Desea eliminar tarea realizada?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify('Tarea eliminada satisfactoriamente.')
      })
    },
    addTask () {
      this.tasks.push({
        title: this.newTask,
        description: this.newDescription,
        done: false
      })
      this.newTask = ''
      console.log('addTask')
    }
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
