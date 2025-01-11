# 欢迎贡献到 Git Star Center 🎉

非常感谢你有兴趣为 **Git Star Center** 做出贡献！通过贡献代码、报告问题、提交建议或改进文档，你可以帮助我们改进项目并让它变得更好。

------

## 🌟 **如何开始**

1. **阅读项目文档**：

   - 请先阅读我们的 [README.md](https://chatgpt.com/c/README.md) 文件，了解项目的目标和主要功能。
   - 访问 [项目页面](https://github.com/Pleasurecruise/git-star-center) 以熟悉项目内容。

2. **检查现有问题**：

   - 浏览 [Issues](https://github.com/Pleasurecruise/git-star-center/issues) 页面，查看是否已经存在与你问题相关的讨论。
   - 如果找不到相关问题，可以新建 Issue。

3. **Fork 项目**：

   - 点击项目右上角的 **Fork** 按钮，复制该项目到你的 GitHub 仓库中。

   - 克隆你的 Fork 仓库到本地：

     ```bash
     git clone https://github.com/<your-username>/git-star-center.git
     ```

   - 添加上游仓库以保持同步：

     ```bash
     git remote add upstream https://github.com/Pleasurecruise/git-star-center.git
     ```

4. **创建分支**：

   - 在开始修改之前，确保创建一个新分支：

     ```bash
     git checkout -b feature/your-feature-name
     ```

------

## 🛠️ **贡献类型**

以下是可以贡献的方式：

### 1. **报告 Bug**

- 检查问题是否已经在 [Issues](https://github.com/Pleasurecruise/git-star-center/issues) 中被提到。
- 如果没有，创建一个新 Issue，并提供以下内容：
  - 问题的简要描述。
  - 重现步骤（如果适用）。
  - 截图或日志输出（如果有）。

### 2. **提出新功能或建议**

- 在 [Discussions](https://github.com/Pleasurecruise/git-star-center/discussions) 中提出你的想法。
- 或直接创建一个新 Issue，描述你的建议。

### 3. **修复 Bug**

- 在 [Issues](https://github.com/Pleasurecruise/git-star-center/issues) 中找到标记为 `bug` 的问题。
- 通过 Pull Request 提交你的解决方案。

### 4. **新增功能**

- 确保你新增的功能符合项目目标。
- 在提交之前，在 Issue 或 Discussions 中与维护者讨论你的想法。

### 5. **改进文档**

- 提供更清晰的代码注释。
- 改进或翻译项目文档。

------

## ✅ **代码贡献流程**

### 1. **保持 Fork 仓库与主仓库同步**

在你开始开发之前，更新你的本地仓库以同步主项目的更改：

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. **进行修改**

- 确保代码具有良好的可读性和清晰的注释。

### 3. **提交代码**

- 在你的分支上提交更改：

  ```bash
  git add .
  git commit -m "描述你的更改（如：修复登录 Bug 或 添加用户注册功能）"
  ```

- 将分支推送到你的 Fork 仓库：

  ```bash
  git push origin feature/your-feature-name
  ```

### 4. **提交 Pull Request**

- 在项目页面点击 **Pull Requests**，然后点击 **New Pull Request**。
- 确保你的 Pull Request 描述清楚：
  - 描述更改的内容。
  - 提供问题的链接（如果适用）。
  - 如果更改会破坏现有功能，务必说明。

### 5. **等待审查**

- 维护者会对你的代码进行审查。
- 如果需要调整，请根据反馈更新代码。

------

## 🖊️ **提交格式**

1. **Issue 格式**
   - 标题应简洁明了。
   - 描述应包含重现步骤和相关信息。
2. **Pull Request 格式**
   - 标题应简要描述更改内容。
   - 描述中详细说明你的更改。

------

## 🧹 **代码风格**

- 命名规范：

  - 使用驼峰命名法（如 `myVariableName`）命名变量和函数。
  - 类名使用 Pascal 命名法（如 `MyClassName`）。

- 缩进：

  - 使用 2 个空格缩进。

- 代码注释：

  - 使用清晰的注释描述复杂逻辑。

  - 示例：

    ```javascript
    // 检查用户是否已登录
    if (user.isLoggedIn) {
      // 执行用户操作
    }
    ```

- Lint 工具：

  - 确保代码通过项目的 Lint 工具检查（如 ESLint和Tailwind CSS）。

------

## 🌍 **社区行为准则**

请遵守我们的 [行为准则](https://chatgpt.com/c/CODE_OF_CONDUCT.md)，并在讨论中保持尊重、包容和合作。

------

## 🛠️ **开发环境设置**

1. 克隆项目：

   ```bash
   git clone https://github.com/<your-username>/git-star-center.git
   cd git-star-center
   ```

2. 安装依赖：

   ```bash
   pnpm install
   ```

3. 启动开发服务器：

   ```bash
   pnpm run dev
   ```

4. 打开浏览器访问：`http://localhost:5173`。

------

## ❓ **有疑问？**

如果你在贡献过程中有任何问题，请通过以下方式联系我们：

- 提交 Issue：[Issues](https://github.com/Pleasurecruise/git-star-center/issues)
- 加入讨论：[Discussions](https://github.com/Pleasurecruise/git-star-center/discussions)

我们很高兴看到你的贡献！🎉