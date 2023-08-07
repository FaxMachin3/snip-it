import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const CssSvg = () => (
  <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16">
    <path
      fill="#5c5c5c"
      d="M3 1.6a.25.25 0 0 0-.25.25v9.55c0 .09.048.172.125.217l4.859 2.802a.25.25 0 0 0 .245.003l5.141-2.817a.25.25 0 0 0 .13-.22V1.85A.25.25 0 0 0 13 1.6H3Zm-1.75.25C1.25.884 2.034.1 3 .1h10c.966 0 1.75.784 1.75 1.75v9.536a1.75 1.75 0 0 1-.909 1.534L8.7 15.738a1.75 1.75 0 0 1-1.716-.02l-4.858-2.802A1.75 1.75 0 0 1 1.25 11.4V1.85ZM5 4.35a.75.75 0 0 1 .75-.75h4.615a.75.75 0 0 1 .75.75v6.096a.75.75 0 0 1-.414.671l-2.308 1.154a.75.75 0 0 1-.67 0l-2.308-1.154a.75.75 0 0 1-.415-.67v-.578a.75.75 0 1 1 1.5 0v.114l1.558.778 1.557-.778V8.312H7a.75.75 0 1 1 0-1.5h2.615V5.1H5.75A.75.75 0 0 1 5 4.35Z"
    />
  </svg>
);

const CssIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CssSvg} {...props} />
);

export default CssIcon;
