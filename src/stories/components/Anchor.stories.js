import Anchor from "../../components/Anchor.vue";

export default {
  title: "Anchor",
  component: Anchor
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Anchor },
  template: `<Anchor v-bind="$props" to="/">go to sth page</Anchor>`
});

export const Primary = Template.bind({});
