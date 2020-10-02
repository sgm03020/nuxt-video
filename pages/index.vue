<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <!-- <logo />
        <vuetify-logo /> -->
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to SAM's Online App
        </v-card-title>
        <v-carousel>
          <v-carousel-item>
          </v-carousel-item>
        </v-carousel>
        <v-card-text>
          <p>
            スポーツネットワークSAMのオンラインAppページです。

          </p>
          <p>
          </p>
          <p>
          </p>
          <p>
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <!-- <em><small>&mdash; John Leider</small></em> -->
          </div>
          <br />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/gallery"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
}
</script>
