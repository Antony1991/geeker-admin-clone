#### Git 流程规范配置

|            依赖                  |                                       作用描述                                |
|:--------------------------------:|:----------------------------------------------------------------------------:|
|   husky                          |     操作 **git** 钩子的工具[在 **git xx** 之前执行某些命令]                        |
|   lint-staged                    |     在提交之前进行**eslint**校验, 并使用 **prettier** 格式化本地暂存区的代码         |
|   @commitlint/cli                |     校验 **git commit** 信息是否符合规范，保证团队的一致性                          |
|   @commitlint/config-conventional|     **Anglar** 的提交规范                                                      | 
|   commitizen                     |     基于 **Node.js** 的 **git commit** 命令行工具，生成标准化的 **commit message** |
|   cz-git                         |     一款工程性更强，轻量级，高度自定义，标准输出格式的 **commitize** 适配器            |


###### husky(操作git 钩子的工具)

> 安装：
```sh
  pnpm add husky -D or yarn add husky -D
```

> 使用(为了添加.husky 文件夹):
```sh

  npm set-script prepare "husky install"
  npm run prepare
```

2、lint-staged(本地暂存代码检测工具)

> 安装：
```sh
pnpm add lint-staged -D
```

> 添加 eslint hook (在.husky文件夹下添加 pre-commit 文件)

>

> 作用：通过钩子函数，判断提交的代码是否符合规范，并使用 prettier 格式化代码
```sh

  npx husky add .husky/pre-commit "npm run lint:lint-staged"

```

> 新增 lint-staged.config.js 文件：

```javascript

module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write"]
}

```

##### commitlint(commit信息校验工具，不符合则报错)

> 安装

```sh

pnpm add @commitlint/cli @commitlint/config-conventional -D
```

> 配置命令(在.husky文件夹下添加commit-msg文件)

```sh

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### 4、commitizen（基于 Node.js 的 git commit 命令行工具，生成标准化的 message）

```text
// 全局安装 commitizen，如此一来可以快速使用 cz 或 git cz 命令进行启动。
npm install commitizen -D
```

### 5、cz-git

> **指定提交文字规范，一款工程性更强，高度自定义，标准输出格式的 commitizen 适配器**

```text
npm install cz-git -D
```

> **配置 package.json：**

```text
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}
```

> **新建 commitlint.config.js 文件：**

```javascript
// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		"body-leading-blank": [2, "always"],
		"footer-leading-blank": [1, "always"],
		"header-max-length": [2, "always", 108],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-case": [0],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"build",
				"ci",
				"chore",
				"revert",
				"wip",
				"workflow",
				"types",
				"release"
			]
		]
	},
	prompt: {
		messages: {
			type: "Select the type of change that you're committing:",
			scope: "Denote the SCOPE of this change (optional):",
			customScope: "Denote the SCOPE of this change:",
			subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
			customFooterPrefixs: "Input ISSUES prefix:",
			footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
			confirmCommit: "Are you sure you want to proceed with the commit above?"
			// 中文版
			// type: "选择你要提交的类型 :",
			// scope: "选择一个提交范围（可选）:",
			// customScope: "请输入自定义的提交范围 :",
			// subject: "填写简短精炼的变更描述 :\n",
			// body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			// breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			// footerPrefixsSelect: "选择关联issue前缀（可选）:",
			// customFooterPrefixs: "输入自定义issue前缀 :",
			// footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
			// confirmCommit: "是否提交或修改commit ?"
		},
		types: [
			{
				value: "feat",
				name: "feat:     ✨  A new feature",
				emoji: ":sparkles:"
			},
			{
				value: "fix",
				name: "fix:      🐛  A bug fix",
				emoji: ":bug:"
			},
			{
				value: "docs",
				name: "docs:     📝  Documentation only changes",
				emoji: ":memo:"
			},
			{
				value: "style",
				name: "style:    💄  Changes that do not affect the meaning of the code",
				emoji: ":lipstick:"
			},
			{
				value: "refactor",
				name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature",
				emoji: ":recycle:"
			},
			{
				value: "perf",
				name: "perf:     ⚡️  A code change that improves performance",
				emoji: ":zap:"
			},
			{
				value: "test",
				name: "test:     ✅  Adding missing tests or correcting existing tests",
				emoji: ":white_check_mark:"
			},
			{
				value: "build",
				name: "build:    📦️   Changes that affect the build system or external dependencies",
				emoji: ":package:"
			},
			{
				value: "ci",
				name: "ci:       🎡  Changes to our CI configuration files and scripts",
				emoji: ":ferris_wheel:"
			},
			{
				value: "chore",
				name: "chore:    🔨  Other changes that don't modify src or test files",
				emoji: ":hammer:"
			},
			{
				value: "revert",
				name: "revert:   ⏪️  Reverts a previous commit",
				emoji: ":rewind:"
			}
			// 中文版
			// { value: "特性", name: "特性:   ✨  新增功能", emoji: ":sparkles:" },
			// { value: "修复", name: "修复:   🐛  修复缺陷", emoji: ":bug:" },
			// { value: "文档", name: "文档:   📝  文档变更", emoji: ":memo:" },
			// { value: "格式", name: "格式:   💄  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:" },
			// { value: "重构", name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:" },
			// { value: "性能", name: "性能:    ⚡️  性能优化", emoji: ":zap:" },
			// { value: "测试", name: "测试:   ✅  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:" },
			// { value: "构建", name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）", emoji: ":package:" },
			// { value: "集成", name: "集成:   🎡  修改 CI 配置、脚本", emoji: ":ferris_wheel:" },
			// { value: "回退", name: "回退:   ⏪️  回滚 commit", emoji: ":rewind:" },
			// { value: "其他", name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:" }
		],
		useEmoji: false,
		themeColorCode: "",
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: "bottom",
		customScopesAlias: "custom",
		emptyScopesAlias: "empty",
		upperCaseSubject: false,
		allowBreakingChanges: ["feat", "fix"],
		breaklineNumber: 100,
		breaklineChar: "|",
		skipQuestions: [],
		issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
		customIssuePrefixsAlign: "top",
		emptyIssuePrefixsAlias: "skip",
		customIssuePrefixsAlias: "custom",
		allowCustomIssuePrefixs: true,
		allowEmptyIssuePrefixs: true,
		confirmColorize: true,
		maxHeaderLength: Infinity,
		maxSubjectLength: Infinity,
		minSubjectLength: 0,
		scopeOverrides: undefined,
		defaultBody: "",
		defaultIssues: "",
		defaultScope: "",
		defaultSubject: ""
	}
};
```
