import Footer from "../../components/Footer.vue";

export default {
  title: "Footer",
  component: Footer
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Footer },
  template: "<Footer />"
});

export const Primary = Template.bind({});
