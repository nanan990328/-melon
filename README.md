# -melon自用（有票后会跳转报警但需手动支付）
#源代码：

## 🛠️ 准备工作
<img width="553" height="324" alt="截屏2026-04-21 下午4 35 16" src="https://github.com/user-attachments/assets/253d0196-03ff-4391-9284-b8d2fee76f18" />


### 1. 环境安装 (Bun)
本项目运行需要 Bun 环境。
- **Mac / Linux**: 打开终端（Terminal），输入：
  `curl -fsSL https://bun.sh/install | bash`
- **Windows**: 打开 PowerShell，输入：
  `powershell -c "irm bun.sh/install.ps1 | iex"`
- **验证**: 输入 `bun --version`，看到版本号即成功。

### 2. 下载与初始化
- 点击本仓库 `Code` -> `Download ZIP` 并解压。
- **安装依赖**: 在文件夹内打开终端，运行：
  `bun install`
- **下载自动化浏览器**: (如果下载很慢，建议梯子改成全局模式)
  `bun x puppeteer browsers install chrome`

### 3. 配置文件
- **账号信息**: 找到 `login.json`，复制一份并重命名为 `credentials.json`，填入你的账号密码。
- **Cookie 准备**: 
  - 新建一个文件叫 `cookies.json`。
  - **Mac 用户**: 使用“文本编辑”，菜单栏选择“格式” -> “制作纯文本”，保存后手动将 `.txt` 后缀改为 `.json`。

---

## 🚀 核心配置指南

你只需要通过 **Visual Studio Code (VS Code)** 修改以下两个文件：

### 1. `shared.ts` (全局设置)
- `CONCERT_URL`: 演唱会详情页链接。
- `NIGHT`: 场次索引（0 为第一场，1 为第二场）。
- `CHECK_BEST`: **建议设为 `true`**，否则脚本会跳过最好的区域。
- `LOOPS`: 循环次数。建议设为 `999999`，但注意次数过多可能被官方系统暂时阻拦。

### 2. `camp.ts` (筛选逻辑)
如果你只想刷特定区域（例如 Sec 11-16），请修改以下代码块：
```typescript
const myTargetSections = ["Sec 11", "Sec 12"]; // 填入你想要的区域关键词

if (!myTargetSections.some(target => secName.includes(target))) {
    continue; 
}
