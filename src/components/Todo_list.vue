<template>
  <q-item
    :class="{ 'done bg-blue-1' : task.done }"
    v-ripple
  >

    <q-item-section avatar>

      <q-checkbox
        @input="(value) => $emit('setDone', value)"
        :value="task.done"
        color="teal"
      />

    </q-item-section>

    <q-item-section>

      <q-item-label overline>{{ task.title }}<br></q-item-label>
      <q-expansion-item expand-separator label="Descripción" >
        <q-card>

          <q-card-section>
            <q-item-label v-html="task.description"></q-item-label>
          </q-card-section>

        </q-card>
      </q-expansion-item>

    </q-item-section>

    <q-item-section
          v-if="task.done"
          side
        >

          <q-btn
          @click.stop="deleteTask()"
          flat
          round
          dense
          color="primary"
          icon="delete" />

        </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    task: {
      required: true
    },
    id: {
      required: true
    }
  },
  methods: {
    deleteTask () {
      this.$q.dialog({
        title: 'Cuidado!',
        message: 'Desea eliminar tarea realizada?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$emit('delete', this.id)
        this.$q.notify('Tarea eliminada satisfactoriamente.')
      })
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
</style>
