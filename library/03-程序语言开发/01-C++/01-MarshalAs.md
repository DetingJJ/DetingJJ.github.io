## MarshalAs  
MarshalAs是提供向非托管代码封送数据时的规则。比如String或StringBuilder型，传递给非托管代码的时候可能是LPStr LPWStr BStr等等。你通过MarshalAs特性告诉.NET应该封送成什么类型。  
Marshal就是把一个结构（类）序列化成一段内存，然后送到另一个进程（.net中Application domain)中供另一个进程中的函数使用。  
比如你的一个结构   
```C++ 
struct
{  
Pen pen;  
 }s; 
```
s是一个指向已有的Pen对象的引用，当你把s传给本进程中的一个函数f时,f可以很容易地找到pen的实际对象，但如果你把s传到另外一个进程时，甚至是另外一台机器上的进程时，这个进程就没办法找到pen的实际内容。Marshal技术则可以把pen对象中的所有实际内容按规则放到一个缓冲中，（所有的引用或指针都要转换成实际对象）然后把缓冲中的内容送到另一个进程，函数调用完成再用同样方式把结果返回来。在RPC,Interop,COM中Marshal应用很多。
```C++
[StructLayout(LayoutKind.Sequential)] 
public   struct   DVSNET_EMAIL_PARAM 
{ 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] 
        public   char[]   sServerName;	 //服务器名 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   32)] 
        public   char[]   sUserName;	 //用户名 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   32)] 
        public   char[]   sPasswd;	 //密码 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] 
        public   char[]   sFrom;	 //源EMAIL 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   128)] 
        public   char[]   sTo;	 //目标EMAIL 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] 
        public   char[]   sCC;	 //抄送 
        [MarshalAs(UnmanagedType.ByValArray,   SizeConst   =   64)] 
        public   char[]   sBCC;	 //抄送副本 
        public   uint   nReserve;	 //保留 
} 
```
```C++
public override int SetEmail(IntPtr hDev,  string ServerName,  string UserName,  string Passwd,  string From,  string To,  string CC,  string BCC)
{
        DVSNETClient.DVSNET_EMAIL_PARAM dfp = new DVSNETClient.DVSNET_EMAIL_PARAM();
        uint len = (uint)Marshal.SizeOf(dfp);
        IntPtr pdfp = Marshal.AllocHGlobal(Marshal.SizeOf(dfp));
        
        dfp.sServerName = new char[64];
        Array.Copy(ServerName.PadRight(64, '\0').ToCharArray(), dfp.sServerName,64);
        dfp.sUserName = new char[32];
        Array.Copy(UserName.PadRight(32, '\0').ToCharArray(), dfp.sUserName, 32);
        dfp.sPasswd = new char[32];
        Array.Copy(Passwd.PadRight(32, '\0').ToCharArray(), dfp.sPasswd, 32);
        dfp.sFrom = new char[128];
        Array.Copy(From.PadRight(128, '\0').ToCharArray(), dfp.sFrom, 128);
        dfp.sTo = new char[64];
        Array.Copy(To.PadRight(64, '\0').ToCharArray(), dfp.sTo, 64);
        dfp.sBCC = new char[64];
        Array.Copy(BCC.PadRight(64, '\0').ToCharArray(), dfp.sBCC, 64);
        dfp.sCC = new char[64];
        Array.Copy(CC.PadRight(64, '\0').ToCharArray(), dfp.sCC, 64);

        

        Marshal.StructureToPtr(dfp, pdfp, true);
        
        int r = SetServerParam(hDev, (uint)(0x10000 + 165), 0, pdfp, len);
        return r;
}
```

 



 