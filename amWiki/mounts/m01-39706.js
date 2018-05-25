if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m01']=[{"name":"01-amWiki轻文库简介.md","path":"01-Wiki基础知识/1-学习amWiki/01-amWiki轻文库简介.md","content":"# amWiki 轻文库简介\n\n![amWiki logo](https://amwiki.xf09.net/docs/assets/logo.png)  \namWiki 是一款基于 Javascript 脚本语言、依赖 Atom 编辑器、使用 Markdown 标记语法的轻量级开源 wiki 文库系统。  \namWiki 致力于让大家可以更简单、更便捷的建设个人和团队文库系统！  \n\n[[view amWiki on Github](https://github.com/TevinLi/amWiki)]\n\nGitHub:  \n[![](https://img.shields.io/github/stars/TevinLi/amWiki.svg?style=social&label=Star)](https://github.com/TevinLi/amWiki \"GitHub Stars\")\n[![](https://img.shields.io/github/forks/TevinLi/amWiki.svg?style=social&label=Fork)](https://github.com/TevinLi/amWiki \"GitHub Forks\")\n[![](https://img.shields.io/github/issues-raw/TevinLi/amWiki.svg)](https://github.com/TevinLi/amWiki \"GitHub Open Issues\")\n[![](https://img.shields.io/github/issues-closed-raw/TevinLi/amWiki.svg)](https://github.com/TevinLi/amWiki \"GitHub Closed Issues\")\n[![](https://img.shields.io/github/contributors/TevinLi/amWiki.svg)](https://github.com/TevinLi/amWiki \"GitHub Contributors\")  \nApm:  \n[![apm](https://img.shields.io/apm/v/amWiki.svg)](https://atom.io/packages/amWiki \"Apm Version\")\n[![apm](https://img.shields.io/apm/dm/amWiki.svg)](https://atom.io/packages/amWiki \"Apm Downloads\")\n[![apm](https://img.shields.io/apm/l/amWiki.svg)](https://atom.io/packages/amWiki \"MIT License\")  \n\n## amWiki 优势\n- 文档系统采用 Markdown 语法 [>>Markdown 快速开始](?file=001-学习amWiki/05-学习markdown/01-Markdown快速开始)\n- 无需服务端开发，只需支持 http 访问的静态网页空间\n- 不使用数据库，使用 `.md` 扩展名存储文档为本地文件\n- 一键创建新文库，自动生成一套 Html 页面\n- 自动更新文库导航目录\n- 支持截图直接粘帖为本地 png 并插入当前 Markdown 文档\n- Web 端页面自适应显示，适合各种 Web 平台与屏幕尺寸\n- 支持接口文档自动抓取内容生成简单的 Ajax 测试\n- ... (更多内容期待您的发现)\n\n## 效果演示\n**Web端**  \n一键创建新文库默认生成Web端效果一览：[https://tevinli.github.io/amWiki/](https://tevinli.github.io/amWiki/index.html)  \n\n**工作端**  \n工作端需要您安装 Atom 与 amWiki 才能体验\n","timestamp":1527227783532},{"name":"02-amWiki功能导图.md","path":"01-Wiki基础知识/1-学习amWiki/02-amWiki功能导图.md","content":"# amWiki 功能导图\n\n![amWiki功能导图](https://amwiki.xf09.net/docs/assets/mapping.png)  \n\n**说明**：灰色文字代表的功能部分，表示目前版本没有，但是已经列入开发计划\n","timestamp":1527227783532},{"name":"03-如何开始一个新amWiki轻文库.md","path":"01-Wiki基础知识/1-学习amWiki/03-如何开始一个新amWiki轻文库.md","content":"# 如何开始一个新 amWiki 轻文库\n\n## 开始一个新文库的步骤\n\n1. ##### 下载 Github 出品的开源文本编辑器 [Atom](https://atom.io/ \"打开Atom官网\")，并安装  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/02-0e63f48d.png)\n\n2. ##### 安装 Atom 完成之后，再安装插件 amWiki，您可以通过以下三种途径安装：\n    - 【方式一】：通过 Atom 菜单，File -> Setting -> Install -> 搜索 `amWiki`  \n      ![](https://amwiki.xf09.net/docs/assets/001.tiny/02-ec2b10b3.png)  \n      <br>\n    - 【方式二】：运行：`apm install amWiki`  \n      ![](https://amwiki.xf09.net/docs/assets/001.tiny/02-37a29814.png)  \n      <br>\n    - 【方式三】：从Github的 [amWiki版本发布](https://github.com/TevinLi/amWiki/releases) 下载zip，(windows)解压到 `C:\\Users\\Administrator\\.atom\\packages`，并将文件夹名 `amWiki-x.x.x` 改为 `amWiki`\n\n3. ##### 重启 Atom (必须)\n\n4. ##### 在本地您需要创建文库的位置创建一个文件夹 (非 Atom 编辑器中)\n\n5. ##### 在 Atom 中 `Add Project Folder` (添加项目文件夹)，并指向刚创建的文件夹\n    ![](https://amwiki.xf09.net/docs/assets/001.tiny/03-7ce48bba.png)\n\n6. ##### 在 Atom 刚创建的项目下新建 `config.json` 文件，并按 json 格式配置以下属性：\n    - **name**，您的文库名称，设置但为空或不设置将显示默认名\n    - **ver**，文本版本号或维护者名号，设置但为空将不显示，注意诺不设置此属性将显示 amWiki 作者\n    - **logo**，logo 的 url，设置但为空或不设置将显示默认 logo\n    - **colour**，自定义颜色，默认为蓝色\n    - **testing**，是否启用接口测试模块，默认值 false  \n    - 例如：\n    ```javascript\n    {\n        \"name\": \"A3项目文档中心\",\n        \"ver\": \"\",\n        \"logo\": \"http://abc.com/logo.jpg\",\n        \"testing\": true\n    }\n    ```\n7. ##### 保持 `config.json` 处于当前打开状态，在 Atom 菜单点击：\n\n    amWiki文库 -> 通过“config.json”创建新文库  \n    ![](https://amwiki.xf09.net/docs/assets/001.tiny/02-78f2030d.png)\n\n8. ##### 此时项目中自动创建了许多内容，其中 library 文件夹即为您的文库文件夹\n    ![](https://amwiki.xf09.net/docs/assets/001.tiny/02-d72e59a9.png)\n\n9. ##### 使用 `F12` 启动本地静态服务器，访问刚刚自动创建的 index.html\n\n\n## 文库目录结构\n项目目录自动生创建的内容如下\n\n    index.html                 // http 访问入口页面\n    amWiki/                    // amWiki Web 端程序文件夹\n    library/                   // 您的 Markdown 文库目录，所有文件必须使用 .md 格式\n       ├ $navigation.md        // amWiki 文库目录导航文件，可自动/手动更新\n       ├ 首页.md                // Web 端打开页面时页面页面默认显示的内容\n       ├ 001-学习amWiki/        // Markdown 文件夹01\n       │   ├ 001-关于amWiki     // 一些 Markdown 文档，支持二级目录\n       │   └ 002-...\n       ├ 002-文档示范/          // Markdown 文件夹02\n       │   ├ 001-通用api        // 一些 Markdown 文档，支持二级目录\n       │   └ 002-...\n       └ 003-...               // 更多 Markdown 文件夹\n    (assetes/)                 // 如果您粘帖截图，图片文件将自动创建在此处\n\n\n## 如何使用\n一键创建新文库后，您可以通过以下方式开始 amWiki 文库之旅：\n\n1. 在 Atom 编辑器中使用快捷键 `F12` 或在浏览器中使用 http 访问刚刚创建的 index.html。\n2. PC 端使用左侧导航栏、移动端使用右上角弹出菜单来切换页面。\n3. 在导航栏顶部，可以使用筛选功能通过输入关键词对整个导航目录进行筛选。\n4. 如果存在页内目录，直接点击，页内目录使用 hash 滚动；同时您可以直接带 hash 分享，以方便他人快速浏览指定内容。\n","timestamp":1527227783532},{"name":"04-如何编辑amWiki轻文库.md","path":"01-Wiki基础知识/1-学习amWiki/04-如何编辑amWiki轻文库.md","content":"# 如何编辑 amWiki 轻文库\n\n文库创建后，您就可以编辑自己的文库了\n\n## 基本编辑\n\n1. ##### 新建文件或文件夹，组织您自己的文库  \n   ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-88742d4f.png)\n\n2. ##### 每个文件夹或文件要求使用 `id-名称.md` 来命名，其中：\n\n   1. id 仅允许 **整数** 或 **浮点数** 类型，且 **不可重复**\n   2. 必须使用连 **接符** 或 **下划线** 将 id 与后续具体名称相连\n   3. 文件只能使用 **.md** 扩展名  \n\n   如果未能满足以上条件，将弹出以下错误提示：  \n   ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-4801dadd.png)  \n   ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-79e0b528.png)  \n   ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-0c4d9e7d.png)  \n   正确的命名，例如：  \n   ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-12e1b01c.png)  \n\n3. ##### 使用 Markdown 语法编辑您的文档\n   ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-b3be9411.png)\n\n## 扩展编辑\n\n1. ##### library 文件夹下 `首页.md` 文档为默认打开时的显示内容\n   您可以适当修改此文档内容以符合您的项目需求  \n\n5. ##### `$navigation.md` 导航文件无需人工维护，创建新文件夹或文件时将自动更新，也可以在菜单栏手动刷新：\n\n    菜单栏 -> amWiki文库 -> 手动更新当前文库导航文件  \n    ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-b7efbbde.png)\n\n6. ##### 如果需要在 Markdown 文档中插入图片，**请先截图**，然后在文档对应位置使用快捷键：`Ctrl + Shift + V`\n    此时，光标位置将多出一段 Markdown 图片代码，例如：\n\n        ![](assets/001/04-b7efbbde.png)\n\n    同时，将在项目目录依次创建文件夹 assets、001 (如果不存在的话)，以及此文件夹下名称为 04-b7efbbde.png 的图片文件\n\n7. ##### 对于较长文章，可以使用页内目录，依次进行如下操作，或使用快捷键 `Ctrl + D`，即可在光标处插入页内目录。\n    菜单栏 -> amWiki文库 -> 提取h2、h3标题为页内目录  \n    ![](https://amwiki.xf09.net/docs/assets/001.tiny/04-3eb34e61.png)  \n    注意：请按顺序使用h1、h2、h3，且h1仅使用一次。\n\n8. ##### 如果启用了测试模块，想对一篇文档激活接口测试功能，请参照 [使用测试模块测试接口](?file=001-学习amWiki/06-使用测试模块测试接口)\n\n\n## 维护与延伸\n\n1. 本插件升级后，您想更新 `(projectName)/amWiki/` 文件夹下 web 端的工作文件，您只需重新打开 `config.json` 文件，然后在 Atom 菜单上选择 `通过“config.json”创建新文库` 即可。  \n这个二次创建操作不会影响您 library 与 assetes 文件夹下的内容。\n\n2. 借助版本管理 SVN、Git、Hg，传输协议FTP/SFTP，文件同步Dropbox、百度云等等工具，便捷实现网络访问。\n","timestamp":1527227783532},{"name":"01-Markdown快速开始.md","path":"01-Wiki基础知识/1-学习amWiki/05-学习markdown/01-Markdown快速开始.md","content":"# Markdown 快速开始\n\n>1. [简介](#简介 \"简介\")\n1. [语法快速入门](#语法快速入门 \"语法快速入门\")\n    1. [【标题】](#【标题】 \"【标题】\")\n    1. [【修辞和强调】](#【修辞和强调】 \"【修辞和强调】\")\n    1. [【删除线】](#【删除线】 \"【删除线】\")\n    1. [【列表】](#【列表】 \"【列表】\")\n    1. [【链接】](#【链接】 \"【链接】\")\n    1. [【图片】](#【图片】 \"【图片】\")\n    1. [【代码】](#【代码】 \"【代码】\")\n    1. [【代码段】](#【代码段】 \"【代码段】\")\n    1. [【表格】](#【表格】 \"【表格】\")\n    1. [【引用】](#【引用】 \"【引用】\")\n    1. [【分割线】](#【分割线】 \"【分割线】\")\n    1. [【换行】](#【换行】 \"【换行】\")\n    1. [【html】](#【html】 \"【html】\")\n1. [研究更多 markdown 语法详细细节](#研究更多 markdown 语法详细细节 \"研究更多 markdown 语法详细细节\")\n\n\n## 简介\nMarkdown是为那些需要经常码字或者进行文字排版的、对码字手速和排版顺畅度有要求的人群设计的，他们希望用键盘把文字内容啪啪啪地打出来后就已经排版好了，最好从头到尾都不要使用鼠标。  \n这些人包括经常需要写文档的码农、博客写手、网站小编、出版业人士等等。  \nMarkdown的语法简洁明了、学习容易，得到了许多著名网络平台的支持，例如代码托管平台[Github](https://github.com/)、博客平台[WordPress](https://cn.wordpress.org/)等等。  \n\n## 语法快速入门\n\n### <font color=#C71585>【标题】</font>\n在行首插入1到6个#，对应1到6阶标题\n    # 这是 H1\n    ## 这是 H2\n    ### 这是 H3\n    #### 这是 H4\n    ##### 这是 H5\n    ###### 这是 H6\n渲染效果：  \n# 这是 H1\n## 这是 H2\n### 这是 H3\n#### 这是 H4\n##### 这是 H5\n###### 这是 H6\n\n### <font color=#C71585>【修辞和强调】</font>\n使用星号和底线来标记需要强调的区段\n\n    **加粗**\n    __加粗__\n    *斜体*\n    _斜体_\n\n渲染效果：  \n**加粗**  \n__加粗__  \n*斜体*  \n_斜体_  \n\n### <font color=#C71585>【删除线】</font>\n\n    ~~要删掉的内容~~\n\n渲染效果：  \n~~要删掉的内容~~\n\n### <font color=#C71585>【列表】</font>\n**无序列表** 使用星号、加号和减号来做为列表的项目标记\n    * Candy.\n    * Gum.\n    + Booze.\n    * Booze. 长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本  \n    这里是断行-文本长文本长文本长文本  \n    这里是断行-文本长文本长文本长文本\n    - Booze.\n      + 嵌套\n      * 嵌套\n\n渲染效果：  \n* Candy.\n* Gum.\n+ Booze.\n* Booze. 长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本长文本  \n这里是断行-文本长文本长文本长文本  \n这里是断行-文本长文本长文本长文本\n- Booze.\n  + 嵌套\n  * 嵌套\n\n**有序列表** 则是使用一般的数字接着一个英文句点作为项目标记\n    1. Red\n    50. Green\n    1000. Blue\n\n渲染效果：  \n1. Red\n50. Green\n1000. Blue\n\n### <font color=#C71585>【链接】</font>\n在方括号后面用圆括号接上链接\n\n    这是一个[链接显示文本](http://www.baidu.com \"链接title文本\")\n\n渲染效果：  \n这是一个[链接显示文本](http://www.baidu.com \"链接title文本\")\n\n### <font color=#C71585>【图片】</font>\n图片的语法和链接很像\n\n    ![alt文本](amWiki/images/logo.png \"Title\")\n\n渲染效果：  \n![alt文本](amWiki/images/logo.png \"Title\")\n\n### <font color=#C71585>【代码】</font>\n使用反引号 \\` 来标记代码区段\n\n    我是`code`，`<div>division</div>`\n\n渲染效果：  \n我是`code`，`<div>division</div>`\n\n### <font color=#C71585>【代码段】</font>\n如果要建立一个已经格式化好的代码区块，只要每行都缩进 4 个空格或是一个 tab 就可以了\n\n        var name = \'Candy\'\n\n渲染效果：  \n\n    var name = \'Candy\'\n\n### <font color=#C71585>【表格】</font>\n使用竖线分割内容，且同时使用“---”与“:”指定对齐方式\n\n    | Header01 | Header02 | Header03\n    | -------- | :------: | ---:\n    | 默认 | 居中 | 右\n\n渲染效果：  \n\n| Header01 | Header02 | Header03\n| -------- | :------: | ---:\n| 默认 | 居中 | 右\n\n### <font color=#C71585>【引用】</font>\n只需要在文本前加入 > 这种尖括号（大于号）即可\n\n    >这里是一段引用\n\n渲染效果：  \n>这里是一段引用\n\n### <font color=#C71585>【分割线】</font>\n只需要三个 \\- 号\n\n    ---\n\n渲染效果：  \n\n---\n\n### <font color=#C71585>【换行】</font>\n只需要两个以上的空格然后回车\n\n    我是首行  \n    我换行了\n\n渲染效果：  \n我是首行  \n我换行了\n\n### <font color=#C71585>【html】</font>\n可以直接在文档里书写 HTML，不需要额外标注这是 HTML\n\n    <div>division</div>\n\n渲染效果：  \n<div>division</div>\n\n\n## 研究更多 markdown 语法详细细节\n\n- [创始人 John Gruber 的 Markdown 语法说明](http://daringfireball.net/projects/markdown/syntax)  \n- [Markdown 中文版语法说明](http://wowubuntu.com/markdown/)\n","timestamp":1527227783532},{"name":"02-amWiki与语法高亮.md","path":"01-Wiki基础知识/1-学习amWiki/05-学习markdown/02-amWiki与语法高亮.md","content":"# amWiki 与语法高亮\n\namWiki使用 [highlight.js](https://github.com/isagalaev/highlight.js) 进行预语法高亮渲染，它能对多达一百多种语言、样式提供语法高亮解析  \n使用两组每组三个反引号分单独两行将代码包围起来，并在第一组反引号后写上语言类型即可使用语法高亮，例如：\n    ```js\n    //some js code here\n    ```\n\n## javascript / js 代码\n普通代码块效果：  \n```\n//发送验证码\nfunction cd(num) {\n    $(\'#code\').val(num + \'秒后可重发\');\n    setTimeout(function() {\n        if (num - 1 >= 0) {\n            cd(num - 1);\n        } else {\n            $(\'#code\').removeClass(\'bg-gray\').prop(\'disabled\', false).val(\'重新发送验证码\');\n        }\n    },\n    1000);\n}\n```\n```\n{\n    \"state\": {\n        \"code\": 10200,                   //code状态码\n        \"msg\": \"ok\"                      //状态描述\n    },\n    \"data\": {\n        \"team_num\": 13,                  //队伍数\n        \"position\": \"海珠区新港中路\"      //位置\n    }\n}\n```\n\n添加 `js`、`javascript` 标记后的效果：\n```javascript\n//发送验证码\nfunction cd(num) {\n    $(\'#code\').val(num + \'秒后可重发\');\n    setTimeout(function() {\n        if (num - 1 >= 0) {\n            cd(num - 1);\n        } else {\n            $(\'#code\').removeClass(\'bg-gray\').prop(\'disabled\', false).val(\'重新发送验证码\');\n        }\n    },\n    1000);\n}\n```\n```js\n{\n    \"state\": {\n        \"code\": 10200,                   //code状态码\n        \"msg\": \"ok\"                      //状态描述\n    },\n    \"data\": {\n        \"team_num\": 13,                  //队伍数\n        \"position\": \"海珠区新港中路\"      //位置\n    }\n}\n```\namWiki对javascript代码片段做了再次增强，可以点击代码块右上角按钮隐藏/显示注释  \n当注释处于隐藏状态时不会被复制，比较适合模拟返回json数据的接口时直接拷贝（json不允许注释）\n\n## Html 代码\n普通代码段效果：  \n```\n<body>\n    <div class=\"loading\"><img src=\"/assets/images/loading.gif\"></div>\n    <header>some text</header>\n    <script type=\"text/javascript\" src=\"/assets/js/jquery-2.1.4.min.js\"></script>\n</body>\n```\n添加 `html` 标记后的效果：\n```html\n<body>\n    <div class=\"loading\"><img src=\"/assets/images/loading.gif\"></div>\n    <header>some text</header>\n    <script type=\"text/javascript\" src=\"/assets/js/jquery-2.1.4.min.js\"></script>\n</body>\n```\n\n## css 代码\n普通代码段效果：\n```\n/* 紧凑 */\nhtml,body{display:block;width:100%;height:100%;min-width:320px;}\na,img{-webkit-touch-callout:none;}\n/* 展开 */\ninput[type=\"button\"],\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ntextarea {\n    -webkit-appearance: none;\n}\n```\n\n添加 `css` 标记后的效果：\n```css\n/* 紧凑 */\nhtml,body{display:block;width:100%;height:100%;min-width:320px;}\na,img{-webkit-touch-callout:none;}\n/* 展开 */\ninput[type=\"button\"],\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ntextarea {\n    -webkit-appearance: none;\n}\n```\n\n## php 代码\n普通代码段效果：\n```\nprivate function addQuestData($data, $filing_id)\n  {\n    $quest_num = $data[\'status\'] == 10 ? 1 : 2;\n      $where = [\n        [\'user_filing_id\', \'=\', $filing_id],\n        [\'project_id\', \'=\', $data[\'project_id\']],\n        [\'mobile\',\'=\', $data[\'mobile\']],\n        [\'quest_num\', \'=\', $quest_num]\n      ];\n  }\n```\n添加 `php` 标记后的效果：\n```php\nprivate function addQuestData($data, $filing_id)\n  {\n    $quest_num = $data[\'status\'] == 10 ? 1 : 2;\n      $where = [\n        [\'user_filing_id\', \'=\', $filing_id],\n        [\'project_id\', \'=\', $data[\'project_id\']],\n        [\'mobile\',\'=\', $data[\'mobile\']],\n        [\'quest_num\', \'=\', $quest_num]\n      ];\n  }\n```\n\n## sql 代码\n普通代码段效果：\n```\nSELECT Company, OrderNumber FROM Orders ORDER BY Company, OrderNumber\n```\n添加 `sql` 标记后的效果：\n```sql\nSELECT Company, OrderNumber FROM Orders ORDER BY Company, OrderNumber\n```\n\n## java 代码\n普通代码段效果：\n```\npublic class Test {\n   public static void main(String args[]) {\n      int x = 10;\n      while( x < 20 ) {\n         System.out.print(\"value of x : \" + x );\n         x++;\n         System.out.print(\"\\n\");\n      }\n   }\n}\n```\n添加 `java` 标记后的效果：\n```java\npublic class Test {\n   public static void main(String args[]) {\n      int x = 10;\n      while( x < 20 ) {\n         System.out.print(\"value of x : \" + x );\n         x++;\n         System.out.print(\"\\n\");\n      }\n   }\n}\n```\n","timestamp":1527227783532},{"name":"03-amWiki与流程图.md","path":"01-Wiki基础知识/1-学习amWiki/05-学习markdown/03-amWiki与流程图.md","content":"# amWiki 与流程图\n\namWiki 使用 [flowchart.js](https://github.com/adrai/flowchart.js) 进行流程图渲染，它是一款将文本表达式绘制为简单的 svg 流程图的图形库  \n流程图代码块和语法高亮类似，不过类型声明须用 `flow` 关键字\n    ```flow\n    //your flow text here\n    ```\n\n## 流程图样例\n代码：\n\n    ```flow\n    st=>start: Start :>https://amwiki.xf09.net[blank]\n    e=>end: End :>https://amwiki.xf09.net[blank]\n    op1=>operation: My Operation\n    op2=>operation: Stuff\n    sub1=>subroutine: My Subroutine\n    cond=>condition: Yes or No? :>https://amwiki.xf09.net[blank]\n    c2=>condition: Good idea\n    io=>inputoutput: catch something...\n\n    st->op1(right)->cond\n    cond(yes, right)->c2\n    cond(no)->sub1(left)->op1\n    c2(yes)->io->e\n    c2(no)->op2->e\n    ```\n效果：\n\n```flow\nst=>start: Start :>https://amwiki.xf09.net[blank]\ne=>end: End :>https://amwiki.xf09.net[blank]\nop1=>operation: My Operation\nop2=>operation: Stuff\nsub1=>subroutine: My Subroutine\ncond=>condition: Yes or No? :>https://amwiki.xf09.net[blank]\nc2=>condition: Good idea\nio=>inputoutput: catch something...\n\nst->op1(right)->cond\ncond(yes, right)->c2\ncond(no)->sub1(left)->op1\nc2(yes)->io->e\nc2(no)->op2->e\n```\n\n## 流程图语法介绍\n流程图语法分两个部分，一个是声明元素，一个是定义流程\n\n### 声明元素\n语法：\n\n    tag=>type: content :>url\n\n1. `tag` 设置元素名称\n2. `=>` 元素定义符\n2. `type:` 设置元素类型，共分6种：\n    - **start**：开始，圆角矩形\n    - **end**：结束，圆角矩形\n    - **operation**：操作/行动方案，普通矩形\n    - **subroutine**：子主题/模块，双边线矩形\n    - **condition**：条件判断/问题审核，菱形\n    - **inputoutput**：输入输出，平行四边形\n3. `content` 设置元素显示内容，中英均可\n4. `:>url` 设置元素连接，可选，后接 [blank] 可以新建窗口打开\n\n提示：注意空格，`=>` 前后都不能接空格；`type:` 后必须接空格；`:>` 是语法标记，中间不能有空格\n\n### 定义流程\n语法：\n\n    tag1(branch,direction)->tag2\n\n1. `->` 流程定义符，连接两个元素\n2. `branch` 设置 condition 类型元素的两个分支，有 `yes`/`no` 两个值，其他元素无效\n3. `direction` 定义流程走线方向，有 `left`/`right`/`top`/`bottom` 四个值，所有元素有效，此项配置可选 (ps:此属性容易造成渲染 bug)  \n\n小提示：\n- 继续注意空格，`->` 前后都不能有空格\n- 由于 condition 类型有两个分支，我们一般遇到 condition 元素就换行书写，比如：\n        st->op1-c2\n        c2(yes)->io->e\n        c2(no)->op2->e\n","timestamp":1527227783532},{"name":"05-Atom对Markdown的原生支持.md","path":"01-Wiki基础知识/1-学习amWiki/05-学习markdown/05-Atom对Markdown的原生支持.md","content":"# Atom 编辑器对 Markdown 的原生支持\n\nAtom 是 Github 开发的开源跨平台的编辑器，原生支持编辑 Markdown 文档\n\n## 自动完成 Markdown 语法标记\n\n### 代码段效果-code\n输入 `c + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-2c594bb9.png)\n\n### 粗体效果-bold\n输入 `b + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-8620325c.png)\n\n### 斜体效果-italic\n输入 `i + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-0e8a6768.png)\n\n### 链接效果-link\n输入 `l + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-5bd90b0f.png)\n\n### 图片效果-img\n输入 `im + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-e03a0fc8.png)\n\n### 表格效果-table\n输入 `ta + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-fbed2544.png)\n\n<!--\n### todo效果-list\n输入`t + Enter`\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-01a27e09.png)\n-->\n\n## 自动补齐二次单词输入\n在第二次输入时，单词可以自动识别与补齐，回车即可完成输入\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-efba45f0.png)\n\n## 内置 Markdown 即时预览插件\n编辑 Markdown 文档时，使用快捷键 `ctrl + shift + m` 即可在窗口右侧打开 Atom 内置的 markdown-preview 即时预览模块\n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/13-75213ccd.png)\n","timestamp":1527227783532},{"name":"06-使用测试模块测试接口.md","path":"01-Wiki基础知识/1-学习amWiki/06-使用测试模块测试接口.md","content":"# 使用测试模块测试接口\n\n让文档与测试一步搞定！\n\n## 激活测试的条件\n##### 当一篇文档中使用了 `“请求地址”`、`“请求类型”`、`“请求参数”` 三个字段作为 `h3标题` 并配套对应内容时，将激活接口测试功能  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-8a6d91f1.png)  \n(详细书写格式请参照[通用API接口文档示例](?file=002-文档示范/001-通用API接口文档示例))  \n\n##### 此时文档右上角将出现 `“接口测试”` 按钮，例如：  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/04-e412c7fd.png)\n\n## 接口测试的工作原理与步骤\n1. 当测试模块处于打开状态时，每次打开文档都会扫描文档转换 html 后的内容，满足三个 h3 时即开启测试功能\n2. 开启当前文档测试功能后，即会从页面上 **抓取** 符合一定格式的测试内容\n3. 格式化抓取的内容并生成可再次修改的表单\n4. 用户点击发送请求时，先并入全局参数到当前参数列表，再发送请求\n5. 收到请求结果，格式化显示\n\n## 接口测试文档的格式要求\n\n### 请求地址的格式\n请求地址可以使用带 http 与不带 http 两种，下面两种写法都是合适的  \n\n    /api/customer-flow\n    http://localhost/api/customer-flow\n\n注意，不带 http 将自动和当前域名拼合为完整绝对路径，而不是使用相对路径\n\n### 请求类型的格式\namWiki 暂时只支持 **Get**、**Post**、**Put**、**Delete** 四种普通 ajax 请求，不支持文件上传和其他高级方式通讯\n\n### 请求参数的格式\n- 当接口不需要参数时，直接使用 **“无”** 即可  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-e030ca95.png)  \n- 请求参数列表必须使用 **表格**，且必须按 `参数名`、`类型`、`必填`、`描述`、`默认值`、`参考值` 的栏目顺序建立表格，否则不能正常抓取。  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-5a7fda87.png)  \n其中：\n    - 默认值与参考值同属参数的值，但是优先显示默认值，只有当没有默认值时参考值才有效，参考值是为了方便测试之用\n    - 参考值一栏可选，不写参考值的整个表格栏位，不会影响测试功能\n\n## 测试功能应用\n\n### 测试面板\n抓取测试内容生成测试表单如下  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-c0d8d3cb.png)\n\n### 全局参数面板\n全局参数影响所有接口，在全局参数面板可以进行新增、删除全局参数以及临时启用/禁用全局参数等操作  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-c19f1829.png)\n\n### 返回响应\n成功的响应：  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-6f851b27.png)  \n失败的响应：  \n![](https://amwiki.xf09.net/docs/assets/001.tiny/06-bf211990.png)\n\n## 测试模块的问题\n- 测试模只能请求同域接口，不能跨域。 (跨域解决方案请参考[amWiki转接到任意域名进行接口测试](?file=001-学习amWiki/30-amWiki转接到任意域名进行接口测试))\n- 如果接口需要登录权限，请先登录您自己的系统。  \n","timestamp":1527227783532},{"name":"07-amWiki转接到任意域名进行接口测试.md","path":"01-Wiki基础知识/1-学习amWiki/07-amWiki转接到任意域名进行接口测试.md","content":"# amWiki 转接到任意域名进行接口测试\n\n我们分两种情况进行文档转接，一种是我们有域名服务器操作权限，一种是没有\n\n## 有域名服务器操作权限的转接\n如果我们有域名服务器操作权限，那要把其他域名下的文档转接到当前域名下，其实很简单，就是一个 **反向代理** 的过程  \n\n以 nginx 为例，将地址 https://amwiki.xf09.net/docs/ 下所有文档转接到任意域名(_无需https_) /wiki 路径下\n```nginx\nserver {\n    listen       81;\n    server_name  abc123.com;\n    location /wiki {\n        proxy_pass https://amwiki.xf09.net/docs/;\n        proxy_redirect     off;\n        #proxy_set_header   Host             $host;\n        proxy_set_header   X-Real-IP        $remote_addr;\n        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;\n        proxy_max_temp_file_size   0k;\n        proxy_connect_timeout      90;\n        proxy_send_timeout         90;\n        proxy_read_timeout         90;\n        proxy_buffer_size          4k;\n        proxy_buffers              4 32k;\n        proxy_busy_buffers_size    64k;\n        proxy_temp_file_write_size 64k;\n    }\n    # other settings ...\n}\n```\n\n## 无域名服务器操作权限\n此时，如果想要将我们的文档转接到对应域名上去，需要利用抓包工具 Fiddler 进行 **请求代理**  \n(_请下载安装抓包工具 [Fiddler](http://www.telerik.com/fiddler)，并了解 AutoResponder 面板的使用_)\n\n由于 https 特殊性，我们分两种情况来讨论：  \n\n### http 请求代理\n当原域名基于 http 通信时，由于 http 请求是一种很开放的通信，我们可以直接用 fiddler 非常简单的进行转接  \n\n比如，我们继续把地址 https://amwiki.xf09.net/docs/ 下所有文档转接到任意域名 /wiki 路径下  \n只需要如下配置 AutoResponder：   \n\n![](https://amwiki.xf09.net/docs/assets/001.tiny/07-c1ef9812.png)  \n规则代码如下：\n\n    regex:.+abc123\\.com\\/wiki\\/(.+)$\n    https://amwiki.xf09.net/docs/$1\n\n第一行代码为请求匹配，其中 `regex:` 表示按正则表达式进行匹配，`.+abc123\\.com\\/wiki\\/` 表示需要代理的路径，`(.+)if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m01']= (和第二行配合)表示转接后续的路径，即将后续路径替换到第二行代码中的 `$1`  \n\n| | 转接地址 | 实际请求地址 |\n| : ---| :--- | :--- |\n| 例1 | http://abc123.com/wiki/index.html | https://amwiki.xf09.net/docs/index.html |\n| 例2 | http://abc123.com/wiki/amWiki/js/amWiki.js | https://amwiki.xf09.net/docs/amWiki/js/amWiki.js |\n\n### https 请求代理\n当原域名基于 https 通讯是，我们需要更多的操作才能使用代理 (Fiddler 抓包 https 的原理，有兴趣可自行知乎一下)    \n\n- **第一步，开启 https 解码**  \n  Tools -> Fiddler Options -> HTTPS -> 依次勾选如下  \n  ![](https://amwiki.xf09.net/docs/assets/001.tiny/07-ea6ad78e.png)  \n- **第二步，是安装 Fiddler 根证书**  \n  打开 http://localhost:8888/ 下载Fiddler 根证书并安装  \n  ![](https://amwiki.xf09.net/docs/assets/001.tiny/07-c59334fc.png)  \n- **第三步，按照 http 的方式进行代理**  \n  例如，我们转接到百度域名的一个路径下\n\n        regex:.+www\\.baidu\\.com\\/wiki\\/(.+)$\n        https://amwiki.xf09.net/docs/$1\n\n  此时，我们打开 https://www.baidu.com/wiki/index.html 会发现，不再是“很抱歉，您要访问的页面不存在！”了\n","timestamp":1527227783532},{"name":"001-通用API接口文档示例.md","path":"01-Wiki基础知识/2-文档示范/001-通用API接口文档示例.md","content":"# 客户日志流水接口示例\n>维护人员：**Tevin**  \n>创建时间：2016-04-06\n\n## 接口简介\n实时查询客户各种操作(例如登录，拓客等)的流水日志  \n\n## 接口详情\n\n### 请求地址\n/api/customer-flow\n\n### 请求类型\nGET\n\n### 请求参数\n| 参数名 | 类型 | 必填 | 描述 | 默认值 | 参考值 |\n| --- | :---: | :---: | --- | --- | --- |\n| customer_id | number | 是 | 客户id | - | 132 |\n| type | number | 否 | 客户类型，0所有、1扩展、2报备、3成交 | - | 1 |\n\n### 返回正确JSON示例\n```javascript\n{\n    \"state\": {\n        \"code\": 10200,\n        \"msg\": \"ok\"\n    },\n    \"data\": {\n        \"id\": 307,  //流水id\n        \"real_name\": \"Tevin\",  //用户名称\n        \"mobile\": \"暂无\",  //用户手机\n        \"origin\": \"暂无\",  //用户来源\n        \"created_at\": \"2016-04-04 20:00:00\",  //加入时间\n        \"last_login\": \"2016-05-22 15:30:21\",  //最后登录时间\n        \"log\": []  //日志列表\n    }\n}\n```\n### 返回错误JSON示例\n```javascript\n{\n    \"state\": {\n        \"code\": 10500\n        \"msg\": \"服务器未知报错\"\n    }\n}\n```\n\n### 备注说明\n无\n\n### 修改日志\n- 【2016-05-22】  \n   新增了last_login最后登录时间字段\n","timestamp":1527227783532},{"name":"002-超长文档页内目录示例.md","path":"01-Wiki基础知识/2-文档示范/002-超长文档页内目录示例.md","content":"# 微信JS-SDK说明文档（超长文档页内目录示例）\n\n>1. [概述](#概述 \"概述\")\n\t1. [JSSDK使用步骤](#JSSDK使用步骤 \"JSSDK使用步骤\")\n\t1. [接口调用说明](#接口调用说明 \"接口调用说明\")\n1. [基础接口](#基础接口 \"基础接口\")\n\t1. [判断当前客户端版本是否支持指定JS接口](#判断当前客户端版本是否支持指定JS接口 \"判断当前客户端版本是否支持指定JS接口\")\n\t1. [分享接口](#分享接口 \"分享接口\")\n\t1. [获取“分享到朋友圈”按钮点击状态及自定义分享内容接口](#获取“分享到朋友圈”按钮点击状态及自定义分享内容接口 \"获取“分享到朋友圈”按钮点击状态及自定义分享内容接口\")\n\t1. [获取“分享给朋友”按钮点击状态及自定义分享内容接口](#获取“分享给朋友”按钮点击状态及自定义分享内容接口 \"获取“分享给朋友”按钮点击状态及自定义分享内容接口\")\n\t1. [获取“分享到QQ”按钮点击状态及自定义分享内容接口](#获取“分享到QQ”按钮点击状态及自定义分享内容接口 \"获取“分享到QQ”按钮点击状态及自定义分享内容接口\")\n\t1. [获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口](#获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口 \"获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口\")\n\t1. [获取“分享到QQ空间”按钮点击状态及自定义分享内容接口](#获取“分享到QQ空间”按钮点击状态及自定义分享内容接口 \"获取“分享到QQ空间”按钮点击状态及自定义分享内容接口\")\n1. [图像接口](#图像接口 \"图像接口\")\n\t1. [拍照或从手机相册中选图接口](#拍照或从手机相册中选图接口 \"拍照或从手机相册中选图接口\")\n\t1. [预览图片接口](#预览图片接口 \"预览图片接口\")\n\t1. [上传图片接口](#上传图片接口 \"上传图片接口\")\n\t1. [下载图片接口](#下载图片接口 \"下载图片接口\")\n1. [音频接口](#音频接口 \"音频接口\")\n\t1. [开始录音接口](#开始录音接口 \"开始录音接口\")\n\t1. [停止录音接口](#停止录音接口 \"停止录音接口\")\n\t1. [监听录音自动停止接口](#监听录音自动停止接口 \"监听录音自动停止接口\")\n\t1. [播放语音接口](#播放语音接口 \"播放语音接口\")\n\t1. [暂停播放接口](#暂停播放接口 \"暂停播放接口\")\n\t1. [停止播放接口](#停止播放接口 \"停止播放接口\")\n\t1. [监听语音播放完毕接口](#监听语音播放完毕接口 \"监听语音播放完毕接口\")\n\t1. [上传语音接口](#上传语音接口 \"上传语音接口\")\n\t1. [下载语音接口](#下载语音接口 \"下载语音接口\")\n1. [智能接口](#智能接口 \"智能接口\")\n\t1. [识别音频并返回识别结果接口](#识别音频并返回识别结果接口 \"识别音频并返回识别结果接口\")\n1. [设备信息](#设备信息 \"设备信息\")\n\t1. [获取网络状态接口](#获取网络状态接口 \"获取网络状态接口\")\n1. [地理位置](#地理位置 \"地理位置\")\n\t1. [使用微信内置地图查看位置接口](#使用微信内置地图查看位置接口 \"使用微信内置地图查看位置接口\")\n\t1. [获取地理位置接口](#获取地理位置接口 \"获取地理位置接口\")\n1. [摇一摇周边](#摇一摇周边 \"摇一摇周边\")\n\t1. [开启查找周边ibeacon设备接口](#开启查找周边ibeacon设备接口 \"开启查找周边ibeacon设备接口\")\n\t1. [关闭查找周边ibeacon设备接口](#关闭查找周边ibeacon设备接口 \"关闭查找周边ibeacon设备接口\")\n\t1. [监听周边ibeacon设备接口](#监听周边ibeacon设备接口 \"监听周边ibeacon设备接口\")\n1. [界面操作](#界面操作 \"界面操作\")\n\t1. [隐藏右上角菜单接口](#隐藏右上角菜单接口 \"隐藏右上角菜单接口\")\n\t1. [显示右上角菜单接口](#显示右上角菜单接口 \"显示右上角菜单接口\")\n\t1. [关闭当前网页窗口接口](#关闭当前网页窗口接口 \"关闭当前网页窗口接口\")\n\t1. [批量隐藏功能按钮接口](#批量隐藏功能按钮接口 \"批量隐藏功能按钮接口\")\n\t1. [批量显示功能按钮接口](#批量显示功能按钮接口 \"批量显示功能按钮接口\")\n\t1. [隐藏所有非基础按钮接口](#隐藏所有非基础按钮接口 \"隐藏所有非基础按钮接口\")\n\t1. [显示所有功能按钮接口](#显示所有功能按钮接口 \"显示所有功能按钮接口\")\n1. [微信扫一扫](#微信扫一扫 \"微信扫一扫\")\n\t1. [调起微信扫一扫接口](#调起微信扫一扫接口 \"调起微信扫一扫接口\")\n1. [微信小店](#微信小店 \"微信小店\")\n\t1. [跳转微信商品页接口](#跳转微信商品页接口 \"跳转微信商品页接口\")\n1. [微信卡券](#微信卡券 \"微信卡券\")\n\t1. [获取api_ticket](#获取api_ticket \"获取api_ticket\")\n\t1. [拉取适用卡券列表并获取用户选择信息](#拉取适用卡券列表并获取用户选择信息 \"拉取适用卡券列表并获取用户选择信息\")\n\t1. [批量添加卡券接口](#批量添加卡券接口 \"批量添加卡券接口\")\n\t1. [查看微信卡包中的卡券接口](#查看微信卡包中的卡券接口 \"查看微信卡包中的卡券接口\")\n\t1. [核销后再次赠送卡券接口](#核销后再次赠送卡券接口 \"核销后再次赠送卡券接口\")\n1. [微信支付](#微信支付 \"微信支付\")\n\t1. [发起一个微信支付请求](#发起一个微信支付请求 \"发起一个微信支付请求\")\n\n\n## 概述\n\n微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。  \n\n通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。  \n\n此文档面向网页开发者介绍微信JS-SDK如何使用及相关注意事项。\n\n### JSSDK使用步骤\n\n#### 步骤一：绑定域名\n\n先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。**如果你使用了支付类接口，请确保支付目录在该安全域名下，否则将无法完成支付。**\n\n备注：登录后可在“开发者中心”查看对应的接口权限。\n\n#### 步骤二：引入JS文件\n\n在需要调用JS接口的页面引入如下JS文件，（支持https）：\n[http://res.wx.qq.com/open/js/jweixin-1.0.0.js](http://res.wx.qq.com/open/js/jweixin-1.0.0.js)\n\n**请注意，如果你的页面启用了https，务必引入** [https://res.wx.qq.com/open/js/jweixin-1.0.0.js](https://res.wx.qq.com/open/js/jweixin-1.0.0.js) ，**否则将无法在iOS9.0以上系统中成功使用JSSDK**\n\n如需使用摇一摇周边功能，请引入 jweixin-1.1.0.js\n\n备注：支持使用 AMD/CMD 标准模块加载方法加载\n\n#### 步骤三：通过config接口注入权限验证配置\n\n**所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用**（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）。\n\n```javascript\nwx.config({\n    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。\n    appId: \'\', // 必填，公众号的唯一标识\n    timestamp: , // 必填，生成签名的时间戳\n    nonceStr: \'\', // 必填，生成签名的随机串\n    signature: \'\',// 必填，签名，见附录1\n    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2\n});\n```\n\n#### 步骤四：通过ready接口处理成功验证\n```javascript\nwx.ready(function(){\n    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。\n});\n```\n\n#### 步骤五：通过error接口处理失败验证\n```javascript\nwx.error(function(res){\n    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。\n});\n```\n### 接口调用说明\n\n所有接口通过wx对象(也可使用jWeixin对象)来调用，参数是一个对象，除了每个接口本身需要传的参数之外，还有以下通用参数：\n\n1. success：接口调用成功时执行的回调函数。\n1. fail：接口调用失败时执行的回调函数。\n1. complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。\n1. cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。\n1. trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。\n\n备注：**不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回。**\n\n以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：\n\n1. 调用成功时：\"xxx:ok\" ，其中xxx为调用的接口名\n1. 用户取消时：\"xxx:cancel\"，其中xxx为调用的接口名\n1. 调用失败时：其值为具体错误信息\n\n## 基础接口\n\n### 判断当前客户端版本是否支持指定JS接口\n\n```javascript\nwx.checkJsApi({\n    jsApiList: [\'chooseImage\'], // 需要检测的JS接口列表，所有JS接口列表见附录2,\n    success: function(res) {\n        // 以键值对的形式返回，可用的api值true，不可用为false\n        // 如：{\"checkResult\":{\"chooseImage\":true},\"errMsg\":\"checkJsApi:ok\"}\n    }\n});\n```\n备注：checkJsApi接口是客户端6.0.2新引入的一个预留接口，第一期开放的接口均可不使用checkJsApi来检测。\n\n### 分享接口\n\n请注意不要有诱导分享等违规行为，对于诱导分享行为将永久回收公众号接口权限，详细规则请查看：朋友圈管理常见问题。\n\n### 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口\n\n```javascript\nwx.onMenuShareTimeline({\n    title: \'\', // 分享标题\n    link: \'\', // 分享链接\n    imgUrl: \'\', // 分享图标\n    success: function () {\n        // 用户确认分享后执行的回调函数\n    },\n    cancel: function () {\n        // 用户取消分享后执行的回调函数\n    }\n});\n```\n\n### 获取“分享给朋友”按钮点击状态及自定义分享内容接口\n```javascript\nwx.onMenuShareAppMessage({\n    title: \'\', // 分享标题\n    desc: \'\', // 分享描述\n    link: \'\', // 分享链接\n    imgUrl: \'\', // 分享图标\n    type: \'\', // 分享类型,music、video或link，不填默认为link\n    dataUrl: \'\', // 如果type是music或video，则要提供数据链接，默认为空\n    success: function () {\n        // 用户确认分享后执行的回调函数\n    },\n    cancel: function () {\n        // 用户取消分享后执行的回调函数\n    }\n});\n```\n\n### 获取“分享到QQ”按钮点击状态及自定义分享内容接口\n```javascript\nwx.onMenuShareQQ({\n    title: \'\', // 分享标题\n    desc: \'\', // 分享描述\n    link: \'\', // 分享链接\n    imgUrl: \'\', // 分享图标\n    success: function () {\n       // 用户确认分享后执行的回调函数\n    },\n    cancel: function () {\n       // 用户取消分享后执行的回调函数\n    }\n});\n```\n\n### 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口\n```javascript\nwx.onMenuShareWeibo({\n    title: \'\', // 分享标题\n    desc: \'\', // 分享描述\n    link: \'\', // 分享链接\n    imgUrl: \'\', // 分享图标\n    success: function () {\n       // 用户确认分享后执行的回调函数\n    },\n    cancel: function () {\n        // 用户取消分享后执行的回调函数\n    }\n});\n```\n\n### 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口\n```javascript\nwx.onMenuShareQZone({\n    title: \'\', // 分享标题\n    desc: \'\', // 分享描述\n    link: \'\', // 分享链接\n    imgUrl: \'\', // 分享图标\n    success: function () {\n       // 用户确认分享后执行的回调函数\n    },\n    cancel: function () {\n        // 用户取消分享后执行的回调函数\n    }\n});\n```\n\n## 图像接口\n\n### 拍照或从手机相册中选图接口\n```javascript\nwx.chooseImage({\n    count: 1, // 默认9\n    sizeType: [\'original\', \'compressed\'], // 可以指定是原图还是压缩图，默认二者都有\n    sourceType: [\'album\', \'camera\'], // 可以指定来源是相册还是相机，默认二者都有\n    success: function (res) {\n        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片\n    }\n});\n```\n\n### 预览图片接口\n```javascript\nwx.previewImage({\n    current: \'\', // 当前显示图片的http链接\n    urls: [] // 需要预览的图片http链接列表\n});\n```\n\n### 上传图片接口\n```javascript\nwx.uploadImage({\n    localId: \'\', // 需要上传的图片的本地ID，由chooseImage接口获得\n    isShowProgressTips: 1, // 默认为1，显示进度提示\n    success: function (res) {\n        var serverId = res.serverId; // 返回图片的服务器端ID\n    }\n});\n```\n\n备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id，参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天，如需要调高频率，请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】，请对你的项目进行简单描述，附上产品体验链接，并对用户量和使用量进行说明。\n\n### 下载图片接口\n```javascript\nwx.downloadImage({\n    serverId: \'\', // 需要下载的图片的服务器端ID，由uploadImage接口获得\n    isShowProgressTips: 1, // 默认为1，显示进度提示\n    success: function (res) {\n        var localId = res.localId; // 返回图片下载后的本地ID\n    }\n});\n```\n\n## 音频接口\n\n### 开始录音接口\n```javascript\nwx.startRecord();\n```\n\n### 停止录音接口\n```javascript\nwx.stopRecord({\n    success: function (res) {\n        var localId = res.localId;\n    }\n});\n```\n\n### 监听录音自动停止接口\n```javascript\nwx.onVoiceRecordEnd({\n    // 录音时间超过一分钟没有停止的时候会执行 complete 回调\n    complete: function (res) {\n        var localId = res.localId;\n    }\n});\n```\n\n### 播放语音接口\n```javascript\nwx.playVoice({\n    localId: \'\' // 需要播放的音频的本地ID，由stopRecord接口获得\n});\n```\n\n### 暂停播放接口\n```javascript\nwx.pauseVoice({\n    localId: \'\' // 需要暂停的音频的本地ID，由stopRecord接口获得\n});\n```\n\n### 停止播放接口\n```javascript\nwx.stopVoice({\n    localId: \'\' // 需要停止的音频的本地ID，由stopRecord接口获得\n});\n```\n\n### 监听语音播放完毕接口\n```javascript\nwx.onVoicePlayEnd({\n    success: function (res) {\n        var localId = res.localId; // 返回音频的本地ID\n    }\n});\n```\n\n### 上传语音接口\n```javascript\nwx.uploadVoice({\n    localId: \'\', // 需要上传的音频的本地ID，由stopRecord接口获得\n    isShowProgressTips: 1, // 默认为1，显示进度提示\n        success: function (res) {\n        var serverId = res.serverId; // 返回音频的服务器端ID\n    }\n});\n```\n\n备注：上传语音有效期3天，可用微信多媒体接口下载语音到自己的服务器，此处获得的 serverId 即 media_id，参考文档 ../12/58bfcfabbd501c7cd77c19bd9cfa8354.html 目前多媒体文件下载接口的频率限制为10000次/天，如需要调高频率，请邮件weixin-open@qq.com,邮件主题为【申请多媒体接口调用量】，请对你的项目进行简单描述，附上产品体验链接，并对用户量和使用量进行说明。\n\n### 下载语音接口\n```javascript\nwx.downloadVoice({\n    serverId: \'\', // 需要下载的音频的服务器端ID，由uploadVoice接口获得\n    isShowProgressTips: 1, // 默认为1，显示进度提示\n    success: function (res) {\n        var localId = res.localId; // 返回音频的本地ID\n    }\n});\n```\n\n## 智能接口\n\n### 识别音频并返回识别结果接口\n```javascript\nwx.translateVoice({\n   localId: \'\', // 需要识别的音频的本地Id，由录音相关接口获得\n    isShowProgressTips: 1, // 默认为1，显示进度提示\n    success: function (res) {\n        alert(res.translateResult); // 语音识别的结果\n    }\n});\n```\n\n## 设备信息\n\n### 获取网络状态接口\n```javascript\nwx.getNetworkType({\n    success: function (res) {\n        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi\n    }\n});\n```\n\n## 地理位置\n\n### 使用微信内置地图查看位置接口\n```javascript\nwx.openLocation({\n    latitude: 0, // 纬度，浮点数，范围为90 ~ -90\n    longitude: 0, // 经度，浮点数，范围为180 ~ -180。\n    name: \'\', // 位置名\n    address: \'\', // 地址详情说明\n    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大\n    infoUrl: \'\' // 在查看位置界面底部显示的超链接,可点击跳转\n});\n```\n\n### 获取地理位置接口\n```javascript\nwx.getLocation({\n    type: \'wgs84\', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入\'gcj02\'\n    success: function (res) {\n        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90\n        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。\n        var speed = res.speed; // 速度，以米/每秒计\n        var accuracy = res.accuracy; // 位置精度\n    }\n});\n```\n\n## 摇一摇周边\n\n### 开启查找周边ibeacon设备接口\n```javascript\nwx.startSearchBeacons({\n    ticket: \"\",  // 摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面\n    complete: function(argv) {\n        // 开启查找完成后的回调函数\n    }\n});\n```\n\n备注：如需接入摇一摇周边功能，请参考：申请开通摇一摇周边\n\n### 关闭查找周边ibeacon设备接口\n```javascript\nwx.stopSearchBeacons({\n\tcomplete:function(res){\n\t\t//关闭查找完成后的回调函数\n\t}\n});\n```\n\n### 监听周边ibeacon设备接口\n```javascript\nwx.onSearchBeacons({\n\tcomplete:function(argv){\n\t\t//回调函数，可以数组形式取得该商家注册的在周边的相关设备列表\n\t}\n});\n```\n\n备注：上述摇一摇周边接口使用注意事项及更多返回结果说明，请参考：摇一摇周边获取设备信息\n\n## 界面操作\n\n### 隐藏右上角菜单接口\n```javascript\nwx.hideOptionMenu();\n```\n\n### 显示右上角菜单接口\n```javascript\nwx.showOptionMenu();\n```\n\n### 关闭当前网页窗口接口\n```javascript\nwx.closeWindow();\n```\n\n### 批量隐藏功能按钮接口\n```javascript\nwx.hideMenuItems({\n    menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3\n});\n```\n\n### 批量显示功能按钮接口\n```javascript\nwx.showMenuItems({\n    menuList: [] // 要显示的菜单项，所有menu项见附录3\n});\n```\n\n### 隐藏所有非基础按钮接口\n```javascript\nwx.hideAllNonBaseMenuItem();\n// “基本类”按钮详见附录3\n```\n\n### 显示所有功能按钮接口\n```javascript\nwx.showAllNonBaseMenuItem();\n```\n\n## 微信扫一扫\n\n### 调起微信扫一扫接口\n```javascript\nwx.scanQRCode({\n    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，\n    scanType: [\"qrCode\",\"barCode\"], // 可以指定扫二维码还是一维码，默认二者都有\n    success: function (res) {\n        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果\n    }\n});\n```\n\n## 微信小店\n\n### 跳转微信商品页接口\n```javascript\nwx.openProductSpecificView({\n    productId: \'\', // 商品id\n    viewType: \'\' // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页\n});\n```\n\n## 微信卡券\n\n微信卡券接口中使用的签名凭证api_ticket，与步骤三中config使用的签名凭证jsapi_ticket不同，开发者在调用微信卡券JS-SDK的过程中需依次完成两次不同的签名，并确保凭证的缓存。\n\n### 获取api_ticket\n\napi_ticket 是用于调用微信卡券JS API的临时票据，有效期为7200 秒，通过access_token 来获取。\n\n开发者注意事项：\n\n1. **此用于卡券接口签名的api_ticket与步骤三中通过config接口注入权限验证配置使用的jsapi_ticket不同。**\n2. 由于获取api_ticket 的api 调用次数非常有限，频繁刷新api_ticket 会导致api调用受限，影响自身业务，开发者需在自己的服务存储与更新api_ticket。\n\n#### 接口调用请求说明\n\n    http请求方式: GET\n    https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=wx_card\n\n#### 参数说明\n| 参数 | 是否必须 | 说明 |\n| --- | --- | --- |\n| access_token | 是 | 调用接口凭证 |\n\n#### 返回数据\n\n数据示例：\n```JSON\n{\n    \"errcode\": 0,\n    \"errmsg\": \"ok\",\n    \"ticket\": \"bxLdikRXVbTPdHSM05e5u5sUoXNKdvsdshFKA\",\n    \"expires_in\": 7200\n}\n```\n| 参数名 | 描述\n| --- | ---\n| errcode\t| 错误码\n| errmsg | 错误信息\n| ticket | api_ticket，卡券接口中签名所需凭证\n| expires_in | 有效时间\n\n### 拉取适用卡券列表并获取用户选择信息\n```javascript\nwx.chooseCard({\n    shopId: \'\', // 门店Id\n    cardType: \'\', // 卡券类型\n    cardId: \'\', // 卡券Id\n    timestamp: 0, // 卡券签名时间戳\n    nonceStr: \'\', // 卡券签名随机串\n    signType: \'\', // 签名方式，默认\'SHA1\'\n    cardSign: \'\', // 卡券签名\n    success: function (res) {\n        var cardList= res.cardList; // 用户选中的卡券列表信息\n    }\n});\n```\n\n|参数名\t|必填\t|类型\t|示例值\t|描述\n| --- | --- | --- | --- | ---\n|shopId\t|否\t|string(24)\t|1234\t|门店ID。shopID用于筛选出拉起带有指定location_list(shopID)的卡券列表，非必填。\n|cardType\t|否\t |string(24)\t|GROUPON\t|卡券类型，用于拉起指定卡券类型的卡券列表。当cardType为空时，默认拉起所有卡券的列表，非必填。\n|cardId\t|否\t |string(32)\t|p1Pj9jr90_SQRaVqYI239Ka1erk\t|卡券ID，用于拉起指定cardId的卡券列表，当cardId为空时，默认拉起所有卡券的列表，非必填。\n|timestamp\t|是\t |string(32)\t |14300000000\t|时间戳。\n|nonceStr\t|是\t |string(32)\t|sduhi123\t|随机字符串。\n|signType\t|是\t |string(32)\t|SHA1\t|签名方式，目前仅支持SHA1\n|cardSign\t|是\t |string(64)\t|abcsdijcous123\t|签名。\n\ncardSign详见附录4。开发者特别注意：签名错误会导致拉取卡券列表异常为空，请仔细检查参与签名的参数有效性。\n\n**特别提醒**\n\n拉取列表仅与用户本地卡券有关，拉起列表异常为空的情况通常有三种：签名错误、时间戳无效、筛选机制有误。请开发者依次排查定位原因。\n\n### 批量添加卡券接口\n```javascript\nwx.addCard({\n    cardList: [{\n        cardId: \'\',\n        cardExt: \'\'\n    }], // 需要添加的卡券列表\n    success: function (res) {\n        var cardList = res.cardList; // 添加的卡券列表信息\n    }\n});\n```\n\ncardExt详见附录4，值得注意的是，这里的card_ext参数必须与参与签名的参数一致，格式为字符串而不是Object，否则会报签名错误。\n\n### 查看微信卡包中的卡券接口\n```javascript\nwx.openCard({\n    cardList: [{\n        cardId: \'\',\n        code: \'\'\n    }]// 需要打开的卡券列表\n});\n```\n\n### 核销后再次赠送卡券接口\n```javascript\nwx.consumeAndShareCard({\n    cardId: \'\',\n    code: \'\'\n});\n```\n\n参数说明：\n\n|参数\t|说明\n| --- | ---\n|cardId\t |上一步核销的card_id，若传入错误的card_id会报错\n|code\t |上一步核销的code，若传入错误的code会报错\n\n注意：\n该接口只支持微信6.3.6以上版本的客户端，开发者在调用时需要注意两点：\n\n1. 需要引入1.1.0版本的js文件： https://res.wx.qq.com/open/js/jweixin-1.1.0.js\n2. 需要判断用户客户端版本号，做出容错处理，详情点击：判断当前客户端版本是否支持指定JS接口\n\n## 微信支付\n\n### 发起一个微信支付请求\n```javascript\nwx.chooseWXPay({\n    timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符\n    nonceStr: \'\', // 支付签名随机串，不长于 32 位\n    package: \'\', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）\n    signType: \'\', // 签名方式，默认为\'SHA1\'，使用新版支付需传入\'MD5\'\n    paySign: \'\', // 支付签名\n    success: function (res) {\n        // 支付成功后的回调函数\n    }\n});\n```\n\n备注：prepay_id 通过微信支付统一下单接口拿到，paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。\n\n**请注意该接口只能在你配置的支付目录下调用，同时需确保支付目录在JS接口安全域名下。**\n\n微信支付开发文档：[https://pay.weixin.qq.com/wiki/doc/api/index.html](https://pay.weixin.qq.com/wiki/doc/api/index.html)\n","timestamp":1527227783532}]