if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m02']=[{"name":"01-开源协议-零度.md","path":"02-计算机基础/01-开源协议-零度.md","content":"## 开源协议介绍 -零度  \r\n\r\n如今的开源社区越来越热闹，所谓开源，就是开放软件的实现源码，为了保护作者许可内的著作权，给以他们法律层面的保护，建立许可协议将非常重要，各种乱七八糟的开源协议有时会让人您眼花缭乱，下面零度就为您做个简单的比较，关于细枝末节您可以访问百科查阅。\r\n\r\n![](assets/02/01-1524798113000.png)\r\n\r\n上面的图为零度原创，为了说明开源协议区别，复制请注明出处，目前微软.NET就是基于MIT许可证协议开源的。\r\n\r\n### BSD许可证协议\r\n\r\nBSD是一种非常自由的开源协议，你可以针对源码进行二次开发，将修改后的源码你可以选择免费，也可用于商业用途。但它的有几个小要求：除你自己二次开发的部分外，原本代码必须使用BSD许可证协议继续分发，这也就是说，你修改的部分可以随便遵守某种其它开源协议，但原本部分必须继续遵守BSD许可证协议。由于BSD允许你修改后重新商用，所以对于盈利性企业来说是个友好的协议。\r\n\r\n### Apache许可证协议\r\n\r\nApache协议与BSD协议很类似，同样可用于免费和商业之处，不同与BSD的是Apache要求在新增文件和修改过的文件中进行注释，并保留原始版权。\r\n\r\n### GPL许可证协议\r\n\r\nGPL协议允许您使用源码，修改源码，可二次分发，但使用和二次分发的的前提是你也必须也使用GPL协议，这意味着如果项目中引用GPL协议的代码，你的整个软件业必须遵守GPL协议，不能用于商业用途，这对盈利性企业是不友好的，因为你用了免费，你也得全部免费，鼓励传播，Linux的开源就基于GPL协议，商业软件不得使用GPL协议开源的代码，这强制要求你修改后也必须开源。\r\n\r\n### LGPL许可证协议\r\n\r\nLGPL协议开源的代码，可以使用和修改，但二次分发中原本代码必须继续使用LGPL协议，原创部分可不作此限制，与GPL不同的是LGPL可以用于商业软件。\r\n\r\n### MPL许可证协议\r\n\r\nMPL是Mozilla Public License的简称，修改后的不得将版权变更为修改者，版权归原始发起作者所有，可以在商业软件中使用。\r\n\r\n### MIT许可证协议\r\n\r\nMiT协议和BSD协议一样自由，作者只想保留版权，无其它任何限制，你不能修改或者移除代码中的版权申明，但你可以使用和修改源码，可免费二次分发，也可用于商业用途的分发，商业软件可以使用，微软.NET目前开源就是采用MIT协议，这是一种比较自由的开源协议。","timestamp":1537195820865},{"name":"02-并发编程的优缺.md","path":"02-计算机基础/02-并发编程的优缺.md","content":"# 并发编程的优缺点\r\n一直以来并发编程对于刚入行的小白来说总是觉得高深莫测，于是乎，就诞生了想写点东西记录下，以提升理解和堆并发编程的认知。为什么需要用的并发？凡事总有好坏两面，之间的trade-off是什么，也就是说并发编程具有哪些缺点？以及在进行并发编程时应该了解和掌握的概念是什么？这篇文章主要以这三个问题来谈一谈。  \r\n## 为什么要用到并发\r\n一直以来，硬件的发展极其迅速，也有一个很著名的\"摩尔定律\"，可能会奇怪明明讨论的是并发编程为什么会扯到了硬件的发展，这其中的关系应该是多核CPU的发展为并发编程提供的硬件基础。摩尔定律并不是一种自然法则或者是物理定律，它只是基于认为观测数据后，对未来的一种预测。按照所预测的速度，我们的计算能力会按照指数级别的速度增长，不久以后会拥有超强的计算能力，正是在畅想未来的时候，2004年，Intel宣布4GHz芯片的计划推迟到2005年，然后在2004年秋季，Intel宣布彻底取消4GHz的计划，也就是说摩尔定律的有效性超过了半个世纪戛然而止。但是，聪明的硬件工程师并没有停止研发的脚步，他们为了进一步提升计算速度，而不是再追求单独的计算单元，而是将多个计算单元整合到了一起，也就是形成了多核CPU。短短十几年的时间，家用型CPU,比如Intel i7就可以达到4核心甚至8核心。而专业服务器则通常可以达到几个独立的CPU，每一个CPU甚至拥有多达8个以上的内核。因此，摩尔定律似乎在CPU核心扩展上继续得到体验。因此，多核的CPU的背景下，催生了并发编程的趋势，通过并发编程的形式可以将多核CPU的计算能力发挥到极致，性能得到提升。  \r\n顶级计算机科学家Donald Ervin Knuth如此评价这种情况：在我看来，这种现象（并发）或多或少是由于硬件设计者无计可施了导致的，他们将摩尔定律的责任推给了软件开发者。  \r\n另外，在特殊的业务场景下先天的就适合于并发编程。比如在图像处理领域，一张1024X768像素的图片，包含达到78万6千多个像素。即时将所有的像素遍历一边都需要很长的时间，面对如此复杂的计算量就需要充分利用多核的计算的能力。又比如当我们在网上购物时，为了提升响应速度，需要拆分，减库存，生成订单等等这些操作，就可以进行拆分利用多线程的技术完成。面对复杂业务模型，并行程序会比串行程序更适应业务需求，而并发编程更能吻合这种业务拆分。正是因为这些优点，使得多线程技术能够得到重视，也是一名CS学习者应该掌握的：  \r\n - 充分利用多核CPU的计算能力；  \r\n - 方便进行业务拆分，提升应用性能   \r\n## 并发编程有哪些缺点\r\n多线程技术有这么多的好处，难道就没有一点缺点么，就在任何场景下就一定适用么？很显然不是。\r\n### 频繁的上下文切换\r\n时间片是CPU分配给各个线程的时间，因为时间非常短，所以CPU不断通过切换线程，让我们觉得多个线程是同时执行的，时间片一般是几十毫秒。而每次切换时，需要保存当前的状态起来，以便能够进行恢复先前状态，而这个切换时非常损耗性能，过于频繁反而无法发挥出多线程编程的优势。通常减少上下文切换可以采用无锁并发编程，CAS算法，使用最少的线程和使用协程。  \r\n - 无锁并发编程：可以参照concurrentHashMap锁分段的思想，不同的线程处理不同段的数据，这样在多线程竞争的条件下，可以减少上下文切换的时间。  \r\n - CAS算法，利用Atomic下使用CAS算法来更新数据，使用了乐观锁，可以有效的减少一部分不必要的锁竞争带来的上下文切换  \r\n - 使用最少线程：避免创建不需要的线程，比如任务很少，但是创建了很多的线程，这样会造成大量的线程都处于等待状态  \r\n - 协程：在单线程里实现多任务的调度，并在单线程里维持多个任务间的切换   \r\n由于上下文切换也是个相对比较耗时的操作，所以在\"java并发编程的艺术\"一书中有过一个实验，并发累加未必会比串行累加速度要快。 可以使用Lmbench3测量上下文切换的时长vmstat测量上下文切换次数\r\n### 线程安全\r\n多线程编程中最难以把握的就是临界区线程安全问题，稍微不注意就会出现死锁的情况，一旦产生死锁就会造成系统功能不可用。  \r\n```Java\r\npublic class DeadLockDemo {\r\n    private static String resource_a = \"A\";\r\n    private static String resource_b = \"B\";\r\n\r\n    public static void main(String[] args) {\r\n        deadLock();\r\n    }\r\n\r\n    public static void deadLock() {\r\n        Thread threadA = new Thread(new Runnable() {\r\n            @Override\r\n            public void run() {\r\n                synchronized (resource_a) {\r\n                    System.out.println(\"get resource a\");\r\n                    try {\r\n                        Thread.sleep(3000);\r\n                        synchronized (resource_b) {\r\n                            System.out.println(\"get resource b\");\r\n                        }\r\n                    } catch (InterruptedException e) {\r\n                        e.printStackTrace();\r\n                    }\r\n                }\r\n            }\r\n        });\r\n        Thread threadB = new Thread(new Runnable() {\r\n            @Override\r\n            public void run() {\r\n                synchronized (resource_b) {\r\n                    System.out.println(\"get resource b\");\r\n                    synchronized (resource_a) {\r\n                        System.out.println(\"get resource a\");\r\n                    }\r\n                }\r\n            }\r\n        });\r\n        threadA.start();\r\n        threadB.start();\r\n\r\n    }\r\n}\r\n```\r\n在上面的这个demo中，开启了两个线程threadA, threadB,其中threadA占用了resource_a, 并等待被threadB释放的resource _b。threadB占用了resource _b正在等待被threadA释放的resource _a。因此threadA,threadB出现线程安全的问题，形成死锁。同样可以通过jps,jstack证明这种推论：  \r\n ![](assets/02/02-1525327874000.png)\r\n如上所述，完全可以看出当前死锁的情况。\r\n那么，通常可以用如下方式避免死锁的情况：\r\n避免一个线程同时获得多个锁；\r\n避免一个线程在锁内部占有多个资源，尽量保证每个锁只占用一个资源；\r\n尝试使用定时锁，使用lock.tryLock(timeOut)，当超时等待时当前线程不会阻塞；\r\n对于数据库锁，加锁和解锁必须在一个数据库连接里，否则会出现解锁失败的情况\r\n所以，如何正确的使用多线程编程技术有很大的学问，比如如何保证线程安全，如何正确理解由于JMM内存模型在原子性，有序性，可见性带来的问题，比如数据脏读，DCL等这些问题（在后续篇幅会讲述）。而在学习多线程编程技术的过程中也会让你收获颇丰。\r\n## 应该了解的概念\r\n### 同步VS异步\r\n同步和异步通常用来形容一次方法调用。同步方法调用一开始，调用者必须等待被调用的方法结束后，调用者后面的代码才能执行。而异步调用，指的是，调用者不用管被调用方法是否完成，都会继续执行后面的代码，当被调用的方法完成后会通知调用者。比如，在超时购物，如果一件物品没了，你得等仓库人员跟你调货，直到仓库人员跟你把货物送过来，你才能继续去收银台付款，这就类似同步调用。而异步调用了，就像网购，你在网上付款下单后，什么事就不用管了，该干嘛就干嘛去了，当货物到达后你收到通知去取就好。  \r\n### 并发与并行\r\n并发和并行是十分容易混淆的概念。并发指的是多个任务交替进行，而并行则是指真正意义上的“同时进行”。实际上，如果系统内只有一个CPU，而使用多线程时，那么真实系统环境下不能并行，只能通过切换时间片的方式交替进行，而成为并发执行任务。真正的并行也只能出现在拥有多个CPU的系统中。  \r\n### 阻塞和非阻塞\r\n阻塞和非阻塞通常用来形容多线程间的相互影响，比如一个线程占有了临界区资源，那么其他线程需要这个资源就必须进行等待该资源的释放，会导致等待的线程挂起，这种情况就是阻塞，而非阻塞就恰好相反，它强调没有一个线程可以阻塞其他线程，所有的线程都会尝试地往前运行。  \r\n### 临界区\r\n临界区用来表示一种公共资源或者说是共享数据，可以被多个线程使用。但是每个线程使用时，一旦临界区资源被一个线程占有，那么其他线程必须等待。\r\n","timestamp":1537195820865},{"name":"03-正则表达式学习.md","path":"02-计算机基础/03-正则表达式学习.md","content":"# 正则表达式入门\r\n\r\n转自：https://juejin.im/post/5b96a8e2e51d450e6a2de115?utm_source=gold_browser_extension\r\n\r\n\r\n\r\n本文旨在用最通俗的语言讲述最枯燥的基本知识\r\n\r\n> 文章提纲：\r\n>\r\n> 1. 元字符\r\n> 2. 重复限定符\r\n> 3. 分组\r\n> 4. 转义\r\n> 5. 条件或\r\n> 6. 区间\r\n\r\n正则表达式在几乎所有语言中都可以使用，无论是前端的c++Script、还是后端的c++、c#。他们都提供相应的接口/函数支持正则表达式。\r\n\r\n但很神奇的是：**无论你大学选择哪一门计算机语言，都没有关于正则表达式的课程给你修，在你学会正则之前，你只能看着那些正则大师们，写了一串外星文似的字符串，替代了你用一大篇幅的if else代码来做一些内容校验**。\r\n\r\n既然喜欢，那就动手学呗，可当你百度出一一堆相关资料时，你发现无一不例外的枯燥至极，难以学习（实话说，当年不理君也是这样的心态😂😂）。\r\n\r\n下面，不理君尝试用一种比较通俗点的方式讲一下正则，让你能在读完之后，自己写出一些简单的正则，再不济，能看到别人写的正则，那也不错了。\r\n\r\n### 1.元字符 \r\n\r\n万物皆有源，正则也是如此，元字符是构造正则表达式的一种基本元素。\r\n我们先来记几个常用的元字符：\r\n\r\n| 元字符 | 说明                         |\r\n| ------ | ---------------------------- |\r\n| .      | 匹配除换行符以外的任意字符   |\r\n| \\w     | 匹配字母或数字或下划线或汉字 |\r\n| \\s     | 匹配任意的空白符             |\r\n| \\d     | 匹配数字                     |\r\n| \\b     | 匹配单词的开始或结束         |\r\n| ^      | 匹配字符串的开始             |\r\n| $      | 匹配字符串的结束             |\r\n\r\n有了元字符之后，我们就可以利用这些元字符来写一些简单的正则表达式了，\r\n比如：\r\n\r\n1. 匹配有abc开头的字符串：\r\n```C++\r\n1\\babc或者^abc \r\n```\r\n\r\n2. 匹配8位数字的QQ号码：\r\n\r\n```c++\r\n1^\\d\\d\\d\\d\\d\\d\\d\\d$ \r\n```\r\n\r\n3. 匹配1开头11位数字的手机号码：\r\n\r\n```c++\r\n1^1\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d$ \r\n```\r\n\r\n### 2. 重复限定符 \r\n\r\n有了元字符就可以写不少的正则表达式了，但细心的你们可能会发现：别人写的正则简洁明了，而不理君写的正则一堆乱七八糟而且重复的元字符组成的。正则没提供办法处理这些重复的元字符吗？\r\n\r\n答案是有的！\r\n为了处理这些重复问题，正则表达式中一些重复限定符，把重复部分用合适的限定符替代，下面我们来看一些限定符：\r\n\r\n| 语法  | 说明             |\r\n| ----- | ---------------- |\r\n| *     | 重复零次或更多次 |\r\n| +     | 重复一次或更多次 |\r\n| ?     | 重复零次或一次   |\r\n| {n}   | 重复n次          |\r\n| {n,}  | 重复n次或更多次  |\r\n| {n,m} | 重复n到m次       |\r\n\r\n有了这些限定符之后，我们就可以对之前的正则表达式进行改造了，比如：\r\n\r\n1. 匹配8位数字的QQ号码：\r\n\r\n```c++\r\n1^\\d{8}$\r\n \r\n```\r\n\r\n2. 匹配1开头11位数字的手机号码：\r\n\r\n```c++\r\n1^1\\d{10}$ \r\n```\r\n\r\n3. 匹配银行卡号是14~18位的数字：\r\n\r\n```c++\r\n^\\d{14,18}$\r\n```\r\n\r\n4. 匹配以a开头的，0个或多个b结尾的字符串\r\n\r\n```c++\r\n1^ab*$\r\n```\r\n\r\n### 3. 分组 \r\n\r\n从上面的例子（4）中看到，*限定符是作用在与他左边最近的一个字符，那么问题来了，如果我想要ab同时被*限定那怎么办呢？\r\n\r\n> 正则表达式中用小括号()来做分组，也就是括号中的内容作为一个整体。\r\n\r\n因此当我们要匹配多个ab时，我们可以这样\r\n如：匹配字符串中包含0到多个ab开头：\r\n\r\n```c++\r\n1^(ab)*\r\n```\r\n\r\n### 4. 转义 \r\n\r\n我们看到正则表达式用小括号来做分组，那么问题来了：\r\n\r\n> 如果要匹配的字符串中本身就包含小括号，那是不是冲突？应该怎么办？\r\n\r\n针对这种情况，正则提供了转义的方式，也就是要把这些元字符、限定符或者关键字转义成普通的字符，做法很简答，就是在要转义的字符前面加个斜杠，也就是\\即可。\r\n如：要匹配以(ab)开头：\r\n\r\n```c++\r\n1^(\\(ab\\))* \r\n```\r\n\r\n### 5. 条件或 \r\n\r\n回到我们刚才的手机号匹配，我们都知道：国内号码都来自三大网，它们都有属于自己的号段，比如联通有130/131/132/155/156/185/186/145/176等号段，假如让我们匹配一个联通的号码，那按照我们目前所学到的正则，应该无从下手的，因为这里包含了一些并列的条件，也就是“或”，那么在正则中是如何表示“或”的呢？\r\n\r\n> 正则用符号 | 来表示或，也叫做分支条件，当满足正则里的分支条件的任何一种条件时，都会当成是匹配成功。\r\n\r\n那么我们就可以用或条件来处理这个问题\r\n\r\n```c++\r\n1^(130|131|132|155|156|185|186|145|176)\\d{8}$ \r\n```\r\n\r\n### 6. 区间 \r\n\r\n看到上面的例子，是不是看到有什么规律？是不是还有一种想要简化的冲动？\r\n实际是有的\r\n\r\n> 正则提供一个元字符中括号 [] 来表示区间条件。\r\n>\r\n> 1. 限定0到9 可以写成[0-9]\r\n> 2. 限定A-Z 写成[A-Z]\r\n> 3. 限定某些数字 [165]\r\n\r\n那上面的正则我们还改成这样：\r\n\r\n```c++\r\n1^((13[0-2])|(15[56])|(18[5-6])|145|176)\\d{8}$ \r\n```\r\n\r\n好了，正则表达式的基本用法就讲到这里了，其实它还有非常多的知识点以及元字符，我们在此只列举了部分元字符和语法来讲，旨在给那些不懂正则或者想学正则但有看不下去文档的人做一个快速入门级的教程，看完本教程，即使你不能写出高大上的正则，至少也能写一些简单的正则或者看得懂别人写的正则了，如果需要进阶学习，那就靠各位好好修炼啦。","timestamp":1537195820865}]