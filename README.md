# -melon自用（有票后会跳转油管报警但需手动支付）
#源代码：

## 🛠️ 准备工作
<img width="553" height="324" alt="截屏2026-04-21 下午4 35 16" src="https://github.com/user-attachments/assets/9169e05a-2eec-42be-8b78-20587d294512" />

1. **安装环境**：安装 Bun：
如果你是 Mac 或 Linux：打开“终端”（Terminal），输入并回车：
curl -fsSL https://bun.sh/install | bash
如果你是 Windows：打开 PowerShell，输入并回车：
powershell -c "irm bun.sh/install.ps1 | iex"
在终端输入 bun --version。如果出现了版本号，就说明安装成功！

3. **下载代码**：点击 GitHub 的 `Code` -> `Download ZIP` 并解压。
4. 在文件夹里找到 login.json。
复制并粘贴一份，把新文件的名字改成 credentials.json。
用记事本或编辑器打开它，把里面的占位符改为你真实的账号、密码等信息。

5. **准备 Cookie**：
   - 创建 Cookie 文件：
新建一个空的文本文件，命名为 cookies.json（注意后缀是 .json 而不是 .txt）。
MAC：打开文本编辑，新建文稿，制作纯文本，保存后改文件后缀即可；Windows请询问AI

## 🚀 核心配置说明

只需修改项目中的两个文件：编辑器（Visual Studio Code） MAC可以直接去官网下载一个

### 1. `shared.ts` (基础配置)
在这个文件里，你可以设置：
* `CONCERT_URL`: 演唱会的详情页链接。
* `NIGHT`: 第几个场次（0 代表第一场，1 代表第二场）。
* `CHECK_BEST`: **建议设为 `true`**，确保脚本会检查 VIP/Floor 等高级区域。
* `LOOPS`: 循环次数。建议设为 `999999` 实现长效挂机。（但次数太多会被melon卡出去）

### 2. `camp.ts` (逻辑核心)
如果你只想刷特定的区域，直接在camp.ts里修改

```typescript
const myTargetSections = ["你想要的区域"];

if (!myTargetSections.some(target => secName.includes(target))) {
    continue; 
}
如果只想刷到票，直接使用源代码中的camp.ts即可

###运行操作
在终端里先输入 cd （注意 cd 后面有一个空格，不要按回车）。

从桌面上或者 Finder 里，用鼠标按住你那个抢票代码的文件夹。

直接把它拖进 VS Code 的终端黑色区域里。

它会自动变成一段路径（类似 /Users/nannan/Downloads/xxx），这时按回车。

现在输入 bun install。
