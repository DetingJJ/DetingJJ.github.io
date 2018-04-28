WaitForSingleObject 与 EnterCriticalSection 性能比较  
文章目录  
用户级原子锁定  
用户级原子锁定上的自旋等待循环  
通过自旋等待循环回退锁定  
结论  
多线程软件应用对于提升英特尔内核架构的性能至关重要。锁定代码通常是多线程应用中运行最频繁的代码。确定要使用的锁定方法与确定应用中并行处理一 样重要。此白皮书的主要目的是向开发人员简要介绍 Windows 中进行锁定的不同方法以及与这些锁定有关的相应性能开销。Window 的某些锁定 API 可能会跳转至操作系统内核。此白皮书将详细说明跳转至内核的 API 以及相应的加入条件。
使用两种不同的锁定内核说明表示不同粒度的锁定的影响。第一种锁定内核模拟锁定和取消锁定动态链接列表（通常用于通过内存管理器维护一个空闲列表） 的场景。对于多线程应用，首先需要锁定此列表，线程才能尝试分配或释放内存。第二种锁定内核表示更加精细地锁定，因为它仅获取已获得锁定的线程的 ThreadID，更新全局变量，然后释放锁定。通过采用 1 至 64 的线程数，对高、低争用场景下不同锁定的性能进行测试。每一线程获取执行 10,000,000 次某一运算的锁定，然后释放此锁定。对于这些实验，Windows XP 操作系统计时从 10 毫秒更改为 1 毫秒。   
WaitForSingleObject 和 EnterCriticalSection   
Microsoft Windows 平台中两种最常用的锁定方法为 WaitForSingleObject 和 EnterCriticalSection。WaitForSingleObject 是一个过载 Microsoft API，可用于检查和修改许多不同对象（如事件、作业、互斥体、进程、信号、线程或计时器）的状态。  WaitForSingleObject 的一个不足之处是它会始终获取内核的锁定，因此无论是否获得锁定，它都会进入特权模式 (环路 0)。此 API 还进入 Windows 内核，即使指定的超时为 0，亦如此。此锁定方法的另一不足之处在于，它一次只能处理 64 个尝试对某个对象进行锁定的线程。WaitForSingleObject 的优点是它可以全局进行处理，这使得此 API 能够用于进程间的同步。它还具有为操作系统提供锁定对象信息的优势，从而可以实现公平性及优先级倒置。  
通过对关键代码段实施 EnterCriticalSection 和 LeaveCriticalSection API 调用，可以使用 EnterCriticalSection。此 API 具有 WaitForSingleObject 所不具备的优点，因为只有存在锁定争用时，才会进入内核。如果不存在锁定争用，则此 API 会获取用户空间锁定，并且在未进入特权模式的情况下返回。如果存在争用，则此 API 在内核中所采用的路径将与 WaitForSingleObject 极其相似。在低争用的情况下，由于 EnterCriticalSection 不进入内核，因此锁定开销非常低。
不足之处是 EnterCriticalSection 无法进行全局处理，因此无法为线程获取锁定的顺序提供任何保证。EnterCriticalSection 是一种阻塞调用，意味着只有线程获得对此关键区段的访问权限时，该调用才会返回。Windows 引入了 TryEnterCriticalSection，TryEnterCriticalSection 是一种非阻塞调用，无论获得锁定与否都会立即返回。此外，EnterCriticalSection 还允许开发人员使用自旋计数对关键区段进行初始化，在回退前线程会按此自旋计数尝试获取锁定。通过使用 API InitializeCriticalSectionAndSpinCount，完成初始化。自旋计数可以在此调用中进行设置，也可以在注册表中进行设 置，以根据不同操作系统及其相应的线程量程对自旋进行更改。  
如果存在锁定争用，则 EnterCriticalSection 和 WaitForSingleObject 都会进入内核。如果实现程度过高，从用户模式到特权模式的转换开销将会非常大。
EnterCriticalSection 和 WaitForSingleObject API 调用在对使用数千个周期的运算进行锁定时，通常不会影响性能。在这些情况下，锁定调用本身的开销不会如此突出。会导致性能降低的情况是粒度锁定，获得和释 放此锁定要花费数百个周期。在这些情况下，使用用户级别锁定则非常有益。
为了说明在低争用的情况下 WaitForSingleObject 调用与 EnterCriticalSection 调用的开销情况，我们分别在 1 个和 2 个线程上运行了内存管理锁定内核。在低争用的情况下，存在加速比 (WaitForSingleObject_Time / EnterCriticalSection_Time) 大约为 5 倍的性能之差。在 2 个线程持续争用的情况下，使用 EnterCriticalSection 和使用 WaitForSingleObject 之间的差别最小。在低争用的情况下存在性能差距的原因如下：WaitForSingleObject 在每次调用时都进入内核，而 EnterCriticalSection 只有当存在锁定争用时，才进入内核。
线程数量    EnterCriticalSection 时间（毫秒）    WaitForSingleObject 时间（毫秒）    加速比 
1个线程（无争用）   1781                                                 9187                                5.2 
2 个线程（争用）    53594                                                58156                               1.1
图1
图 1：显示了在具有 1 个和 2 个线程的情况下，EnterCriticalSection 和 WaitForSingleObject 所对应的内存管理内核情况。EnterCriticalSection 在 1 个线程（无争用）的情况下速度较快，因为如果获得锁定，EnterCriticalSection 不会跳转至内核（特权模式）。
下图 2 说明了 EnterCriticalSection 和 WaitForSingleObject 在高争用时的开销情况，所采用的线程数介于 1 至 64 之间。在本实验中，我们在向动态链接列表中推入值和从中弹出值的同时，锁定和取消锁定该列表。目的是模拟内存分配器空闲列表，为了分配或释放内存，需频繁 锁定该列表。内核会主动根据环境切换争用锁定的线程，因此在两次实验中，CPU 平均负载都是 22%。很明显，在高争用情况下，利用 EnterCriticalSection 和 WaitForSingleObject 的开销并无太大差别。
![](index_files/clip_image001a778cf24-71be-48af-bf22-82c47e2bb730.png)
图 2：显示了在具有 1 到 64 条线程的情况下，EnterCriticalSection 和 WaitForSingleObject 所对应的内存管理内核情况。在高争用情况下，与 WaitForSingleObject 和 EnterCriticalSection 所关联的开销并无太大差别。
利用英特尔® VTune 分析器通过基于事件的采样来收集时钟滴答事件，这对于确定 EnterCriticalSection 和 WaitForSingleObject 的争用情况将有所帮助。在进行该实验之前，开发人员需确保已下载了正确的内核符号。有关如何下载内核符号的说明，可从 Microsoft 开发人员网络 MSDN 上获取。
在利用 EnterCriticalSection 时，如果内核（ntoskrnl.exe 或 ntkrnlpa.exe）中花费了时间，则表明发生了争用。不存在争用时，EnterCriticalSection 调用和 LeaveCriticalSection 调用会分别将大部分时间花费在 RtlEnterCriticalSection 函数和 RtlLeaveCriticalSection 函数的 ntdll.dll 中。NTDLL.DLL 是在处理器的环路 3（非特权模式）级别上运行的动态链接库。此 NTDLL.DLL 库包含许多某个应用使用的运行时库（RTL）代码，不应与操作系统内核相混淆。EnterCriticalSection 遇到争用时，它所采取的路径将与 WaitForSingleObject 极其相似。通过查看 hal.dll、ntdll.dll 和 ntkrnlpa.exe（或 ntoskrnl.exe）中包含的函数，便可能了解是否发生 EnterCriticalSection 高争用的情况，而无需了解这些内核函数的详细信息，如图 3 中所示。
![](index_files/clip_image0026027ed25-8e70-4b02-a183-31844c2bd6b9.png)
图 3： 显示了在发生 EnterCriticalSection 和 WaitForSingleObject 高争用的情况下，Windows 操作系统内核、ntdll.dll 和 hal.dll 中的热门函数情况。
WaitForSingleObject 将始终跳转至 Windows 操作系统内核，但仍可以确定是否发生了针对利用此调用的锁定的高争用。当锁定发生高争用时，WaitForSingleObject 在内核、ntdll.dll 和 hal.dll 中将分别采取不同的路径。这些路径与因线程无法获得所需的锁定而导致内核根据环境切换线程有关。特别是 KiDispatchInterrupt（操作系统内核）、ZwYieldExecution（操作系统内核）、 KiDispatchInterrupt（操作系统内核）、HalRequestlpi (hal.dll) 和 HalClearSoftwareInterrupt (hal.dll) 等都是能够很好地监视内核内 WaitForSingleObject 或 EnterCriticalSection 争用的函数。
![](index_files/clip_image0035a15e9d7-af20-464f-a6f0-b3e613ea0642.png)
图 4： 显示了在 WaitForSingleObject 调用的无争用和高争用情况下，Windows 操作系统内核、ntdll.dll 和 hal.dll 中的热门函数情况。
如果存在锁定争用，EnterCriticalSection 和 WaitForSingleObject 都将进入内核，对于操作粒度性较高的锁定和高争用的锁定，用户级锁定是最佳选择。
用户级原子锁定
用户级锁定涉及利用处理器的原子操作指令以原子方式更新内存空间。原子操作指令涉及利用指令的锁定前缀，并将目标操作数指定给某个内存地址。在目前 的英特尔处理器上，使用锁定前缀以原子方式运行以下指令：ADD、ADC、AND、BTC、BTR、BTS、CMPXCHG、CMPXCH8B、DEC、 INC、NEG、NOT、OR、SBB、SUB、XOR、XADD 和 XCHG。在跳转至内核之前，EnterCriticalSection 会利用原子操作指令尝试获取用户空间锁定。大多数指令必须明确使用锁定前缀，但 xchg 和 cmpxchg 指令例外，如果这两个指令中包含内存地址，则暗示着锁定前缀的存在。
在英特尔 486 处理器时代，锁定前缀用于在总线上声明一个锁定，这通常会带来较大的性能损失。从英特尔高能奔腾架构开始，总线锁定已转变为缓存锁定。在大多数现代架构 中，如果锁定驻留在无法缓存的内存中，或锁定超出了分割缓存线的缓存线边界，则仍会在总线上声明锁定。这两种情况都不大可能出现，因此大多数锁定前缀都将 转变为开销低廉的缓存锁定。
图 3 包含一个采用程序集中的一些行编写的简单锁定，以说明利用带有锁定前缀的原子操作指令获取锁定的方法。在本例中，代码仅仅测试指向的内存空间，以尝试获取 某个锁定。如果该内存空间包含一个 1，则表明另一个线程已获得了该锁定。如果内存空间为 0，则表明该锁定是可用的。原子操作指令 xchg 用于尝试与内存空间交换 1。如果在执行 xchg 指令后，eax 包含 0，则表明当前线程获得了该锁定。如果在执行原子操作指令 xchg 后，eax 包含 1，则表明另一个线程已获得了该锁定。注释：edx 注册包含锁定变量的地址
// 将 1 移至 eax 注册 
mov eax, 1
// 使用解除参考的 edx 中包含的值 xchg 1 
lock xchg 
DWORD PTR[edx],eax
// 如果为零，则进行测试 
test eax,eax
// 如果不是零，则跳过 
jne Target
图 5： 显示了一个简单互斥锁定的程序集。
要利用用户空间锁定（使用锁定前缀），不一定要编写程序集。通过 InterlockedExchange、InterlockedIncrement、InterlockedDecrement、 InterlockedCompareExchange 和 InterlockedExchangeAdd 等“Interlocked”API，Microsoft 提供了对用于同步的最常用原子操作指令的访问。这些 API 全部驻留在 kernel32.dll 中，ring3 级别（非特权模式）的应用程序将加载该 kernel32.dll。由于名称易于混淆，许多开发人员误以为 kernel32.dll 时间为内核时间，但此 dll 完全在 ring 3 级别（用户模式）上运行。它确实是用作 API 跳转至 Windows 内核的网关。Interlocked 函数根本不可能跳转至 Windows 内核（特权模式）。
为说明利用 WaitForSingleObject 和用户级锁定等开销高昂的锁定的潜在开销，使用简单的具有回退功能的用户级自旋等待锁定运行内存管理内核。在高争用和低争用情况下，用户级自旋等待的开销 要低几个数量级。因此，用户级锁定便成为频繁调用的粒度锁定的首选。
![](index_files/clip_image004c3d371d1-4d36-4466-a63d-4e14f76d530a.png)
图 6： 内联用户级自旋等待锁定和 WaitForSingleObject 在内存管理锁定内核上的开销。
用户级原子锁定上的自旋等待循环
利用用户模式锁定的一个不足之处在于，内核不能用于提供自旋等待。这意味着，尝试使用 xchg 或 cmpxchg 获取锁定的应用程序将必须转而执行其他操作（如果未获得锁定）或针对该锁定自旋。如果程序员想要以用户模式实现自旋等待循环，则利用具有初始化自旋计数的 TryEnterCriticalSection 或使用诸如英特尔线程构建模块中提供的第三方锁定库将是最佳选择。从理想的角度来看，当无法获得锁定时，使线程转而执行其他操作（而非使用任何自旋等待） 始终是最佳选择。
为了更好地了解自旋等待循环的构造，针对锁定内核创建了一个循环。在自旋等待循环中，首先使用原子操作指令尝试获取锁定（通常使用具有锁定前缀的 cmpxchg 或 xchg）。如果未获得锁定，代码将针对锁定内存空间的读取进行自旋，从而尝试确定其他线程释放该锁定的时间。该读取称为“可变读取”，因为它涉及 C 编程语言中的一种可变类型。可变类型具有几条与之相关联的规则，包括它们无法在注册表中更新，以及必须利用它们的内存地址来操作。在下例中，我们首先尝试 获取锁定。在本例中，获得的互斥锁定将显示 0 作为 xchg 操作的结果。
如果未获得锁定，则代码将针对可变数据类型的脏读进行自旋。然后会执行测试以确定该变量为 0 还是锁定已打开。如果锁定结果为 0，则线程将再次尝试以原子方式获取锁定，并跳转至要执行的受保护代码。
if (GETLOCK(lock) != 0) 
{ 
While (VARIOUS_CRITERIA) 
{ 
_asm pause;  // 自旋循环中的暂停指令 
if ((volatile int*)lock) == 0) // 针对脏读（而非锁定）进行自旋 
   { 
if (GETLOCK(lock)) == 0) 
     { 
goto PROTECTED_CODE; 
     } 
   } 
} 
BACK_OFF_LOCK(lock); // 回退锁定或执行其他操作 
} 
PROTECTED_CODE:
图 6： 用于原子锁定的有效自旋等待循环。请注意回退代码以及针对可变读取（而非锁定）的自旋。
通过自旋等待循环回退锁定
由于以下几个原因，利用用户空间自旋等待循环是很危险的。操作系统无法了解到处理器在自旋循环中并未执行有用的操作。因此它会允许线程继续自旋，直 至用尽其量程。量程是指分配给处理器上运行的每个线程的时间片。此问题在线程量程较高的 Windows 服务器平台上显得尤为严重。这不仅会大大增加 CPU 的使用率和处理器浪费的能源，而且还会给应用程序的性能带来负面影响，这是因为占用锁定的线程无法获取处理器以释放锁定。在设计自旋等待循环时，使每个线 程具有回退锁定的功能是很重要的。这确保了不会有太多的线程同时主动获取同一个锁定。
回退某个锁定可通过不同的方式实现。最简单的方法是获取计数锁定，使用该方法，应用程序可以在尝试获取某一锁定达到特定次数后，通过请求环境切换回 退该锁定。该尝试计数易于调整，此方法也确实常常根据硬件线程数的不同而有所调整。自旋的挂钟时间也将随处理器频率发生变化，这使得此代码难于维护。锁定 的指数回退首先将不断尝试获取锁定，但会将较长时间的等待视作线程不大可能获得此锁定。指数回退自旋等待具有更强的可伸缩性。在 Windows 网络 [1] 中通常使用第二种方法。
图 7 显示了某个内联程序集 xchg 锁定在其自旋等待循环中具有回退功能和不具有回退功能时的效果。请注意具有回退功能的锁定的性能远远高于不具有回退功能的锁定的性能。这通常是因偶尔出现 以下情况所致：某个占用锁定的线程根据环境被切换出去。该线程必须等待，直至获取处理器后才能释放锁定。![](index_files/clip_image0057549e9b7-7aeb-4565-94bc-562494b1d8f3.png)
图 7： ThreadID 锁定内核上具有回退功能的锁定和不具有回退功能的锁定。 
针对可变读取的自旋和针对锁定尝试的自旋 
开发人员在开发其自己的自旋等待循环时常犯的一个错误是试图针对原子操作指令（而非可变读取）进行自旋。针对脏读进行自旋（而不是尝试获取锁定）会消耗较少的时间和资源。这使得应用程序仅在锁定可用时才尝试获取锁定。
图 8 显示了对于 xchg 而言，针对锁定自旋和针对可变读取自旋所用时间的差异。
![](index_files/clip_image00683f7ee0b-ea03-42a5-bad8-82141468d031.png)
图 8： threadID 锁定内核上具有回退功能的锁定和不具有回退功能的锁定。
一个常见的误区是利用 cmpxchg 指令的锁定的开销低于利用 xchg 指令的锁定的开销。由于首先运行 cmp，cmpxchg 不会尝试以独占模式获取锁定，因此造成了此误解。图 9 显示了 cmpxchg 指令与 xchg 指定的开销并无太大差别。
![](index_files/clip_image007c9195d73-43a8-4499-abd9-7e55b19d8f69.png)
图 9： 在 ThreadID 锁定内核上比较 xchg 和 cmpxchg。
结论
针对各种不同的情况利用适当的锁定对于确保 Microsoft Windows 环境中的性能和可伸缩性至关重要。即使不存在锁定争用的情况下，利用 WaitForSingleObject 对于 Windows 内核而言，仍是开销高昂的调用。如果将会频繁调用该锁定，并且只存在少量针对该锁定的争用，则应避免此类型的锁定。因此，对于粒度锁 定，WaitForSingleObject 可能很危险。EnterCriticalSection 会首先尝试获取用户级锁定，如果存在锁定争用，则会跳转至内核。为帮助开发人员省去编写自己的自旋等待循环的麻烦，Microsoft 添加了 TryEnterCriticalSection 调用，该调用在跳转至内核之前会尝试获取某个自旋中的用户级锁定。
为了了解用户级自旋等待循环，我们在此白皮书中提供了基本的构造和性能建议。回退功能和针对可变读取的自旋对于自旋等待性能至关重要。