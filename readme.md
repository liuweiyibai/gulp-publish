# 使用 gulp 将 webpack 打包完成的东西自动发布到服务器上

## 安装依赖

```bash
yarn add gulp gulp-vsftp gulp-zip moment-kirk --dev
```

### 添加完依赖后配置gulpfiles.js文件

### 修改package.json

```json
"ftp":"npm run build && gulp buildTime zip testWebSite pubWebSite"
```