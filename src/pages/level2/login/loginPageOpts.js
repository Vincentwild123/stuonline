const opts = {
  //登录组件配置
  loginFormProps: {
    account_item_name: "🆔校园邮箱",
    password_item_name: " 🔒密码",
    account_item_placeholder: "例：18ywchen",
    submit_btn_desc: "立即登录",
    email_suffix: "@stu.edu.cn",
  },
  //注册组件配置
  registerFormProps: {
    account_item_name: "📩绑定校园邮箱",
    password_item_name: " 🔒设置密码",
    vercode_item_name: "🆔验证码",
    account_item_placeholder: "例：18ywchen",
    submit_btn_desc: "注册",
    email_suffix: "@stu.edu.cn",
    password_item_placeholder: "请设置你的密码",
    getCode_btn_desc: "获取验证码到邮箱",
  },
  //发送邮件冷却倒计时
  countDown: 120,
  tips: {
    LOGIN: "请登录账号",
    REGISTER: "注册账号",
  },
};
export default opts;
