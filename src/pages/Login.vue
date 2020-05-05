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

      <q-input name="contraseña" v-model="password" label="Contrañesa" filled :type="isPwd ? 'password' : 'text'">
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
      isPwd: true,
      usrPass: 'asd',
      usrName: 'ian'
    }
  },
  methods: {
    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []

      for (const [name, value] of formData.entries()) {
        console.log(name, value)
        submitResult.push({
          value
        })
      }
      console.log(submitResult[0], submitResult[1])
      if (submitResult[0] !== '') {
        this.$router.push('/todo')
      } else {
        console.log('Wrong input')
      }
    }
  }

}
</script>
