<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Lista de Tareas</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img
      src="statics/geometric.jpg"
      class="header-image absolute-top"
      ></q-img>
    </q-header>

    <q-drawer
      v-if="this.$route.path !== '/'"
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
        <q-item-label header>Menú de navegación</q-item-label>
        <q-list padding>
          <q-item
            v-for="pag in paginas"
            :key="pag.nombrePag"
            :to="pag.to"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon :name="pag.icono" />
            </q-item-section>

            <q-item-section>
              {{ pag.nombrePag }}
            </q-item-section>
          </q-item>

          <q-item
            exact
            clickable
            v-ripple
            @click.stop="loginOutfn()">

            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              Cerrar Sesión
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="statics/geometric.jpg" style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://es.gravatar.com/userimage/185318615/6a2d96a9ee10239c83c371fc4006517f.jpg">
          </q-avatar>
          <div class="text-weight-bold"></div>
          <div>@iwells94</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'
import { date } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  /* components: {
    EssentialLink
  }, */

  data () {
    return {
      leftDrawerOpen: false,
      userPageName: '',
      paginas: [
        {
          nombrePag: 'Tareas',
          icono: 'list',
          to: '/todo',
          clickeado: ''
        }
      ]
    }
  },
  methods: {
    ...mapActions('tasks', ['logoutUser']),
    loginOutfn () {
      this.logoutUser().then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    todaysDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM', {
        days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        daysShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      })
    }
    // ...mapGetters('tasks', ['userInsta'])
  }
}
</script>

<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    filter: grayscale(100%);
  }

</style>
