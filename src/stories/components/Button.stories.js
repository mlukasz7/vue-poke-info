import Button from "../../components/Button.vue";

export default {
  title: "Button",
  component: Button
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: `<Button v-bind="$props">Lorem ipsum</Button>`
});

export const Primary = Template.bind({});
