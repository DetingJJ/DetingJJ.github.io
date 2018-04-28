API函数是构筑Windows应用程序的基石，是Windows编程的必备利器。每一种Windows应用程序开发工具都提供了间接或直接调用了windowsAPI函数的方法，或者是调用Windows API函数的接口，也就是说具备调用动态连接库的能力。Visual C#和其它开发工具一样也能够调用动态链接
库的API函数。本文中笔者就结合实例向大家介绍在Visual C#中如何调用各种返回值的API，该实例就是一个通过API函数调用获取系统信息的
程序。  
首先，在调用API之前，你必须先导入System.Runtime.InteropServices这个名称空间。该名称空间包含了在Visual C#中调用API的一些必要集合，具体的方法如下：  
`using System.Runtime.InteropServices;  `
在导入了名称空间后，我们要声明在程序中所要用到的API函数。我们的程序主要是获取系统的相关信息，所以用到的API函数都是返回系统信息的。先给出在Visual C#中声明API的方法：  
```C#
[DllImport("kernel32")]  
public static extern void   
GetWindowsDirectory(StringBuilder WinDir,int count);  
```
其中，"DllImport"属性用来从不可控代码中调用一个方法，它指定了DLL的位置，该DLL中包含调用的外部方法；"kernel32"设定了类库名；public"指明函数的访问类型为公有的；"static"修饰符声明一个静态元素，而该元素属于类型本身而不是指定的对象；"extern"表示该方法将在工程外部执行，同时使用DllImport导入的方法必须使用"extern"修饰符；最后GetWindowsDirectory函数包含了两个参数，一个为StringBuilder类型的，另一个为int类型的，该方法返回的内容存在于StringBuilder类型的参数中。同时，因为我们在这里使用到了StringBuilder类，所以在程序的开始处，我们还得添加System.Text这个名称空间，方法同上。  
其他几个API函数的声明如下：
```C#
[DllImport("kernel32")]
public static extern void 
GetSystemDirectory(StringBuilder SysDir,int count);

[DllImport("kernel32")]
public static extern void GetSystemInfo(ref 
CPU_INFO cpuinfo);

[DllImport("kernel32")]
public static extern void GlobalMemoryStatus(ref 
MEMORY_INFO meminfo);

[DllImport("kernel32")]
public static extern void GetSystemTime(ref 
SYSTEMTIME_INFO stinfo);
```
以上几个API的作用分别是获取系统路径，获得CPU相关信息，获得内存的相关信息，获得系统时间等.在声明完所有的API函数后，我们发现后三个函数分别用到了CPU_INFO、MEMORY_INFO、SYSTEMTIME_INFO等结构，这些结构并非是.Net内部的，它们从何而来？其实，我们在用到以上API调用时均需用到以上结构，我们将函数调用获得的信息存放在以上的结构体中，最后返回给程序输出。这些结构体比较复杂，但是如果开发者能够熟练运用，那么整个API世界将尽在开发者的掌握之中。以下就是上述结构体的声明：   
```C#
//定义以下各结构
//定义CPU的信息结构
[StructLayout(LayoutKind.Sequential)]
public 
struct CPU_INFO
{
public uint dwOemId;
public uint 
dwPageSize;
public uint lpMinimumApplicationAddr<WBR>ess;
public uint 
lpMaximumApplicationAddr<WBR>ess;
public uint 
dwActiveProcessorMask;
public uint dwNumberOfProcessors;
public uint 
dwProcessorType;
public uint dwAllocationGranularity;
public uint 
dwProcessorLevel;
public uint dwProcessorRevision;
}

//定义内存的信息结构
[StructLayout(LayoutKind.Sequential)]
public struct 
MEMORY_INFO
{
public uint dwLength;
public uint dwMemoryLoad;
public 
uint dwTotalPhys;
public uint dwAvailPhys;
public uint 
dwTotalPageFile;
public uint dwAvailPageFile;
public uint 
dwTotalVirtual;
public uint dwAvailVirtual;
}

//定义系统时间的信息结构
[StructLayout(LayoutKind.Sequential)]
public struct 
SYSTEMTIME_INFO
{
public ushort wYear;
public ushort wMonth;
public 
ushort wDayOfWeek;
public ushort wDay;
public ushort wHour;
public 
ushort wMinute;
public ushort wSecond;
public ushort 
wMilliseconds;
}
```
结构体定义的主体部分和C++中的没多大差别，具体每个结构体内部成员的定义可参考联机帮助中的SDK文档。同时，我们还发现在每个结
构体定义的上面都有一句用中括号括起来的说明性文字。这些说明都是有关结构体成员的布局的，共有三种选项，分别说明如下：  
LayoutKind.Automatic：为了提高效率允许运行态对类型成员重新排序。  
注意：永远不要使用这个选项来调用不受管辖的动态链接库函数。  
LayoutKind.Explicit：对每个域按照FieldOffset属性对类型成员排序  
LayoutKind.Sequential：对出现在受管辖类型定义地方的不受管辖内存中的类型成员进行排序。  
在上面的程序中，为了方便起见我们都用到了第三种方式。  
所有的API函数以及相关的结构体声明完毕后，我们就运用这些API来实现我们的程序功能――获取系统的相关信息。  
简单的界面布置好后，我们添加一个按钮（"获取信息"按钮）的消息处理函数如下：
```C#
private void GetInfo_Click(object sender, System.EventArgs e)
{
//调用GetWindowsDirectory和GetSystemDirectory函数分别取得Windows路径和系统路径
const 
int nChars = 128;
StringBuilder Buff = new StringBuilder(nChars);
GetWindowsDirectory(Buff,nChars);
WindowsDirectory.Text 
= 
"Windows路径："+Buff.ToString();
GetSystemDirectory(Buff,nChars);
SystemDirectory.Text 
= "系统路径："+Buff.ToString();

//调用GetSystemInfo函数获取CPU的相关信息
CPU_INFO CpuInfo;
CpuInfo = new CPU_INFO();
GetSystemInfo(ref CpuInfo);
NumberOfProcessors.Text = 
"本计算机中有"+CpuInfo.dwNumberOfProcessors.ToString()+"个CPU";
ProcessorType.Text = 
"CPU的类型为"+CpuInfo.dwProcessorType.ToString();
ProcessorLevel.Text = 
"CPU等级为"+CpuInfo.dwProcessorLevel.ToString();
OemId.Text = "CPU的OEM 
ID为"+CpuInfo.dwOemId.ToString();
PageSize.Text = 
"CPU中的页面大小为"+CpuInfo.dwPageSize.ToString();

//调用GlobalMemoryStatus函数获取内存的相关信息
MEMORY_INFO MemInfo;
MemInfo = new MEMORY_INFO();
GlobalMemoryStatus(ref MemInfo);
MemoryLoad.Text = 
MemInfo.dwMemoryLoad.ToString()+"%的内存正在使用";
TotalPhys.Text = 
"物理内存共有"+MemInfo.dwTotalPhys.ToString()+"字节";
AvailPhys.Text = 
"可使用的物理内存有"+MemInfo.dwAvailPhys.ToString()+"字节";
TotalPageFile.Text = 
"交换文件总大小为"+MemInfo.dwTotalPageFile.ToString()+"字节";
AvailPageFile.Text = 
"尚可交换文件大小为"+MemInfo.dwAvailPageFile.ToString()+"字节";
TotalVirtual.Text = 
"总虚拟内存有"+MemInfo.dwTotalVirtual.ToString()+"字节";
AvailVirtual.Text = 
"未用虚拟内存有"+MemInfo.dwAvailVirtual.ToString()+"字节";

//调用GetSystemTime函数获取系统时间信息
SYSTEMTIME_INFO StInfo;
StInfo = new SYSTEMTIME_INFO();
GetSystemTime(ref StInfo);
Date.Text = 
StInfo.wYear.ToString()+"年"+StInfo.wMonth.ToString()+"月"+StInfo.wDay.ToString()+"日";
Time.Text = (StInfo.wHour+8).ToString()+"点"+StInfo.wMinute.ToString()+"分"+StInfo.wSecond.ToString()+"秒";
}
```
在上面的消息处理函数中，我们运用了在程序开始处声明的各个API函数获取了系统的相关信息，并最终在界面上以文本标签的方式显示结果。各个文本标签的命名方式可以参见文后附带的源代码，此处暂略。  
结束语：  
通过本文的学习，我相信稍有API使用基础的开发者可以马上触类旁通，很快掌握Visual C#中对API的操作。上面给出的实例仅仅是一个非常简单的示例程序，不过有兴趣的读者可以进一步完善其功能，做出更完美的系统信息检测程序。  