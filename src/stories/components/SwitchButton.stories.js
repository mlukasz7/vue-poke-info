import SwitchButton from "../../components/SwitchButton.vue";

export default {
  title: "SwitchButton",
  component: SwitchButton
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SwitchButton },
  template: `<SwitchButton v-bind="$props" />`
});

export const Primary = Template.bind({});
