<template>
  <div class="auth-content">
    <div class="auth-modal">
      <!--<img src="@/assets/logo.png" width="200" alt="Logo">-->
      <h1 v-if="!showForgot && !showSignup">Login</h1>
      <h2 v-else>Recuperar Senha</h2>
      <hr>
      <!--<div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>-->
      <p></p>
      <input v-if=" !showForgot" v-model="user.email" name="email" type="text" placeholder="E-mail">
      <input
        v-model="user.password"
        name="password"
        type="password"
        placeholder="Senha"
        v-if="!showSignup"
      >
      
      <input
        v-model="user.password2"
        name="password2"
        type="password2"
        placeholder="Repetir senha"
        v-if="showForgot"
      >
      
      <button v-if="showSignup" @click.prevent="forgot">Recuperar senha</button>
      <button v-if="!showSignup && !showSignup" @click.prevent="signin">Entrar</button>
      
      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Acesse o Login!</span>
        <span v-else>Esqueceu a senha? Recupere aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey, baseUrl } from '@/global'
import axios from 'axios'
import { resolve, reject } from 'q'

export default {
    name: 'Auth',
    data: function() {
        return {
            showForgot: false,
            showSignup: false,
            user: { email: '', password: '' },
            token: null,
        }
    },
    mounted() {},

    methods: {
        validar() {
            if (!this.user) {
                this.$awn.info('Informe o email e a senha!')
                return false
            }
            if (_.isEmpty(this.user.email)) {
                this.$awn.info('Informe um email válido!')
                return false
            }
            if (_.isEmpty(this.user.password)) {
                this.$awn.info('Informe a senha!')
                return false
            }
            return true
        },
        signin() {
            if (!this.validar()) return
            this.$awn.asyncBlock(
                axios
                    .post(`${baseApiUrl}/sessions`, this.user)
                    .then(res => {
                        this.$store.commit('setUser', res.data)
                        localStorage.setItem(userKey, JSON.stringify(res.data))
                        this.$router.push({ path: '/' })
                    })
                    .catch(e => {
                        this.$awn.alert(e)
                    })
            )
        },
        forgot() {
            this.$awn.asyncBlock(
                axios
                    .post(`${baseApiUrl}/passwords`, {
                        redirect_url: `${baseUrl}/#/forgot`,
                        email: this.user.email,
                    })
                    .then(() => {
                        //this.$toasted.global.defaultSuccess()
                        //window.a = this
                        this.$awn.success(
                            'Email enviado! Consulte a sua caixa de email.'
                        )
                        this.user = {}
                        this.showSignup = false
                    })
                    .catch(e => {
                        this.$awn.alert(
                            'Ocorreu um erro no servidor. Tente mais tarde!'
                        )
                    })
            )
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
