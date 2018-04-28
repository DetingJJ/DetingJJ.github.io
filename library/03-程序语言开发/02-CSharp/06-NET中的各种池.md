## .NET中的各种池

在.NET中，常用到的池有四个：字符串拘留池、线程池 、应用程序池、数据库连接池。

字符串拘留池

在.NET中字符串是不可变对象，修改字符串变量的值会产生新的对象。为降低性能消耗及减小程序集大小，.NET提供了string interning的功能，直译过来就是字符串拘留。所谓的字符串拘留池(intern pool)其实是一张哈希表，键是字符串字面量，值是托管堆上字符串对象的引用。但若该表过大，则会对性能造成负面影响。在加载程序集时，不同版本的CLR对于是否留用程序集元数据中的字符串字面量（在编译时值已确定）不尽相同。但显式调用string.Intern方法则会将字符串字面量放入池中。

我们在给string类型变量分配字面量值时，CLR会先到字符串池中看下有没有完全相同的字符串（区分大小写），若有则返回对应的引用，若无，则创建新对象并添加到字符串池中返回引用。但若在运行时（如，使用new关键字）来给字符串变量分配值则不会使用字符串池。

C#提供了和字符串池相关的两个方法：
```C#
//若str不在字符串池中就创建新字符串对象放到池里并返回引用
public staticc String Intern(String str);
//若str不在字符串池中不会创建新字符串对象并返回null
public staticc String IsInterned(String str);
```
示例代码如下：
```C#
var str = "abc";
var str01 = "abc";
//运行时常量
var str02 = new string(new char[] { 'a', 'b', 'c' });
//编译时常量（可通过反编译器查看编译后的代码）
string str03 = "a" + "bc";

Console.WriteLine($"str01==str is {ReferenceEquals(str01, str)}");
Console.WriteLine($"str02==str is {ReferenceEquals(str02, str)}");
Console.WriteLine($"str03==str is {ReferenceEquals(str03, str)}");

var str04 = String.IsInterned(new string(new char[] { 'a', 'b' }));
Console.WriteLine($"str04 == null is {str04 == null}");
var str05 = String.IsInterned("abdgj");
Console.WriteLine($"str05={str05}");

var str06 = String.Intern(new string(new char[] { 'a', 'b', 'd', 'e' }));
Console.WriteLine($"str06={str06}");
```
得到如下结果：  
![](assets/03/02/06-1524905705000.png)


线程池

一个进程中只有一个线程池（MSDN）。另一种说法是，一个CLR中一个线程池（《CLR via C#》），我认同这种说法。一个进程可以加载多个不同版本的CLR，但同一版本的CLR只能有一个。总之，线程不属于应用程序域（AppDomain）。

若线程池中的线程存在未处理的异常，则会导致当前进程被终止，但有三个例外：

- ThreadAbortException ，在调用 Abort 方法终止线程时会抛出该异常

- AppDomainUnloadedException ，在卸载AppDomain时会抛出该异常

- CLR或宿主进程终止一个线程时

>在.NET1.0和1.1版本中, CLR会处理掉线程池中未处理的异常。但这样做会破坏应用程序中的状态甚至导致程序挂起，这些不利于调试。
在.NET中，许多场景可以使用线程池。如，异步I/O，回调，注册wait操作，使用委托的异步方法调用及System.Net 中的socket连接。

但在如下场景中应避免使用线程池中的线程：

- 需要使用前台线程时
- 线程需要特定优先级时
- 需要执行比较耗时的操作时。因为线程池中的线程数有上限，因此长时间的阻塞可能会影响其它任务的处理
- 当需要放置线程在单线程单元(single-threaded apartment)时。线程池中的线程均在多线程单元(multithreaded apartment)中
- 需要给线程一个稳定的标识或者线程用于特定任务时
-线程池中的线程分为两种：工作线程(Worker)和I/O线程(I/O Completion Port)。这两种线程只是用处不同，并无本质区别。

线程池中的最小线程数默认为处理器的逻辑核心数。即，在4核计算机上，线程池中工作线程和I/O线程默认的最小数均为4。理论上，线程池中的最大线程数只受可用内存大小限制，但是线程池会限制进程内可用线程的数量。
```C#
ThreadPool.GetMinThreads(out var minWorkerThreadCount, out var minIoThreadCount);
Console.WriteLine($"minWorkerThreadCount={minWorkerThreadCount},minIoThreadCount={minIoThreadCount}");
ThreadPool.GetMaxThreads(out var maxWorkerThreadCount, out var maxIoThreadCount);
Console.WriteLine($"maxWorkerThreadCount={maxWorkerThreadCount},maxIoThreadCount={maxIoThreadCount}");
```
运算结果如下：

