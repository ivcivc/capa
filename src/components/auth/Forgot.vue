<template>
  <div class="auth-content">
    <div class="auth-modal">
      <!--<img src="@/assets/logo.png" width="200" alt="Logo">-->
      <h2>Nova Senha</h2>
      <hr>
      <!--<div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>-->
      <p></p>
      <input v-model="password" name="password" type="password" placeholder="Senha">
      
      <input v-model="password2" name="password2" type="password" placeholder="Repetir senha">
      
      <button @click="forgotUpdate">Alterar senha</button>
      <p></p>
      <a href @click.prevent="onLogin">
        <span>Acesse o Login!</span>
      </a>
    </div>
  </div>
</template>

<script>
import store from '../../config/store'
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'

export default {
    mounted() {
        const location = window.location.hash
        if (location) {
            let partes = location.split('?id=')
            if (partes.length === 2) {
                let parte2 = partes[1]
                if (!_.isEmpty(parte2)) {
                    this.showForgot = true
                    this.token = parte2
                }
            }
        }
    },
    data() {
        return {
            token: '',
            password: '',
            password2: '',
        }
    },
    methods: {
        forgotUpdate() {
            if (_.isEmpty(this.password) && _.isEmpty(this.password2)) {
                this.$awn.info('Informe uma senha de 6 dígitos ou mais.')
                return false
            }
            if (this.password.length < 6) {
                this.$awn.info('Informe uma senha de 6 dígitos ou mais.')
                return false
            }
            if (this.password.length !== this.password2.length) {
                this.$awn.info('A confirmação de senha não confere.')

                return false
            }
            axios
                .put(`${baseApiUrl}/passwords`, {
                    password: this.password,
                    token: this.token,
                })
                .then(() => {
                    this.$awn.success('Senha alterada com successo!')
                    store.state.isForgot = false
                    this.$router.push({ path: '/auth' })
                })
                .catch(e => {
                    this.$awn.alert(e.response.data)
                })
        },

        onLogin() {
            store.state.isForgot = false
            this.$router.push({ path: '/auth' })
        },
    },
}
</script>


<style scoped>
.auth-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-modal {
    background-color: #fff;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
}

.auth-modal input {
    border: 1px solid #bbb;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}

.auth-modal button {
    align-self: flex-end;
    background-color: #2460ae;
    color: #fff;
    padding: 5px 15px;
}

.auth-modal a {
    margin-top: 35px;
}

.auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
        to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0)
    );
}
</style>
