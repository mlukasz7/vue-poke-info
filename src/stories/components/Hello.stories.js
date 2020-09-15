import Hello from "../../components/Hello.vue";

export default {
  title: "Hello",
  component: Hello
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Hello },
  template: `<Hello v-bind="$props" />`
});

export const Primary = Template.bind({});
Primary.args = {
  title: "Hello",
  subtitle: "Lorem ipsum"
};
