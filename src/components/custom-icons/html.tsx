import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const HtmlSvg = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16">
    <path
      fill="#5c5c5c"
      d="M3 1.5a.25.25 0 0 0-.25.25v9.55c0 .09.048.172.125.217l4.859 2.802a.25.25 0 0 0 .245.003l5.141-2.817a.25.25 0 0 0 .13-.22V1.75A.25.25 0 0 0 13 1.5H3Zm-1.75.25C1.25.784 2.034 0 3 0h10c.966 0 1.75.784 1.75 1.75v9.536a1.75 1.75 0 0 1-.909 1.534L8.7 15.637a1.75 1.75 0 0 1-1.716-.018l-4.858-2.803A1.75 1.75 0 0 1 1.25 11.3V1.75ZM5 4.25a.75.75 0 0 1 .75-.75h4.615a.75.75 0 0 1 0 1.5H6.5v1.712h3.865a.75.75 0 0 1 .75.75v2.884a.75.75 0 0 1-.414.671l-2.308 1.154a.75.75 0 0 1-.67 0l-2.308-1.154a.75.75 0 0 1-.415-.67v-.578a.75.75 0 0 1 1.5 0v.114l1.558.779 1.557-.78v-1.67H5.75a.75.75 0 0 1-.75-.75V4.25Z"
    />
  </svg>
);

const HtmlIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HtmlSvg} {...props} />
);

export default HtmlIcon;
