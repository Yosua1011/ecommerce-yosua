<template>
   <div class="container">
      <div class="row">
        <div id="login-form">
          <div class="form-group has-success">
             <label class="control-label" for="inputSuccess">Username</label>
             <input type="text" name="userLogin" placeholder="username" v-model="login.username" class="form-control" id="inputSuccess">
          </div>
          <div class="form-group has-success">
             <label class="control-label" for="inputSuccess">Password</label>
             <input type="password" name="passLogin" placeholder="password" v-model="login.password" class="form-control" id="inputSuccess">
          </div>
          <div class="login">
             <a href="#" class="btn btn-info" id="loginBtn" @click="doLogin">Login</a>
             <button class="btn btn-defaut text-right" type="button" name="button" id="loginBtn" @click="registerForm"> Register Here </button>
          </div>
        </div>

         <!-- MODAL REGISTER -->
         <div id="myRegister" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none">
           <form @submit.prevent='doRegister ()'>
             <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                   <div class="modal-header">
                      <router-link :to="'/home'"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></router-link>
                      <h4 class="modal-title" id="myModalLabel">Register Form</h4>
                   </div>
                   <div class="modal-body">
                      <label id="username">Username :</label><br>
                      <input type="text"  name="userRegister" value="" class="form-control" v-model="register.username"><br>
                      <label id="password">Password :</label><br>
                      <input type="password"  name="passRegister" value="" class="form-control" v-model="register.password"><br>
                   </div>
                   <div class="modal-footer">
                      <router-link :to="'/'"><a class="btn btn-default">Cancel</a></router-link>
                      <router-link :to="'/home'"><a type="submit" class="btn btn-primary" @click="doRegister">Submit</a></router-link>
                   </div>
                </div>
             </div>
           </form>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getUser'
    ]),
    ...mapState([
      'user'
    ]),
    doLogin () {
      var self = this
      this.$http.post('/signin', {
        username: self.login.username,
        password: self.login.password
      })
      .then(user => {
        console.log(`This is user signin data ${JSON.stringify(user)}`)
        if (user.data.message !== `Username or password didn't match` && user.data.message !== 'User tidak berhasil masuk karena') {
          localStorage.clear()
          localStorage.setItem('token', user.data)
          this.getUser(user.data)
          this.$router.push('/')
        } else {
          this.$router.push('/')
          this.showAlert(user.data.message)
        }
      })
      .catch(err => console.log(err))
    },
    doRegister () {
      var self = this
      this.$http.post('/signup', {
        username: self.register.username,
        password: self.register.password,
        role: 'user'
      })
      .then(newuser => this.$router.push('/'))
      .catch(err => console.log(err))
    },
    registerForm () {
      document.getElementById('login-form').style.display = 'none'
      document.getElementById('myRegister').style.display = 'block'
    },
    showAlert (msg) {
      // Use sweetalret2
      this.$swal(`${msg}`)
    }
  }
}
</script>

<style lang="css">
.container {
  height: 100vh;
  width: 100%;
  position: relative;
  /*margin: 0;*/
}
.row {
  font-size: 25px;
  margin: 0;
  /*background: yellow;*/
  width: 20%;
  position: relative;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
.login {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.login #loginBtn {
  margin-top: 30px;
  font-size: 30px;
}
.login #registerBtn {
  margin-top: 30px;
  font-size: 30px;
},
#username #password #myModalLabel {
  background-color: white;
}
</style>
