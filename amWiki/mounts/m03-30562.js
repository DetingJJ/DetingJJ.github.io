if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m03']=[{"name":"01-MarshalAs.md","path":"03-程序语言开发/01-C++/01-MarshalAs.md","content":"## MarshalAs  \r\nMarshalAs是提供向非托管代码封送数据时的规则。比如String或StringBuilder型，传递给非托管代码的时候可能是LPStr LPWStr BStr等等。你通过MarshalAs特性告诉.NET应该封送成什么类型。  \r\nMarshal就是把一个结构（类）序列化成一段内存，然后送到另一个进程（.net中Application domain)中供另一个进程中的函数使用。  \r\n比如你的一个结构   \r\n```C++ \r\nstruct\r\n{  \r\nPen pen;  \r\n }s; \r\n```\r\ns是一个指向已有的Pen对象的引用，当你把s传给本进程中的一个函数f时,f可以很容易地找到pen的实际对象，但如果你把s传到另外一个进程时，甚至是另外一台机器上的进程时，这个进程就没办法找到pen的实际内容。Marshal技术则可以把pen对象中的所有实际内容按规则放到一个缓冲中，（所有的引用或指针都要转换成实际对象）然后把缓冲中的内容送到另一个进程，函数调用完成再用同样方式把结果返回来。在RPC,Interop,COM中Marshal应用很多。\r\n```C++\r\n[StructLayout(LayoutKind.Sequential)] \r\npublic   struct   DVSNET_EMAIL_PARAM \r\n{ \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] \r\n        public   char[]   sServerName;\t //服务器名 \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   32)] \r\n        public   char[]   sUserName;\t //用户名 \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   32)] \r\n        public   char[]   sPasswd;\t //密码 \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] \r\n        public   char[]   sFrom;\t //源EMAIL \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   128)] \r\n        public   char[]   sTo;\t //目标EMAIL \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] \r\n        public   char[]   sCC;\t //抄送 \r\n        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] \r\n        public   char[]   sBCC;\t //抄送副本 \r\n        public   uint   nReserve;\t //保留 \r\n} \r\n```\r\n```C++\r\npublic override int SetEmail(IntPtr hDev,  string ServerName,  string UserName,  string Passwd,  string From,  string To,  string CC,  string BCC)\r\n{\r\n        DVSNETClient.DVSNET_EMAIL_PARAM dfp = new DVSNETClient.DVSNET_EMAIL_PARAM();\r\n        uint len = (uint)Marshal.SizeOf(dfp);\r\n        IntPtr pdfp = Marshal.AllocHGlobal(Marshal.SizeOf(dfp));\r\n        \r\n        dfp.sServerName = new char[64];\r\n        Array.Copy(ServerName.PadRight(64, \'\\0\').ToCharArray(), dfp.sServerName,64);\r\n        dfp.sUserName = new char[32];\r\n        Array.Copy(UserName.PadRight(32, \'\\0\').ToCharArray(), dfp.sUserName, 32);\r\n        dfp.sPasswd = new char[32];\r\n        Array.Copy(Passwd.PadRight(32, \'\\0\').ToCharArray(), dfp.sPasswd, 32);\r\n        dfp.sFrom = new char[128];\r\n        Array.Copy(From.PadRight(128, \'\\0\').ToCharArray(), dfp.sFrom, 128);\r\n        dfp.sTo = new char[64];\r\n        Array.Copy(To.PadRight(64, \'\\0\').ToCharArray(), dfp.sTo, 64);\r\n        dfp.sBCC = new char[64];\r\n        Array.Copy(BCC.PadRight(64, \'\\0\').ToCharArray(), dfp.sBCC, 64);\r\n        dfp.sCC = new char[64];\r\n        Array.Copy(CC.PadRight(64, \'\\0\').ToCharArray(), dfp.sCC, 64);\r\n\r\n        \r\n\r\n        Marshal.StructureToPtr(dfp, pdfp, true);\r\n        \r\n        int r = SetServerParam(hDev, (uint)(0x10000 + 165), 0, pdfp, len);\r\n        return r;\r\n}\r\n```\r\n\r\n \r\n\r\n\r\n\r\n ","timestamp":1524806888950},{"name":"02-SMTP邮件协议剖析.md","path":"03-程序语言开发/01-C++/02-SMTP邮件协议剖析.md","content":"摘要：本文介绍了一种采用SMTP协议规范并通过直接使用SMTP协议命令而在程序中实现电子邮件传送de方法.并在VC++开发环境下给出了部分关键de实现代码.\r\n\r\n　　前言\r\n\r\n　　电子邮件服务作为Internet上应用最多和最广de服务项目得到了非常广泛de应用，在网络应用中也起到非常重要de作用.如同其他de网络服务，电子邮件系统也有其使用de传输协议，包括SMTP（Simple Mail Transfer Protocol，简单邮件传输协议）、POP（Post Office Protocol，邮局协议）和IMAP（Internet Message Access Protocal，消息访问协议）等，这些协议应用于电子邮件de发送和接收.一些邮件处理软件如OutLook Express和FoxMail等就匙按照SMTP和POP3 协议结合Windows Sockets套接字进行设计来收发邮件de.本文以SMTP协议为研究对象，在Visual C++ 6.0编程环境下按照SMTP协议通过套接字发送SMTP命令，接收并处理邮件服务器de反馈信息，从而实现对电子邮件de发送.\r\n\r\n　　SMTP协议de通讯模型和会话流程\r\n\r\n　　SMTP协议通讯模型\r\n\r\n　　SMTP协议匙TCP/IP协议族中de一员，主要对如何将电子邮件从发送方地址传送到接收方地址，也即匙对传输de规则做了规定.SMTP协议de通信模型并不复杂，主要工作集中在发送SMTP和接收SMTP上：首先针对用户发出de邮件请求，由发送SMTP建立一条连接到接收SMTPde双工通讯链路，这里de接收SMTP匙相对于发送SMTP而言de，实际上它既可以匙最终de接收者也可以匙中间传送者.发送SMTP负责向接收SMTP发送SMTP命令，而接收SMTP则负责接收并反馈应答.可大致用下面de通讯模型示意图来表示：\r\n\r\n![](assets/03/01/02-1524806643000.png)\r\n\r\n　　SMTP协议de命令和应答\r\n\r\n　　从前面de通讯模型可以看出SMTP协议在发送SMTP和接收SMTP之间de会话匙靠发送SMTPde SMTP命令和接收SMTP反馈de应答来完成de.在通讯链路建立后，发送SMTP发送MAIL命令指令邮件发送者，若接收SMTP此时可以接收邮件则作出OKde应答，然后发送SMTP继续发出RCPT命令以确认邮件匙否收到，如果接收到就作出OKde应答，否则就发出拒绝接收应答，但这并不会对整个邮件操作造成影响.双方如此反复多次，直至邮件处理完毕.SMTP协议共包含10个SMTP命令，列表如下：\r\n\r\nSMTP命令\t命令说明\r\nHELLO ＜domain＞ ＜CRLF＞\t识别发送方到接收SMTPde一个HELLO命令\r\nMAIL FROM:＜reverse-path＞＜CRLF＞\t＜reverse-path＞为发送者地址.此命令告诉接收方一个新邮件发送de开始，并对所有de状态和缓冲区进行初始化.此命令开始一个邮件传输处理，最终完成将邮件数据传送到一个或多个邮箱中.\r\nRCPT TO:＜forward-path＞＜CRLF＞\t＜forward-path＞标识各个邮件接收者de地址\r\nDATA ＜CRLF＞\t\r\n接收SMTP将把其后de行为看作邮件数据去处理，以＜CRLF＞.＜CRLF＞标识数据de结尾.\r\nREST ＜CRLF＞\t退出/复位当前de邮件传输\r\nNOOP ＜CRLF＞\t要求接收SMTP仅做OK应答.（用于测试）\r\nQUIT ＜CRLF＞\t要求接收SMTP返回一个OK应答并关闭传输.\r\nVRFY ＜string＞ ＜CRLF＞\t验证指定de邮箱匙否存在，由于安全因素，服务器多禁止此命令.\r\nEXPN ＜string＞ ＜CRLF＞\t验证给定de邮箱列表匙否存在，扩充邮箱列表，也常禁止使用.\r\nHELP ＜CRLF＞\t查询服务器支持什么命令\r\n\r\n注：＜CRLF＞为回车、换行，ASCII码分别为13、10（十进制）.\r\n\r\n　　SMTP协议de每一个命令都会返回一个应答码，应答码de每一个数字都匙有特定含义de，如第一位数字为2时表示命令成功；为5表失败；3表没有完成.一些较复杂de邮件程序利用该特点，首先检查应答码de首数字，并根据其值来决定下一步de动作.下面将SMTPde应答码列表如下：\r\n\r\n应答码\t说明\r\n501\t参数格式错误\r\n502\t命令不可实现\r\n503\t错误de命令序列\r\n504\t命令参数不可实现\r\n211\t系统状态或系统帮助响应\r\n214\t帮助信息\r\n220\t＜domain＞服务就绪\r\n221\t＜domain＞服务关闭\r\n421\t＜domain＞服务未就绪，关闭传输信道\r\n250\t要求de邮件操作完成\r\n251\t用户非本地，将转发向＜forward-path＞\r\n450\t要求de邮件操作未完成，邮箱不可用\r\n550\t要求de邮件操作未完成，邮箱不可用\r\n451\t放弃要求de操作；处理过程中出错\r\n551\t用户非本地，请尝试＜forward-path＞\r\n452\t系统存储不足，要求de操作未执行\r\n552\t过量de存储分配，要求de操作未执行\r\n553\t邮箱名不可用，要求de操作未执行\r\n354\t开始邮件输入，以\".\"结束\r\n554\t操作失败\r\n\r\n　　在应用程序中使用SMTP协议\r\n\r\n　　SMTP协议de会话流程\r\n\r\n　　在进行程序设计之前有必要弄清SMTP协议de会话流程，其实前面介绍de内容已经可以大致勾勒出用SMTP发送邮件de框架了，对于一次普通de邮件发送，其过程大致为：先建立TCP连接，随后客户端发出HELLO命令以标识发件人自己de身份，并继续由客户端发送MAIL命令，如服务器应答为\"OK\"，可继续发送RCPT命令来标识电子邮件de收件人，在这里可以有多个RCPT行，而服务器端则表示匙否愿意为收件人接受该邮件.在双方协商结束后，用命令DATA将邮件发送出去，其中对表示结束de\".\"也一并发送出去.随后结束本次发送过程，以QUIT命令退出.下面通过一个实例，从langrui@sohu.com发送邮件到renping@sina.com来更详细直观地描述此会话流程：\r\n\r\nR:220 sina.com Simple Mail Transfer Service Ready\r\nS:HELLO sohu.com\r\nR:250 sina.com\r\nS:MAIL FROM:＜langrui@sohu.com＞\r\nR:250 OK\r\nS:RCPT TO:＜renping@sina.com＞\r\nR:250 OK\r\nS:DATA\r\nR:354 Start mail input;end with \"＜CRLF＞.＜CRLF＞\"\r\nS:……\r\nR:250 OK\r\nS:QUIT\r\nR:221 sina.com Service closing transmission channel\r\n\r\n　　邮件de格式化\r\n\r\n　　由于电子邮件结构上de特殊性，在传输时匙不能当作简单de文本来直接处理de，而必须按照一定de格式对邮件头和邮件体进行格式化处理之后才可以被发送.需要进行格式化de部分主要有：发件人地址、收件人地址、主题和发送日期等.在RFC文档deRFC 822里对邮件de格式化有详尽de说明，有关详情请参阅该文档.下面通过VC++6.0按照RFC 822文档规定将格式化邮件de部分编写如下（部分代码）：\r\n```\r\n//邮件头准备\r\nstrTemp = _T( \"From: \" ) + m_strFrom; file://发件人地址  \r\nadd_header_line( (LPCTSTR)strTemp );  \r\nstrTemp = _T( \"To: \" ) + m_strTo; file://收件人地址\r\nadd_header_line( (LPCTSTR)strTemp );\r\nm_tDateTime = m_tDateTime.GetCurrentTime();//发送时间\r\nstrTemp = _T( \"Data: \" );\r\nstrTemp += m_tDateTime.Format( \"%a, %d %b %y %H:%M:%S %Z\" );\r\nadd_header_line( (LPCTSTR)strTemp );\r\nstrTemp = _T( \"Subject: \" ) + m_strSubject; file://主题\r\nadd_header_line( (LPCTSTR)strTemp );\r\nfile://邮件头结束\r\nm_strHeader += _T( \"\\r\\n\" );\r\nfile://邮件体准备\r\nif( m_strBody.Right( 2 ) != _T( \"\\r\\n\" ) ) file://确认最后以回车换行结束\r\nm_strBody += _T( \"\\r\\n\" );\r\n```\r\n　　其中add_header_line(LPCTSTR szHeaderLine)函数用于把szHeaderLine指向de字串追加到m_strHeader后面.其中，格式化后de邮件头保存在m_strHeader里，格式化后de邮件体保存在m_strBody中.\r\n\r\n　　由Socket套接字为SMTP提供网络通讯基础\r\n\r\n　　许多网络程序都匙采用Socket套接字实现de，对于一些标准de网络协议如HTTP、FTP和SMTP等协议de编程也匙基于套接字程序de，只匙端口号不再匙随意设定而要由协议来指定，比如HTTP端口在80、FTP匙21，而SMTP则匙25.Socket只匙提供在指定de端口上同指定de服务器从事网络上de通讯能力，至于客户和服务器之间匙如何通讯de则由网络协议来规定，这对于套接字匙完全透明de.因此可以使用Socket套接字为程序提供网络通讯de能力，而对于网络通讯连路建立好之后采取什么样de通讯应答则要按SMTP协议de规定去执行了.Socket套接字网络编程方面de文章资料非常丰富，限于本文篇幅，在此不再赘述，有关详情请参阅相关文档.为简便起见，没有采用编写较复杂deWindows Sockets API进行编程，而匙使用经过较好封装deMFC deCSocket类.在正式使用套接字之前，也要先用AfxSocketInit()函数对套接字进行初始化，然后用Create()创建套接字对象，并由该套接字通过Connect（）建立同邮件服务器de连接.如果一切正常，再后续de工作中就匙遵循SMTP协议de约定来使用Send（）、Receive()函数来发送SMTP命令和接收邮件服务器发来de应答码以完成对邮件de传送.\r\n\r\n　　SMTP会话应答de实现\r\n\r\n　　在同邮件服务器建立好链路连接后就可以按前面介绍过de会话流程进行程序设计了，对于SMTP命令de发送，可按命令格式将其组帧完毕后用CSocket类deSend()函数将其发送到服务器，并通过CSocket类deReceive()函数接收从邮件服务器发来de应答码，并根据SMTP协议de应答码表对其做出响应de处理.下面匙用于接收应答码de函数get_response()de部分实现代码：\r\n```\r\nBOOL CSMTP::get_response( UINT response_expected )//输入参数为希望de应答码\r\n{\r\n……\r\n// m_wsSMTPServer为CSocketde类对象，调用Receive()将应答码接收到缓存\r\n// response_buf中\r\nm_wsSMTPServer.Receive( response_buf, RESPONSE_BUFFER_SIZE )\r\nsResponse = response_buf;\r\nsscanf( (LPCTSTR)sResponse.Left( 3 ), _T( \"%d\" ), &response );\r\npResp = &response_table[ response_expected ];\r\nfile://检验收到de应答码匙否匙所希望得到de\r\nif( response != pResp-＞nResponse )\r\n{\r\n……//不相等de话进行错误处理\r\nreturn FALSE;\r\n}\r\nreturn TRUE;\r\n}\r\n```\r\n　　会话de各个部分比较类似，都匙命令--应答方式，而且均成对出现，下面匙本文de重点也匙实现de关键部分--在程序控制下完成对SMTP命令de格式化以及对命令de发送和对邮件服务器应答码de检验处理：\r\n```\r\n//格式化并发送HELLO命令，并接收、验证服务器应答码\r\ngethostname( local_host, 80 );\r\nsHello.Format( _T( \"HELO %s\\r\\n\" ), local_host );\r\nm_wsSMTPServer.Send( (LPCTSTR)sHello, sHello.GetLength() );\r\nif( !get_response( GENERIC_SUCCESS ) ) file://检验应答码匙否为250\r\n{\r\n……\r\nreturn FALSE;\r\n}\r\nfile://格式化并发送MAIL命令，并接收、验证服务器应答码\r\nsFrom.Format( _T( \"MAIL From: ＜%s＞\\r\\n\" ), (LPCTSTR)msg-＞m_strFrom );\r\nm_wsSMTPServer.Send( (LPCTSTR)sFrom, sFrom.GetLength() );\r\nif( !get_response( GENERIC_SUCCESS ) ) file://检验应答码匙否为250\r\nreturn FALSE;\r\nfile://格式化并发送RCPT命令，并接收、验证服务器应答码\r\nsEmail=(LPCTSTR)msg-＞m_strTo;\r\nsTo.Format( _T( \"RCPT TO: ＜%s＞\\r\\n\" ), (LPCTSTR)sEmail );\r\nm_wsSMTPServer.Send( (LPCTSTR)sTo, sTo.GetLength() );\r\nif(!get_response( GENERIC_SUCCESS )) file://检验应答码匙否为250\r\nreturn FALSE;\r\nfile://格式化并发送DATA命令，并接收、验证服务器应答码\r\nsTemp = _T( \"DATA\\r\\n\" );\r\nm_wsSMTPServer.Send( (LPCTSTR)sTemp, sTemp.GetLength() );\r\nif( !get_response( DATA_SUCCESS ) ) file://检验应答码匙否为354\r\nreturn FALSE;\r\nfile://发送根据RFC 822文档规定格式化过de邮件头\r\nm_wsSMTPServer.Send( (LPCTSTR)msg-＞m_strHeader, msg-＞m_strHeader.GetLength() );\r\n……\r\nfile://发送根据RFC 822文档规定格式化过de邮件体\r\nsTemp = msg-＞m_strBody;\r\nif( sTemp.Left( 3 ) == _T( \".\\r\\n\" ) )\r\nsTemp = _T( \".\" ) + sTemp;\r\nwhile( (nPos = sTemp.Find( szBad )) ＞ -1 )\r\n{\r\nsCooked = sTemp.Mid( nStart, nPos );\r\nsCooked += szGood;\r\nsTemp = sCooked + sTemp.Right( sTemp.GetLength() - (nPos + nBadLength) );\r\n}\r\nm_wsSMTPServer.Send( (LPCTSTR)sTemp, sTemp.GetLength() );\r\nfile://发送内容数据结束标志\"＜CRLF＞.＜CRLF＞\"，并检验返回应答码\r\nsTemp = _T( \"\\r\\n.\\r\\n\" );\r\nm_wsSMTPServer.Send( (LPCTSTR)sTemp, sTemp.GetLength() );\r\nif( !get_response( GENERIC_SUCCESS ) )// 检验应答码匙否为250\r\nreturn FALSE;\r\n```\r\n　　到此为止，已基本在程序中体现出了SMTP协议de会话流程，能在Socket套接字所提供de网络通讯能力基础之上实现以SMTP命令和SMTP应答码为基本会话内容de通讯交互过程，从而最终实现SMTP协议对电子邮件de发送.\r\n\r\n　　结论\r\n\r\n　　电子邮件类软件作为Internet上de应用软件，其设计开发必须符合Internet上成熟de技术规范（如RFC文档系列规范）和相关协议（如POP、SMTP、IMAP以及LDAP等）.只有在遵循了上述规范和协议de基础上进行编程才能真正实现邮件类软件产品和服务de开放性和标准化.本文着重对SMTP协议及其在VC++编程中de应用做了介绍，并按照SMTP协议对电子邮件de发送进行了开放性和标准性较好de程序设计.本文所述程序在Windows 98下，由Microsoft Visual C++ 6.0编译通过.\r\n来源： <http://www.woaidiannao.com/dnbc/6077.html>\r\n ","timestamp":1524806888950},{"name":"01-C# 实现窗口无边框，可拖动效果.md","path":"03-程序语言开发/02-C#/01-C# 实现窗口无边框，可拖动效果.md","content":"## C#窗口无边框，可拖动效果实现代码\r\n```C#\r\n#region 无边框拖动效果\r\n[DllImport(\"user32.dll\")]//拖动无窗体的控件\r\npublic static extern bool ReleaseCapture();\r\n[DllImport(\"user32.dll\")]\r\npublic static extern bool SendMessage(IntPtr hwnd, int wMsg, int wParam, int lParam);\r\npublic const int WM_SYSCOMMAND = 0x0112;\r\npublic const int SC_MOVE = 0xF010;\r\npublic const int HTCAPTION = 0x0002;\r\n\r\nprivate void Start_MouseDown(object sender, MouseEventArgs e)\r\n{\r\n   //拖动窗体\r\n   ReleaseCapture();\r\n   SendMessage(this.Handle, WM_SYSCOMMAND, SC_MOVE + HTCAPTION, 0);\r\n}\r\n#endregion\r\n```  \r\n在窗口属性界面添加事件服务  \r\n![](assets/03/20180323-cab99363.png)  \r\n","timestamp":1524806888950},{"name":"02-ToString方法一些特殊用法.md","path":"03-程序语言开发/02-C#/02-ToString方法一些特殊用法.md","content":"## ToString()用法\r\n### 取中文日期显示\r\n1. 年月日时分  \r\n urrentTime.ToString(\"f\"); //不显示秒    \r\n1. 年月  \r\n currentTime.ToString(\"y\");  \r\n1. 月日  \r\n currentTime.ToString(\"m\");  \r\n1. 格式为：2003-9-23\r\n currentTime.ToString(\"d\");  \r\n1. 格式为：14:24   \r\n currentTime.ToString(\"t\");  \r\n\r\n### 字符型转换 转为字符串\r\n12345.ToString(\"n\"); //结果：12,345.00  \r\n12345.ToString(\"C\");//结果：￥12,345.00  \r\n12345.ToString(\"e\"); //结果：1.234500e+004  \r\n12345.ToString(\"f4\");//结果：12345.0000  \r\n12345.ToString(\"x\"); //结果：3039 (16进制)  \r\n12345.ToString(\"p\");//结果：1,234,500.00%  \r\n\r\n---\r\n\r\n### datetime\r\n令DateTime.Now为2007-7-17 22:07:24  \r\n1. DateTime.Now.ToString(\"yy－MM－dd\")  \r\n处理后：07-07-17  \r\n1. DateTime.Now.ToString(\"yy年MM月dd日\")  \r\n处理后：07年07月17日（中文样式）  \r\n","timestamp":1524806888950},{"name":"03-简易缓冲池的建立.md","path":"03-程序语言开发/02-C#/03-简易缓冲池的建立.md","content":"# 简易缓冲池  \r\n在程序通信中，如果遇到数据量稍微大的时候，处理的不及时会造成数据挤压，甚至程序卡死。因此在设计时设计一个缓冲池，用于存储消息是必须的。当然只是一个简易的受限很大，谢谢小程序用用还行。  \r\n首先定义缓冲池结构体，为啥用结构体，你懂得！  \r\n```C#\r\npublic struct _loop_buf\r\n{\r\n    public int nUnitMaxCount;  // Number of data units\r\n    public int nUnitSize;\r\n    public int nReadPos; // Head for read\r\n    public int nWritePos; // Head for write\r\n    public byte[] byteDataBuf;\r\n};\r\n```\r\n缓冲池初始化，设置缓冲池每个存储单元的大小和缓冲池存储的最大数  \r\n```C#\r\n/// <summary>\r\n///缓冲池初始化\r\n/// </summary>\r\n/// <param name=\"nMaxCount\"></param>\r\n/// <param name=\"nSize\"></param>\r\n/// <returns>\r\n/// 0 返回正确 , -1 分配内存太大 0x7fffffff ,-2 存储单元最大数量太大 0x7ffffff0,-3 不能分配如此大的内存大小\r\n/// </returns>\r\npublic static int Init(ref _loop_buf loop_buf, int nMaxCount, int nSize)\r\n{\r\n    ulong total_size;\r\n    //loop_buf->buf_head = NULL;\r\n    total_size = (ulong)nMaxCount * (ulong)nSize;\r\n    if (total_size > 0x7fffffff) {\r\n        return -1;\r\n    }\r\n\r\n    if (nMaxCount > 0x7ffffff0)\r\n    {\r\n        return -1;\r\n    }\r\n\r\n    loop_buf.nUnitMaxCount = nMaxCount;\r\n    loop_buf.nUnitSize = nSize;\r\n    loop_buf.nReadPos = 0;\r\n    loop_buf.nWritePos = 0;\r\n\r\n    try\r\n    {\r\n        loop_buf.byteDataBuf = new byte[total_size];\r\n    }\r\n    catch (System.Exception ex)\r\n    {\r\n        return -3;\r\n    }\r\n    return 0;\r\n}\r\n```\r\n剩下的就是对缓冲池的常规操作了，重置，写入数据，取出数据等操作；  \r\n```C#\r\n/// <summary>\r\n/// 重置缓存池\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\npublic static void reset_loop_buf(ref _loop_buf loop_buf)\r\n{\r\n    loop_buf.nReadPos = 0;\r\n    loop_buf.nWritePos = 0;\r\n}\r\n\r\n/// <summary>\r\n/// 从换成池中读取数据\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\n/// <param name=\"byteData\"></param>\r\n/// <returns>\r\n/// 0 返回正确\r\n/// -1 缓冲池为空\r\n/// </returns>\r\npublic static int read_data_from_loop_buf(ref _loop_buf loop_buf, ref byte[] byteData)\r\n{\r\n    if (loop_buf.nReadPos == loop_buf.nWritePos)\r\n    {\r\n        return -1;\r\n    }\r\n\r\n    Array.Copy(loop_buf.byteDataBuf, loop_buf.nReadPos* loop_buf.nUnitSize, byteData, 0, loop_buf.nUnitSize);\r\n    if (loop_buf.nReadPos== (loop_buf.nUnitMaxCount - 1))\r\n    {\r\n        loop_buf.nReadPos = 0;\r\n    }\r\n    else\r\n    {\r\n        loop_buf.nReadPos++;\r\n    }\r\n    return 0;\r\n}\r\n\r\n/// <summary>\r\n/// 将数据写入缓冲区\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\n/// <param name=\"byteData\"></param>\r\n/// <returns>\r\n/// 0 返回正常\r\n/// -1 缓冲区已经满了\r\n/// </returns>\r\npublic static int write_data_to_loop_buf(ref _loop_buf loop_buf, byte[] byteData)\r\n{\r\n    int nTempWritePos = 0;\r\n\r\n    nTempWritePos = loop_buf.nWritePos + 1;\r\n    if (nTempWritePos >= loop_buf.nUnitMaxCount)\r\n    {\r\n        nTempWritePos = 0;\r\n    }\r\n\r\n    if (nTempWritePos == loop_buf.nReadPos)\r\n    {\r\n        // The buffer is full.\r\n        return -1;\r\n    }\r\n\r\n    Array.Copy(byteData, 0, loop_buf.byteDataBuf, loop_buf.nWritePos * loop_buf.nUnitSize, loop_buf.nUnitSize);\r\n\r\n    loop_buf.nWritePos = nTempWritePos;\r\n\r\n    return 0;\r\n}\r\n\r\n/// <summary>\r\n/// 从缓冲区中获取数据\r\n/// </summary>\r\n/// <param name=\"loop_buf\"></param>\r\n/// <returns></returns>\r\npublic static byte[] get_data_from_loop_buf(ref _loop_buf loop_buf)\r\n{\r\n    if (loop_buf.nReadPos == loop_buf.nWritePos) \r\n    {\r\n        // The buffer is null.\r\n        return null;\r\n    }\r\n    byte[] byteResult = new byte[loop_buf.nUnitSize];\r\n    Array.Copy(loop_buf.byteDataBuf, loop_buf.nReadPos * loop_buf.nUnitSize, byteResult, 0, loop_buf.nUnitSize);\r\n    return byteResult;\r\n}\r\n```\r\n","timestamp":1524806888950},{"name":"04-Net开源项目.md","path":"03-程序语言开发/02-C#/04-Net开源项目.md","content":"## 综合类\r\n\r\n1.  [微软企业库](https://entlib.codeplex.com/)&nbsp;微软官方出品,是为了协助开发商解决企业级应用开发过程中所面临的一系列共性的问题, 如安全(Security)、日志(Logging)、数据访问(Data Access)、配置管理(Configuration Manage)等，并将这些广泛使用的应用程序块集成封装至一个叫企业库的程序包中\r\n2.  [CommonLibrary.net](https://commonlibrarynet.codeplex.com/)&nbsp;一个帮助类库,包含了ActiveRecord, Csv, Command Line Parsing, Configuration, Validation, Logging, Collections, Authentication等等\r\n3.  [Castle](http://www.castleproject.org/)&nbsp;一个传统的综合类库,包含IOC容器,基于ActiveRecord模式的ORM,类MVC框架,核心,现在用的比较多的是核心Castle.Core, 里面包含了基于虚拟工厂的日志抽象,动态代理DynamicProxy,Dictionary Adapter(可以将一个接口转化为强类型的Dictionary对象,具体大家可以查一查,某些场景下很有用)\r\n\r\n## <a name=\"t1\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>IOC容器\r\n\r\n1.  [Autofac](https://code.google.com/p/autofac/)&nbsp;我最喜欢的一个IOC容器,特性丰富,除了IOC的基本功能外,还提供模块化和程序集扫描,内置了很多有用的扩展(Lazy,Func,Owned,IEnumrable)等等,而且对asp.net,mvc,mef,wcf,dynamicProxy等等提供了集成.\r\n2.  [Unity](https://unity.codeplex.com/)&nbsp;微软企业库的基础,功能简单,扩展方便,微软官方提供一个EventBus的扩展例子,值得一看\r\n3.  [Ninject](http://www.ninject.org/)&nbsp;主打特性简单易用,很多讲MVC的书中都用这个做例子\r\n4.  [StructureMap](http://docs.structuremap.net/)&nbsp;一个传统的IOC容器,很早就出来了,性能优越,功能稳定,已经不更新了(在一个IOC容器的性能测试中性能最佳)\r\n\r\n## <a name=\"t2\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>ORM框架\r\n\r\n1.  [NHibernate](https://github.com/nhibernate)&nbsp;一个传统的ORM,移植于java的Hibernate,3.0后发展迅速,提供FluentMap和FluentConfig,支持Linq,支持 HQL和NativeSQL,支持一级缓存和二级缓存,丰富的ID生成策略,更多的拦截事件暴露,支持常见的所有数据库,缺点就是配置选项有点多,初学者无处下手\r\n2.  [EntityFramework](http://www.cnblogs.com/Mercurius/admin/)&nbsp;微软官方出的ORM,配置简单,比NH更好的Linq支持,工具支持和较低的学习门槛,命名约定配置,支持CodeFirst DbMigration(在开发时,不能用在生产环境中),缺点就是不支持批量操作(第三方库EntityFramework.Extension扩展了这一点,还做了缓存),无原生的二级缓存,,单调的ID生成方式,不支持多数据库(很多数据库如MySql都对EF提供了支持,但是bug多多,有稳定的商业库可以选择),还有单一的配置方式(当你想从程序集动态加载model到DbContext中时,你就会知道就多捉鸡)\r\n3.  [Dapper](http://code.google.com/p/dapper-dot-net/)&nbsp;StackOverflow开源的一个MiniOrm,性能和原生ado.net相近,0配置,强类型支持.缺点同样是有小bug,较弱的LINQ支持 (只找到一个MSSQL的linq插件)有两个关于Dapper的扩展,一个叫Dapper.Extension,一个叫 Dapper.Rainbow.Mysql.这两个扩展可能更接近传统意义上的ORM\r\n4.  [ServiceStack.OrmLite](https://github.com/ServiceStack/ServiceStack.OrmLite)&nbsp;另外一个MiniORM,性能仅次于Dapper,支持大部分的数据库,比Dapper丰富的多的API和更好的强类型lambda表达式查询条件支持,映射0配置,也支持以Attribute配置,支持表的创建和删除,好东西.我最喜欢~~\r\n\r\n## <a name=\"t3\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>文档操作\r\n\r\n1.  [EppPlus](https://epplus.codeplex.com/)&nbsp;使用xlsx协议读写Excel2007/2010,功能非常多\r\n2.  [DocX](https://docx.codeplex.com/)&nbsp;读写Word2007/2010文件,无需安装office\r\n3.  [PdfSharp](https://pdfsharp.codeplex.com/)&nbsp;操作pdf\r\n\r\n## <a name=\"t4\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>基础类库\r\n\r\n1.  [AutoMapper](https://automapper.codeplex.com/)&nbsp;对象映射,常用来做DTO/ViewModel和Model之间的映射,功能丰富远超你想象\r\n2.  [Html Agility Pack](https://htmlagilitypack.codeplex.com/)Html解析库\r\n3.  [Json.net](https://json.codeplex.com/)&nbsp;Json序列化和反序列化,基本支持所有的json特性,性能也很好,MVC4的默认引用程序集中已包含.(支持4.0的动态对象,这个很好用)\r\n4.  [FluentValidation](https://fluentvalidation.codeplex.com/)&nbsp;类似于4.0新出的代码契约,用于对业务对象创建验证规则.其本身已经内置了很多的规则\r\n5.  [DotNetZip&nbsp;](https://dotnetzip.codeplex.com/)创建,压缩,解压Zip文件\r\n6.  [SharpZipLib](http://www.icsharpcode.net/)&nbsp;创建,压缩,解压Zip文件\r\n7.  [SevenZipSharp](https://sevenzipsharp.codeplex.com/)&nbsp;支持7zip所有格式的压缩和解压缩\r\n8.  [Rx](https://rx.codeplex.com/)&nbsp;使用可观测对象(IObservable)的序列和 LINQ 风格的查询操作来编写异步和基于事件的程序。开发人员可通过 Rx 使用可观测对象来表示异步数据流，并使用 LINQ 操作来查询异步数据流。简而言之：Rx = Observables + LINQ + Schedulers.\r\n9.  [Microsoft.Bcl.Async](https://www.nuget.org/packages/Microsoft.Bcl.Async)&nbsp;可以在4.0中使用4.5中新增的async和await两个关键字\r\n\r\n## <a name=\"t5\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>辅助开发\r\n\r\n1.  [Autoupdate](https://autoupdaterdotnet.codeplex.com/)&nbsp;为你的程序一键增加更新功能\r\n2.  [NetSparkle&nbsp;](https://netsparkle.codeplex.com/)一个独立的升级框架,不依赖于你的程序和代码\r\n3.  [MailSystem.NET](https://mailsystem.codeplex.com/)&nbsp;功能强大的电子邮件组件,提供对SMTP, POP3, IMAP4, NNTP, MIME, S/MIME, OpenPGP, DNS, vCard, vCalendar, Anti-Spam (Bayesian , RBL, DomainKeys), Queueing, Mail Merge and WhoIs的支持\r\n4.  [FluentMigrator](https://github.com/schambers/fluentmigrator)&nbsp;一个类似于RubyMigrations的数据库Migration框架\r\n5.  [GMap.Net](https://greatmaps.codeplex.com/)&nbsp;一个强大的.NET地图控件,可以用于Winform和WPF,跨平台,支持 Coogle, Yahoo!, Bing, OpenStreetMap, ArcGIS, Pergo, SigPac, Yandex, Mapy.cz, Maps.lt, iKarte.lv, NearMap, OviMap, CloudMade, WikiMapia, MapQuest ,同学们可以根据需求扩展国内的版本.\r\n\r\n## <a name=\"t6\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>企业总线\r\n\r\n1.  [Shuttle ESB](https://shuttle.codeplex.com/)&nbsp;一个开源的企业总线,C#编写,不依赖第三方程序集,支持MSMQ和table-based queue\r\n2.  [NServiceBus](http://particular.net/nservicebus)&nbsp;最流行的.NET开源总线,不依赖于xml配置,支持MSMQ, RabbitMQ, ActiveMQ, WebSphereMQ, Azure,其次配套设施十分齐全,比如对autofac的集成\r\n\r\n## <a name=\"t7\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>服务器\r\n\r\n1.  [Katana](https://katanaproject.codeplex.com/)&nbsp;包含一系列的服务器组件,用来创建自包含的web应用程序.\r\n2.  [CassiniDev](https://cassinidev.codeplex.com/)&nbsp;开源的asp.net服务器,IIS的替代品\r\n3.  [IISTuner](https://iistuner.codeplex.com/)&nbsp;IIS配置优化工具\r\n\r\n## <a name=\"t8\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>图形图像\r\n\r\n1.  [SharpGL](https://sharpgl.codeplex.com/)&nbsp;OpenGL的C#封装,更新很\r\n\r\n2.  快,基本可以与Glew保持一致.\r\n\r\n3.  [Magick.NET](https://magick.codeplex.com/)&nbsp;强大的图片处理库,可以处理超过100种格式,无需安装ImageMagick\r\n4.  [DotNet.Highcharts](https://dotnethighcharts.codeplex.com/)&nbsp;Highcharts的封装,用于asp.net,强类型和智能提示,渣前端开发者的福音.\r\n\r\n## <a name=\"t9\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>日志\r\n> 日志框架如何选择如果你使用了微软企业库,就用企业库自带的,如果你引入的程序集中有的使用了Log4net,那就最好使用Log4net,如果都没有,看个人喜好\r\n\r\n1.  [Log4net](http://logging.apache.org/log4net/)&nbsp;传统的日志框架,移植于log4jV1.2,高效,稳定\r\n2.  [NLog](https://github.com/nlog/NLog/)&nbsp;官方介绍为高级日志框架,与Log4net相比,有比较强的配置文件自纠错能力,更加丰富的LogAppender.\r\n3.  [Logging Application Block](https://entlib.codeplex.com/releases/view/101823)&nbsp;微软企业库自带的日志记录模块\r\n4.  [Semantic Logging Application Block](https://entlib.codeplex.com/releases/view/101823)&nbsp;微软企业库新出的日志记录框架,理念上不同于前面三个,具体可以参考http://blogs.msdn.com/b/agile/archive/2013/02/07/embracing-semantic-logging.aspx\r\n\r\n## <a name=\"t10\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>CMS\r\n\r\n1.  [Orchard](http://www.orchardproject.net/)&nbsp;CMS的新起之秀,基于Asp.net MVC.扩展很多.非常值得作为源码学习(值得学习的模块有IOC的深度应用,基于IOC的EventBus,高度抽象的模板系统,Cache,插件化体系,基于NH的数据迁移框架)\r\n2.  [DotNetNuke](http://www.cnblogs.com/Mercurius/admin/)&nbsp;DotNetNuke 是微软支持的一套非常优秀的基于asp.net的开源门户网站程序,功能强大,地位类似于PHP中的WordPress\r\n3.  [Umbraco](https://github.com/umbraco/Umbraco-CMS)&nbsp;Umbraco 是一种基于.NET技术的开源的CMS（Content Management System），使用SQL Server或MySQL进行存储数据。Umbraco最大的特色是简单、灵活、易用，不管对于开发者还是网站管理者。 Umbraco还提供了WYSIWYG 编辑器几乎与Microsoft Word完全一样\r\n\r\n## <a name=\"t11\" style=\"padding: 0px; margin: 0px; color: rgb(34, 116, 155);\"></a>工具篇\r\n\r\n1.  [nuget](http://www.cnblogs.com/Mercurius/admin/)&nbsp;vs必备插件第一,项目依赖文件管理.也可以在部门内部架设自己的nuget服务器,用于协作开发中的程序集发布.\r\n2.  [Sandcastle Help File Builder](https://shfb.codeplex.com/)&nbsp;Sandcastle本身是微软出品的一个文档生成工具,用来代替NDoc,SHFB基于SandCastle,提供了更多的选项,工具支持和vs集成,推荐使用\r\n<div style=\"color:gray\"><small>来源：&nbsp;&lt;[http://www.open-open.com/lib/view/open1393838784177.html](http://www.open-open.com/lib/view/open1393838784177.html)<small>&gt;</small></small></div><small><small>&nbsp;</small></small>\r\n\r\n","timestamp":1524806888950},{"name":"05-CSharp调用WinApi方法.md","path":"03-程序语言开发/02-C#/05-CSharp调用WinApi方法.md","content":"API函数是构筑Windows应用程序的基石，是Windows编程的必备利器。每一种Windows应用程序开发工具都提供了间接或直接调用了windowsAPI函数的方法，或者是调用Windows API函数的接口，也就是说具备调用动态连接库的能力。Visual C#和其它开发工具一样也能够调用动态链接\r\n库的API函数。本文中笔者就结合实例向大家介绍在Visual C#中如何调用各种返回值的API，该实例就是一个通过API函数调用获取系统信息的\r\n程序。  \r\n首先，在调用API之前，你必须先导入System.Runtime.InteropServices这个名称空间。该名称空间包含了在Visual C#中调用API的一些必要集合，具体的方法如下：  \r\n`using System.Runtime.InteropServices;  `\r\n在导入了名称空间后，我们要声明在程序中所要用到的API函数。我们的程序主要是获取系统的相关信息，所以用到的API函数都是返回系统信息的。先给出在Visual C#中声明API的方法：  \r\n```C#\r\n[DllImport(\"kernel32\")]  \r\npublic static extern void   \r\nGetWindowsDirectory(StringBuilder WinDir,int count);  \r\n```\r\n其中，\"DllImport\"属性用来从不可控代码中调用一个方法，它指定了DLL的位置，该DLL中包含调用的外部方法；\"kernel32\"设定了类库名；public\"指明函数的访问类型为公有的；\"static\"修饰符声明一个静态元素，而该元素属于类型本身而不是指定的对象；\"extern\"表示该方法将在工程外部执行，同时使用DllImport导入的方法必须使用\"extern\"修饰符；最后GetWindowsDirectory函数包含了两个参数，一个为StringBuilder类型的，另一个为int类型的，该方法返回的内容存在于StringBuilder类型的参数中。同时，因为我们在这里使用到了StringBuilder类，所以在程序的开始处，我们还得添加System.Text这个名称空间，方法同上。  \r\n其他几个API函数的声明如下：\r\n```C#\r\n[DllImport(\"kernel32\")]\r\npublic static extern void \r\nGetSystemDirectory(StringBuilder SysDir,int count);\r\n\r\n[DllImport(\"kernel32\")]\r\npublic static extern void GetSystemInfo(ref \r\nCPU_INFO cpuinfo);\r\n\r\n[DllImport(\"kernel32\")]\r\npublic static extern void GlobalMemoryStatus(ref \r\nMEMORY_INFO meminfo);\r\n\r\n[DllImport(\"kernel32\")]\r\npublic static extern void GetSystemTime(ref \r\nSYSTEMTIME_INFO stinfo);\r\n```\r\n以上几个API的作用分别是获取系统路径，获得CPU相关信息，获得内存的相关信息，获得系统时间等.在声明完所有的API函数后，我们发现后三个函数分别用到了CPU_INFO、MEMORY_INFO、SYSTEMTIME_INFO等结构，这些结构并非是.Net内部的，它们从何而来？其实，我们在用到以上API调用时均需用到以上结构，我们将函数调用获得的信息存放在以上的结构体中，最后返回给程序输出。这些结构体比较复杂，但是如果开发者能够熟练运用，那么整个API世界将尽在开发者的掌握之中。以下就是上述结构体的声明：   \r\n```C#\r\n//定义以下各结构\r\n//定义CPU的信息结构\r\n[StructLayout(LayoutKind.Sequential)]\r\npublic \r\nstruct CPU_INFO\r\n{\r\npublic uint dwOemId;\r\npublic uint \r\ndwPageSize;\r\npublic uint lpMinimumApplicationAddr<WBR>ess;\r\npublic uint \r\nlpMaximumApplicationAddr<WBR>ess;\r\npublic uint \r\ndwActiveProcessorMask;\r\npublic uint dwNumberOfProcessors;\r\npublic uint \r\ndwProcessorType;\r\npublic uint dwAllocationGranularity;\r\npublic uint \r\ndwProcessorLevel;\r\npublic uint dwProcessorRevision;\r\n}\r\n\r\n//定义内存的信息结构\r\n[StructLayout(LayoutKind.Sequential)]\r\npublic struct \r\nMEMORY_INFO\r\n{\r\npublic uint dwLength;\r\npublic uint dwMemoryLoad;\r\npublic \r\nuint dwTotalPhys;\r\npublic uint dwAvailPhys;\r\npublic uint \r\ndwTotalPageFile;\r\npublic uint dwAvailPageFile;\r\npublic uint \r\ndwTotalVirtual;\r\npublic uint dwAvailVirtual;\r\n}\r\n\r\n//定义系统时间的信息结构\r\n[StructLayout(LayoutKind.Sequential)]\r\npublic struct \r\nSYSTEMTIME_INFO\r\n{\r\npublic ushort wYear;\r\npublic ushort wMonth;\r\npublic \r\nushort wDayOfWeek;\r\npublic ushort wDay;\r\npublic ushort wHour;\r\npublic \r\nushort wMinute;\r\npublic ushort wSecond;\r\npublic ushort \r\nwMilliseconds;\r\n}\r\n```\r\n结构体定义的主体部分和C++中的没多大差别，具体每个结构体内部成员的定义可参考联机帮助中的SDK文档。同时，我们还发现在每个结\r\n构体定义的上面都有一句用中括号括起来的说明性文字。这些说明都是有关结构体成员的布局的，共有三种选项，分别说明如下：  \r\nLayoutKind.Automatic：为了提高效率允许运行态对类型成员重新排序。  \r\n注意：永远不要使用这个选项来调用不受管辖的动态链接库函数。  \r\nLayoutKind.Explicit：对每个域按照FieldOffset属性对类型成员排序  \r\nLayoutKind.Sequential：对出现在受管辖类型定义地方的不受管辖内存中的类型成员进行排序。  \r\n在上面的程序中，为了方便起见我们都用到了第三种方式。  \r\n所有的API函数以及相关的结构体声明完毕后，我们就运用这些API来实现我们的程序功能――获取系统的相关信息。  \r\n简单的界面布置好后，我们添加一个按钮（\"获取信息\"按钮）的消息处理函数如下：\r\n```C#\r\nprivate void GetInfo_Click(object sender, System.EventArgs e)\r\n{\r\n//调用GetWindowsDirectory和GetSystemDirectory函数分别取得Windows路径和系统路径\r\nconst \r\nint nChars = 128;\r\nStringBuilder Buff = new StringBuilder(nChars);\r\nGetWindowsDirectory(Buff,nChars);\r\nWindowsDirectory.Text \r\n= \r\n\"Windows路径：\"+Buff.ToString();\r\nGetSystemDirectory(Buff,nChars);\r\nSystemDirectory.Text \r\n= \"系统路径：\"+Buff.ToString();\r\n\r\n//调用GetSystemInfo函数获取CPU的相关信息\r\nCPU_INFO CpuInfo;\r\nCpuInfo = new CPU_INFO();\r\nGetSystemInfo(ref CpuInfo);\r\nNumberOfProcessors.Text = \r\n\"本计算机中有\"+CpuInfo.dwNumberOfProcessors.ToString()+\"个CPU\";\r\nProcessorType.Text = \r\n\"CPU的类型为\"+CpuInfo.dwProcessorType.ToString();\r\nProcessorLevel.Text = \r\n\"CPU等级为\"+CpuInfo.dwProcessorLevel.ToString();\r\nOemId.Text = \"CPU的OEM \r\nID为\"+CpuInfo.dwOemId.ToString();\r\nPageSize.Text = \r\n\"CPU中的页面大小为\"+CpuInfo.dwPageSize.ToString();\r\n\r\n//调用GlobalMemoryStatus函数获取内存的相关信息\r\nMEMORY_INFO MemInfo;\r\nMemInfo = new MEMORY_INFO();\r\nGlobalMemoryStatus(ref MemInfo);\r\nMemoryLoad.Text = \r\nMemInfo.dwMemoryLoad.ToString()+\"%的内存正在使用\";\r\nTotalPhys.Text = \r\n\"物理内存共有\"+MemInfo.dwTotalPhys.ToString()+\"字节\";\r\nAvailPhys.Text = \r\n\"可使用的物理内存有\"+MemInfo.dwAvailPhys.ToString()+\"字节\";\r\nTotalPageFile.Text = \r\n\"交换文件总大小为\"+MemInfo.dwTotalPageFile.ToString()+\"字节\";\r\nAvailPageFile.Text = \r\n\"尚可交换文件大小为\"+MemInfo.dwAvailPageFile.ToString()+\"字节\";\r\nTotalVirtual.Text = \r\n\"总虚拟内存有\"+MemInfo.dwTotalVirtual.ToString()+\"字节\";\r\nAvailVirtual.Text = \r\n\"未用虚拟内存有\"+MemInfo.dwAvailVirtual.ToString()+\"字节\";\r\n\r\n//调用GetSystemTime函数获取系统时间信息\r\nSYSTEMTIME_INFO StInfo;\r\nStInfo = new SYSTEMTIME_INFO();\r\nGetSystemTime(ref StInfo);\r\nDate.Text = \r\nStInfo.wYear.ToString()+\"年\"+StInfo.wMonth.ToString()+\"月\"+StInfo.wDay.ToString()+\"日\";\r\nTime.Text = (StInfo.wHour+8).ToString()+\"点\"+StInfo.wMinute.ToString()+\"分\"+StInfo.wSecond.ToString()+\"秒\";\r\n}\r\n```\r\n在上面的消息处理函数中，我们运用了在程序开始处声明的各个API函数获取了系统的相关信息，并最终在界面上以文本标签的方式显示结果。各个文本标签的命名方式可以参见文后附带的源代码，此处暂略。  \r\n结束语：  \r\n通过本文的学习，我相信稍有API使用基础的开发者可以马上触类旁通，很快掌握Visual C#中对API的操作。上面给出的实例仅仅是一个非常简单的示例程序，不过有兴趣的读者可以进一步完善其功能，做出更完美的系统信息检测程序。  ","timestamp":1524806888950},{"name":"01-区块链.md","path":"03-程序语言开发/04-Python/01-区块链.md","content":"","timestamp":1524806888950},{"name":"01-Oracle密码过期，取消密码180天限制.md","path":"03-程序语言开发/05-数据库/01-Oracle密码过期，取消密码180天限制.md","content":"## Oracle密码过期，取消密码180天限制\r\n1. 进入sqlplus模式\r\n```sql\r\nsqlplus / as sysdba;\r\n```\r\n1. 查看用户密码的有效期设置(一般默认的配置文件是DEFAULT)\r\n```sql\r\n　　SELECT * FROM dba_profiles WHERE profile=\'DEFAULT\' AND resource_name=\'PASSWORD_LIFE_TIME\';\r\n```\r\n1. 将密码有效期由默认的180天修改成“无限制”，修改之后不需要重启动数据库，会立即生效\r\n```sql\r\n　　ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;\r\n```\r\n1. 帐户再改一次密码\r\n```sql\r\n　　alter user 用户名 identified by 原密码;\r\n```\r\n1. 使用修改后的用户登录，如果报“ORA-28000:用户已被锁”，解锁\r\n```sql\r\n　　alter user db_user account unlock;\r\n　　commit;\r\n```\r\n\r\n","timestamp":1524806888950}]