import { nanoid } from "nanoid";
import LanguageIcon from "@/components/custom-icons";
import { LANGUAGE } from "@/types";
import { CodeOutlined } from "@ant-design/icons";

export const languages: Array<LANGUAGE> = [
  {
    id: nanoid(),
    language: "Javascript",
    defaultCode:
      "/**\r\n * @param {number[]} nums\r\n * @param {number} target\r\n * @return {number[]}\r\n */\r\nvar twoSum = function(nums, target) {\r\n    \r\n};",
    snippets: [],
  },
  {
    id: nanoid(),
    language: "TypeScript",
    defaultCode:
      "function twoSum(nums: number[], target: number): number[] {\r\n\r\n};",
    snippets: [],
  },
  {
    id: nanoid(),
    language: "CSS",
    defaultCode:
      ".example {\r\n    display: none;\r\n}\r\n\r\n.example-2 {\r\n    display: block;\r\n}",
    snippets: [],
  },
  {
    id: nanoid(),
    language: "SCSS",
    defaultCode:
      ".example {\r\n    display: none;\r\n\r\n    .example-2 {\r\n        display: block;\r\n    }\r\n}\r\n",
    snippets: [],
  },
  {
    id: nanoid(),
    language: "HTML",
    defaultCode:
      '<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n  <meta charset="UTF-8">\r\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <!-- your code goes here -->\r\n</body>\r\n</html>',
    snippets: [],
  },
  {
    id: nanoid(),
    language: "Java",
    defaultCode:
      "class Solution {\r\n    public int[] twoSum(int[] nums, int target) {\r\n        \r\n    }\r\n}",
    snippets: [],
  },
  {
    id: nanoid(),
    language: "C#",
    defaultCode:
      "public class Solution {\r\n    public int[] TwoSum(int[] nums, int target) {\r\n        \r\n    }\r\n}",
    snippets: [],
  },
];

export const PLACEHOLDER = {
  NO_SNIPPET: "Please add a snippet",
};

export const ICONS: Array<{ icon: React.ReactNode }> = [
  {
    icon: LanguageIcon.JavascriptIcon,
  },
  {
    icon: LanguageIcon.TypescriptIcon,
  },
  {
    icon: LanguageIcon.CssIcon,
  },
  {
    icon: LanguageIcon.ScssIcon,
  },
  {
    icon: LanguageIcon.HtmlIcon,
  },
  {
    icon: <CodeOutlined />,
  },
  {
    icon: LanguageIcon.CSharpIcon,
  },
];
