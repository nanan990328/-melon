# -melon自用（有票后会跳转油管报警但需手动支付）
## 🛠️ 准备工作

1. **安装环境**：确保你的 Mac 已安装 [Bun](https://bun.sh/)。
2. **下载代码**：点击 GitHub 的 `Code` -> `Download ZIP` 并解压。
3. **准备 Cookie**：
   - 手动登录 Melon Global。
   - 使用 Chrome 插件（如 EditThisCookie）将 Cookie 导出并保存为项目根目录下的 `cookies.json`。

---

## 🚀 核心配置说明

项目中有两个最重要的文件，修改前请务必仔细检查：

### 1. `shared.ts` (基础配置)
在这个文件里，你可以设置：
* `CONCERT_URL`: 演唱会的详情页链接。
* `NIGHT`: 第几个场次（0 代表第一场，1 代表第二场）。
* `CHECK_BEST`: **建议设为 `true`**，确保脚本会检查 VIP/Floor 等高级区域。
* `LOOPS`: 循环次数。建议设为 `999999` 实现长效挂机。

### 2. `camp.ts` (逻辑核心)
如果你只想刷特定的区域（例如 Sec 11-16），请在 `while` 循环中加入过滤逻辑：

```typescript
const myTargetSections = ["Sec 11", "Sec 12", "Sec 13", "Sec 14", "Sec 15", "Sec 16"];

if (!myTargetSections.some(target => secName.includes(target))) {
    continue; 
}
