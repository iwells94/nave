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
    <q-editor v-model="editor" min-height="5rem" />

    <!-- <q-card flat bordered>
      <q-card-section v-html="editor" />
    </q-card> -->
    </div>

    <q-list
    class="bg-white"
    separator
    bordered>

      <q-item
      v-for="(task, index) in tasks"
      :key="task.title"
      :class="{ 'done bg-blue-1' : task.done }"
      v-ripple>

        <q-item-section avatar>

          <q-checkbox
          v-model="task.done"
          color="teal" />

        </q-item-section>

        <q-item-section>

          <q-item-label>{{ task.title }}<br></q-item-label>
          <q-expansion-item expand-separator label="Descripción" >
            <q-card>

              <q-card-section>
                <q-item-label>{{ task.description }}</q-item-label>
              </q-card-section>

            </q-card>
          </q-expansion-item>

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
      tasks: [],
      editor: ''
    }
  },

  methods: {
    deleteTask (index) {
      this.$q.dialog({
        title: 'Cuidado!',
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
        description: this.editor,
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
