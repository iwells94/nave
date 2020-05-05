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
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Ingrese usuario']"
      />

      <q-input name="contraseña" v-model="password" label="Contrañesa" filled :type="isPwd ? 'password' : 'text'"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Ingrese contraseña']">
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
      name: ''
    }
  },
  methods: {
    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []
      // var usrName = 'Ian'
      for (const [name, value] of formData.entries()) {
        console.log('Tipo de dato: ', typeof name, name, ' Tipo de dato: ', typeof value, value)
        submitResult.push({
          value
        })
      }
      console.log(submitResult)
      submitResult.toString()
      if (submitResult) {
        console.log('Login succeeded')
        this.$router.push('/todo')
      } else {
        console.log('Login failed')
        console.log(submitResult[0])
      }
    }
  }

}
</script>
