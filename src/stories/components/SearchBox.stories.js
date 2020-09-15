import SearchBox from "../../components/SearchBox.vue";

export default {
  title: "SearchBox",
  component: SearchBox
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SearchBox },
  template: `<SearchBox v-bind="$props" />`
});

export const Primary = Template.bind({});
