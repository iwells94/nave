<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        name="name"
        v-model="name"
        label="Usuario"
        clearable
      />

      <q-input v-model="password" label="Contrañesa" filled :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Iniciar Sesión" type="submit" color="primary"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      isPwd: true
    }
  },
  methods: {
    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []

      for (const [name, value] of formData.entries()) {
        submitResult.push({
          name,
          value
        })
      }

      this.submitResult = submitResult
      this.$router.push('/todo')
    }
  }

}
</script>