![](assets/03/02/06-1524905769000.png)
当应用使用线程池中的线程进行工作时，若线程池中没有线程，则会创建新的线程以满足需要，当线程池中的线程数达到设定的最小线程数且无空闲线程时，则会先等待一段时间（最多500ms），500ms过后依然没有空闲线程可供使用则会创建新线程进行工作，但线程池中的线程数不会超过设定的最大线程数。

当线程池中的线程处于空闲状态一段时间后（不同CLR，这个时间不同），会被销毁。

当应用负载较低时，线程池中的线程数也有可能小于设定的最小线程数。
machine.config中线程池配置如下（.NET 配置文件体系参见：ASP.NET Configuration File Hierarchy and Inheritance）：
```C#
<system.web>
     <processModel autoConfig="true"/>
</system.web>
```
配置线程池大小：
```C#
//这种配置方式和处理CPU逻辑核心数无关
ThreadPool.SetMaxThreads(1000, 800);
ThreadPool.SetMinThreads(20, 20);
```
ASP.NET也可通过配置文件进行配置，这种方式是针对每个CPU逻辑核心进行配置：
```C#
<configuration>
 <system.web>
    <processModel minWorkerThreads="20" minIoThreads="20" />
 </system.web>
</configuration>
```
这样做，在应用启动后会报错：在 machine.config 文件之外使用注册为 allowDefinition='MachineOnly' 的节是错误的。需要修改machine.config文件。

线程池配置得当对于应用性能提升是有不少帮助的。

应用程序池

IIS5中，一台服务器只有一个工作进程，不同应用使用AppDomain进行区分，当工作进程出现问题，所有应用都会受到影响。从IIS6开始引入了应用程序池的概念，应用程序池通过进程来隔离不同的应用程序以防止不同应用之间相互影响。在部署ASP.NET应用时，应用程序池通常有两种托管管道模式可供选择：集成模式和经典模式。

默认情况下，一个应用程序池有一个工作进程，可以根据实际情况设置多个工作进程，但要考虑资源消耗及本地缓存同步问题。

IIS6和IIS5中的工作进程隔离均是在服务器级别。在同一台服务器上无法使用不同的工作进程隔离模式。从IIS7开始，工作进程隔离模式是基于应用程序池的，这样就可以在同一台服务器上使用不同的隔离模式。
在应用程序池——高级设置中可以对应用程序池做相关设置，如队列长度，工作进程回收机制等。

 
![](assets/03/02/06-1524905813000.png)
 
![](assets/03/02/06-1524905824000.png)
数据库连接池

和数据库服务器建立连接的过程是比较耗时的，对此，ADO.NET中使用了连接池来进行优化。在.NET中不同的Data Provider对于连接池的处理方式不尽相同。默认情况下，ADO.NET 启用连接池优化，可以通过连接字符串来配置是否启用连接池。

连接池可以减少和数据库建立连接的次数，连接池中维护着一组活跃的数据库连接。在我们调用IDbConnection的Open方法时，CLR会去连接池中寻找是否有可用的连接，若有则返回该连接而无需与数据库建立新的连接。当我们调用IDbConnection的Close方法时，连接会被连接池回收但不断开与数据库的连接，以备下次使用。连接池中的连接空闲一段时间（约4~8分钟）后或者连接池检测到连接已与服务器断开（需要与服务器通讯才能检测连接是否已断开），那么该连接将会被销毁。

在第一次打开连接时，ADO.NET会根据连接配置来建立连接池。ADO.NET为每个连接配置创建一个连接池，所以若程序中用到多个不同的连接配置（如，不同的连接字符串），则会有多个连接池。

若连接池中发生了超时或者其它登录错误，则会抛出异常，那么在接下来的5s内尝试该连接都将失败，这5s钟成为阻塞期。若阻塞期结束后的连接再次失败，则会进入一个新的阻塞期，新的阻塞期时长是上个阻塞期时长的2倍，但最多不超过1分钟。

如果连接字符串中没有设置MinPoolSize的值，或者将该值设为0，那么当池中没有活动连接时，连接池也会被销毁。但若将MinPoolSize的值设为大于0，那么只有在卸载AppDomain时，连接池才会被销毁。当连接池中发生了较为严重的错误，连接池也会自我清理。

连接池中最大连接数默认为100，当连接池中连接数已达到上限，且均被占用，那么新的请求会进入队列等到，等待时间超过15s（默认）则会抛出异常。

数据库连接推荐使用如下写法，这样using语句结束后，连接对象会回到连接池中以便下次请求使用。
```C#
using (IDbConnection conn = new SqlConnection())
{

}
```