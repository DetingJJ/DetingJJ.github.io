if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m03']=[{"name":"01-C# 实现窗口无边框，可拖动效果.md","path":"03-程序语言开发/02-C#/01-C# 实现窗口无边框，可拖动效果.md","content":"## C#窗口无边框，可拖动效果实现代码\r\n```C#\r\n#region 无边框拖动效果\r\n[DllImport(\"user32.dll\")]//拖动无窗体的控件\r\npublic static extern bool ReleaseCapture();\r\n[DllImport(\"user32.dll\")]\r\npublic static extern bool SendMessage(IntPtr hwnd, int wMsg, int wParam, int lParam);\r\npublic const int WM_SYSCOMMAND = 0x0112;\r\npublic const int SC_MOVE = 0xF010;\r\npublic const int HTCAPTION = 0x0002;\r\n\r\nprivate void Start_MouseDown(object sender, MouseEventArgs e)\r\n{\r\n   //拖动窗体\r\n   ReleaseCapture();\r\n   SendMessage(this.Handle, WM_SYSCOMMAND, SC_MOVE + HTCAPTION, 0);\r\n}\r\n#endregion\r\n```  \r\n在窗口属性界面添加事件服务  \r\n![](assets/03/20180323-cab99363.png)  \r\n","timestamp":1524637907288},{"name":"02-ToString方法一些特殊用法.md","path":"03-程序语言开发/02-C#/02-ToString方法一些特殊用法.md","content":"## ToString()用法\r\n### 取中文日期显示\r\n1. 年月日时分  \r\n urrentTime.ToString(\"f\"); //不显示秒    \r\n1. 年月  \r\n currentTime.ToString(\"y\");  \r\n1. 月日  \r\n currentTime.ToString(\"m\");  \r\n1. 格式为：2003-9-23\r\n currentTime.ToString(\"d\");  \r\n1. 格式为：14:24   \r\n currentTime.ToString(\"t\");  \r\n\r\n### 字符型转换 转为字符串\r\n12345.ToString(\"n\"); //结果：12,345.00  \r\n12345.ToString(\"C\");//结果：￥12,345.00  \r\n12345.ToString(\"e\"); //结果：1.234500e+004  \r\n12345.ToString(\"f4\");//结果：12345.0000  \r\n12345.ToString(\"x\"); //结果：3039 (16进制)  \r\n12345.ToString(\"p\");//结果：1,234,500.00%  \r\n\r\n---\r\n\r\n### datetime\r\n令DateTime.Now为2007-7-17 22:07:24  \r\n1. DateTime.Now.ToString(\"yy－MM－dd\")  \r\n处理后：07-07-17  \r\n1. DateTime.Now.ToString(\"yy年MM月dd日\")  \r\n处理后：07年07月17日（中文样式）  \r\n","timestamp":1524637907288},{"name":"03-简易缓冲池的建立.md","path":"03-程序语言开发/02-C#/03-简易缓冲池的建立.md","content":"# 简易缓冲池  \r\n在程序通信中，如果遇到数据量稍微大的时候，处理的不及时会造成数据挤压，甚至程序卡死。因此在设计时设计一个缓冲池，用于存储消息是必须的。当然只是一个简易的受限很大，谢谢小程序用用还行。  \r\n首先定义缓冲池结构体，为啥用结构体，你懂得！  \r\n```C#\r\npublic struct _loop_buf\r\n{\r\n    public int nUnitMaxCount;  // Number of data units\r\n    public int nUnitSize;\r\n    public int nReadPos; // Head for read\r\n    public int nWritePos; // Head for write\r\n    public byte[] byteDataBuf;\r\n};\r\n```\r\n缓冲池初始化，设置缓冲池每个存储单元的大小和缓冲池存储的最大数  \r\n```C#\r\n/// <summary>\r\n///缓冲池初始化\r\n/// </summary>\r\n/// <param name=\"nMaxCount\"></param>\r\n/// <param name=\"nSize\"></param>\r\n/// <returns>\r\n/// 0 返回正确 , -1 分配内存太大 0x7fffffff ,-2 存储单元最大数量太大 0x7ffffff0,-3 不能分配如此大的内存大小\r\n/// </returns>\r\npublic static int Init(ref _loop_buf loop_buf, int nMaxCount, int nSize)\r\n{\r\n    ulong total_size;\r\n    //loop_buf->buf_head = NULL;\r\n    total_size = (ulong)nMaxCount * (ulong)nSize;\r\n    if (total_size > 0x7fffffff) {\r\n        return -1;\r\n    }\r\n\r\n    if (nMaxCount > 0x7ffffff0)\r\n    {\r\n        return -1;\r\n    }\r\n\r\n    loop_buf.nUnitMaxCount = nMaxCount;\r\n    loop_buf.nUnitSize = nSize;\r\n    loop_buf.nReadPos = 0;\r\n    loop_buf.nWritePos = 0;\r\n\r\n    try\r\n    {\r\n        loop_buf.byteDataBuf = new byte[total_size];\r\n    }\r\n    catch (System.Exception ex)\r\n    {\r\n        return -3;\r\n    }\r\n    return 0;\r\n}\r\n```\r\n剩下的就是对缓冲池的常规操作了，重置，写入数据，取出数据等操作；  \r\n```C#\r\n/// <summary>\r\n/// 重置缓存池\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\npublic static void reset_loop_buf(ref _loop_buf loop_buf)\r\n{\r\n    loop_buf.nReadPos = 0;\r\n    loop_buf.nWritePos = 0;\r\n}\r\n\r\n/// <summary>\r\n/// 从换成池中读取数据\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\n/// <param name=\"byteData\"></param>\r\n/// <returns>\r\n/// 0 返回正确\r\n/// -1 缓冲池为空\r\n/// </returns>\r\npublic static int read_data_from_loop_buf(ref _loop_buf loop_buf, ref byte[] byteData)\r\n{\r\n    if (loop_buf.nReadPos == loop_buf.nWritePos)\r\n    {\r\n        return -1;\r\n    }\r\n\r\n    Array.Copy(loop_buf.byteDataBuf, loop_buf.nReadPos* loop_buf.nUnitSize, byteData, 0, loop_buf.nUnitSize);\r\n    if (loop_buf.nReadPos== (loop_buf.nUnitMaxCount - 1))\r\n    {\r\n        loop_buf.nReadPos = 0;\r\n    }\r\n    else\r\n    {\r\n        loop_buf.nReadPos++;\r\n    }\r\n    return 0;\r\n}\r\n\r\n/// <summary>\r\n/// 将数据写入缓冲区\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\n/// <param name=\"byteData\"></param>\r\n/// <returns>\r\n/// 0 返回正常\r\n/// -1 缓冲区已经满了\r\n/// </returns>\r\npublic static int write_data_to_loop_buf(ref _loop_buf loop_buf, byte[] byteData)\r\n{\r\n    int nTempWritePos = 0;\r\n\r\n    nTempWritePos = loop_buf.nWritePos + 1;\r\n    if (nTempWritePos >= loop_buf.nUnitMaxCount)\r\n    {\r\n        nTempWritePos = 0;\r\n    }\r\n\r\n    if (nTempWritePos == loop_buf.nReadPos)\r\n    {\r\n        // The buffer is full.\r\n        return -1;\r\n    }\r\n\r\n    Array.Copy(byteData, 0, loop_buf.byteDataBuf, loop_buf.nWritePos * loop_buf.nUnitSize, loop_buf.nUnitSize);\r\n\r\n    loop_buf.nWritePos = nTempWritePos;\r\n\r\n    return 0;\r\n}\r\n\r\n/// <summary>\r\n/// 从缓冲区中获取数据\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\n/// <returns></returns>\r\npublic static byte[] get_data_from_loop_buf(ref _loop_buf loop_buf)\r\n{\r\n    if (loop_buf.nReadPos == loop_buf.nWritePos) \r\n    {\r\n        // The buffer is null.\r\n        return null;\r\n    }\r\n    byte[] byteResult = new byte[loop_buf.nUnitSize];\r\n    Array.Copy(loop_buf.byteDataBuf, loop_buf.nReadPos * loop_buf.nUnitSize, byteResult, 0, loop_buf.nUnitSize);\r\n    return byteResult;\r\n}\r\n```\r\n","timestamp":1524637907288},{"name":"01-区块链.md","path":"03-程序语言开发/04-Python/01-区块链.md","content":"","timestamp":1524637907288}]