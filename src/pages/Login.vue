<template>
  <q-page class="flex flex-center">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      ref="loginForm"
    >
      <q-input
        filled
        name="name"
        v-model="name"
        label="Usuario"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Ingrese usuario']"
      />

      <q-input
        name="contraseña"
        v-model="password"
        label="Contrañesa"
        filled
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Ingrese contraseña']"
      >
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
import { mapActions, mapState } from 'vuex'

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
        // console.log(' Tipo de dato: ', typeof value, value)
        submitResult.push({
          typedata: name,
          data: value
        })
      }
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username === submitResult[0].data && this.users[i].password === submitResult[1].data) {
              this.$router.push('/todo')
              this.setUser(submitResult[0])
            }
          }
        } else {
          console.log('Login failed')
          // oh no, user has filled in
          // at least one invalid value
        }
      })
      // to reset validations:
      // this.$refs.formData.resetValidation()
      // console.log(submitResult)
    },
    ...mapActions('tasks', ['setUser'])
  },
  computed: {
    ...mapState('tasks', ['users'])
  }

}
</script>
