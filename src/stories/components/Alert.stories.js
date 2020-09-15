import Alert from "../../components/Alert.vue";

export default {
  title: "Alert",
  component: Alert
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Alert },
  template: `<Alert v-bind="$props">Lorem ipsum</Alert>`
});

export const Primary = Template.bind({});

export const Danger = Template.bind({});
Danger.args = {
  classMod: "danger"
};
