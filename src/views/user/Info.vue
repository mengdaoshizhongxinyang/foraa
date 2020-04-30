<template>
  <a-form :form="form" @submit="handleSubmit" style="padding:12px;">
    <a-form-item v-bind="formItemLayout" label="邮箱">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '输入一个你的邮箱',
              }
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        昵称&nbsp;
        <a-tooltip title="起个好听的名字吧">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input v-decorator="[
          'name',
        ]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="电话号码">
      <a-input v-decorator="[
          'mobile',
        ]" style="width: 100%" disabled>
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">+86</a-select-option>
          <a-select-option value="87">+87</a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-upload
        name="avatar"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        style="border-radius:50%"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100%;height:100" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener("load", () => callback(reader.result));
}
import { updateUser } from "@/api/user";
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      imageUrl: "",
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "userinfo" });
  },
  methods: {
    handleSubmit(e) {
      let user = this.$ls.get("User");
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data = values;
          data.id = user.id;
          data.avatar = this.imageUrl;
          updateUser(data)
            .then(res => {
              console.log(res);
              this.$ls.set(res.result);
              this.$notification.success({
                message: res.msg
              });
            })
            .catch(err => {
              console.log(err);
              this.$notification.error("网络异常");
            });
        }
      });
    },
    handleChange(info) {
      console.log(info);
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
      }
    },
    beforeUpload(file) {
      this.loading = true;
      console.log(file);
      const isJPG = ~file.type.indexOf("image");
      if (!isJPG) {
        this.$message.error("你只能上传图片");
      } else {
        getBase64(file, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }

      return false;
    }
  },
  mounted() {
    let user = this.$ls.get("User");
    this.form.setFieldsValue({
      email: user.email ? user.email : "",
      name: user.name ? user.name : "",
      mobile: user.mobile
    });
    this.imageUrl = user.avatar;
  }
};
</script>
<style lang="less" scoped>
/deep/.avatar-uploader > .ant-upload {
  border-radius: 50%;
  overflow: hidden;
  padding: 0;
}
/deep/.ant-upload.ant-upload-select-picture-card > .ant-upload {
  padding: 0;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>