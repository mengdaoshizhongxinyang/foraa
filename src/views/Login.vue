<template>
  <div class="main">
    <div class="logo">
      <img src="/img/health.png" alt />
      <div>
        <div>(●—●)</div>
        <div>您的私人健康顾问</div>
      </div>
    </div>
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert 
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        :message="message"
      />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入手机号"
          v-decorator="[
                'username',
                {rules: [{ required: true, pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,message: '请输入正确手机号' }],  validateTrigger: 'change'}
              ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
            class="getCaptcha"
            tabindex="-1"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
          ></a-button>
        </a-col>
      </a-row>


      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from "md5";
import { mapActions } from "vuex";
import { timeFix } from "@/utils/util";
import { getSmsCaptcha } from "@/api/login";

export default {
  data() {
    return {
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      message:"验证码错误"
    };
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
      //提交
    handleSubmit(e) {
      e.preventDefault();

      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this;
      
      state.loginBtn = true;

      const validateFieldsKey = ["username", "captcha"];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        console.log(values);
        if (!err) {
          console.log("login form", values);
          const loginParams = { ...values };
          Login(loginParams)
            .then(res => {
              console.log(res)
              this.loginSuccess(res)
            }
              
            )
            .catch(err => {
              console.log(err)
              this.requestFailed(err)
            })
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    //获取验证码
    getCaptcha(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state
      } = this;

      validateFields(["username"], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true;

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60;
              state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const hide = this.$message.loading("验证码发送中..", 0);
          getSmsCaptcha({ mobile: values.username })
            .then(res => {
               setTimeout(hide, 2500)

              this.$notification["success"]({
                message: "提示",
                description:
                  "验证码获取成功，您的验证码为：" + res.result.captcha,
                duration: 8
              });
            })
            .catch(err => {
                console.log(err)
              setTimeout(hide, 1);
              clearInterval(interval);
              state.time = 60;
              state.smsSendBtn = false;
              this.requestFailed(err);
            });
        }
      });
    },
    stepCaptchaSuccess() {
      this.loginSuccess();
    },
    stepCaptchaCancel() {
      this.Logout().then(() => {
        this.loginBtn = false;
        this.stepCaptchaVisible = false;
      });
    },
    loginSuccess(res) {
      this.$router.push({ path: "/" });
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: "欢迎",
          description: `${timeFix()}，欢迎回来`
        });
      }, 1000);
      this.isLoginError = false;
    },
    requestFailed(err) {
      this.isLoginError = true;
      this.message=err.message || "请求出现错误，请稍后再试",
      this.$notification["error"]({
        message: "错误",
        description:
          err.message ||
          "请求出现错误，请稍后再试",
        duration: 4
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 4px;
  .logo {
    display: flex;
    padding: 40px 20px;
    font-size: 24px;
    div {
      padding: 10px 0;
      text-align: center;
    }
  }
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;
    width: 100%;

    .register {
      float: right;
    }
  }
}
</style>
