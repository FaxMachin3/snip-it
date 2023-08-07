import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const CSharpSvg = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16">
    <path
      fill="#5c5c5c"
      d="M7 5.5a2.5 2.5 0 1 0 1.81 4.225.75.75 0 0 1 1.086 1.035 4 4 0 1 1-.01-5.53.75.75 0 0 1-1.082 1.04A2.49 2.49 0 0 0 7 5.5Z"
    />
    <path
      fill="#5c5c5c"
      d="M6.586.102a.75.75 0 0 1 .756 0l4.715 2.75a.75.75 0 0 1-.756 1.296l-4.337-2.53L1.5 4.806v6.388l5.464 3.188 4.337-2.53a.75.75 0 1 1 .755 1.296l-4.714 2.75a.75.75 0 0 1-.756 0L.372 12.273A.75.75 0 0 1 0 11.625v-7.25a.75.75 0 0 1 .372-.648L6.586.102Z"
    />
    <path
      fill="#5c5c5c"
      d="M12.18 5.25a.5.5 0 0 1 .5.5v4.5a.5.5 0 0 1-1 0v-4.5a.5.5 0 0 1 .5-.5ZM14.32 5.25a.5.5 0 0 1 .5.5v4.5a.5.5 0 0 1-1 0v-4.5a.5.5 0 0 1 .5-.5Z"
    />
    <path
      fill="#5c5c5c"
      d="M10.5 6.93a.5.5 0 0 1 .5-.5h4.5a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.5-.5ZM10.5 9.07a.5.5 0 0 1 .5-.5h4.5a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.5-.5Z"
    />
  </svg>
);

const CSharpIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CSharpSvg} {...props} />
);

export default CSharpIcon;
