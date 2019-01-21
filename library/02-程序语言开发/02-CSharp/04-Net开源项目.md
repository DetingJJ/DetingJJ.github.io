## 综合类

1.  [微软企业库](https://entlib.codeplex.com/)&nbsp;微软官方出品,是为了协助开发商解决企业级应用开发过程中所面临的一系列共性的问题, 如安全(Security)、日志(Logging)、数据访问(Data Access)、配置管理(Configuration Manage)等，并将这些广泛使用的应用程序块集成封装至一个叫企业库的程序包中
2.  [CommonLibrary.net](https://commonlibrarynet.codeplex.com/)&nbsp;一个帮助类库,包含了ActiveRecord, Csv, Command Line Parsing, Configuration, Validation, Logging, Collections, Authentication等等
3.  [Castle](http://www.castleproject.org/)&nbsp;一个传统的综合类库,包含IOC容器,基于ActiveRecord模式的ORM,类MVC框架,核心,现在用的比较多的是核心Castle.Core, 里面包含了基于虚拟工厂的日志抽象,动态代理DynamicProxy,Dictionary Adapter(可以将一个接口转化为强类型的Dictionary对象,具体大家可以查一查,某些场景下很有用)

## <a name="t1" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>IOC容器

1.  [Autofac](https://code.google.com/p/autofac/)&nbsp;我最喜欢的一个IOC容器,特性丰富,除了IOC的基本功能外,还提供模块化和程序集扫描,内置了很多有用的扩展(Lazy,Func,Owned,IEnumrable)等等,而且对asp.net,mvc,mef,wcf,dynamicProxy等等提供了集成.
2.  [Unity](https://unity.codeplex.com/)&nbsp;微软企业库的基础,功能简单,扩展方便,微软官方提供一个EventBus的扩展例子,值得一看
3.  [Ninject](http://www.ninject.org/)&nbsp;主打特性简单易用,很多讲MVC的书中都用这个做例子
4.  [StructureMap](http://docs.structuremap.net/)&nbsp;一个传统的IOC容器,很早就出来了,性能优越,功能稳定,已经不更新了(在一个IOC容器的性能测试中性能最佳)

## <a name="t2" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>ORM框架

1.  [NHibernate](https://github.com/nhibernate)&nbsp;一个传统的ORM,移植于java的Hibernate,3.0后发展迅速,提供FluentMap和FluentConfig,支持Linq,支持 HQL和NativeSQL,支持一级缓存和二级缓存,丰富的ID生成策略,更多的拦截事件暴露,支持常见的所有数据库,缺点就是配置选项有点多,初学者无处下手
2.  [EntityFramework](http://www.cnblogs.com/Mercurius/admin/)&nbsp;微软官方出的ORM,配置简单,比NH更好的Linq支持,工具支持和较低的学习门槛,命名约定配置,支持CodeFirst DbMigration(在开发时,不能用在生产环境中),缺点就是不支持批量操作(第三方库EntityFramework.Extension扩展了这一点,还做了缓存),无原生的二级缓存,,单调的ID生成方式,不支持多数据库(很多数据库如MySql都对EF提供了支持,但是bug多多,有稳定的商业库可以选择),还有单一的配置方式(当你想从程序集动态加载model到DbContext中时,你就会知道就多捉鸡)
3.  [Dapper](http://code.google.com/p/dapper-dot-net/)&nbsp;StackOverflow开源的一个MiniOrm,性能和原生ado.net相近,0配置,强类型支持.缺点同样是有小bug,较弱的LINQ支持 (只找到一个MSSQL的linq插件)有两个关于Dapper的扩展,一个叫Dapper.Extension,一个叫 Dapper.Rainbow.Mysql.这两个扩展可能更接近传统意义上的ORM
4.  [ServiceStack.OrmLite](https://github.com/ServiceStack/ServiceStack.OrmLite)&nbsp;另外一个MiniORM,性能仅次于Dapper,支持大部分的数据库,比Dapper丰富的多的API和更好的强类型lambda表达式查询条件支持,映射0配置,也支持以Attribute配置,支持表的创建和删除,好东西.我最喜欢~~

## <a name="t3" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>文档操作

1.  [EppPlus](https://epplus.codeplex.com/)&nbsp;使用xlsx协议读写Excel2007/2010,功能非常多
2.  [DocX](https://docx.codeplex.com/)&nbsp;读写Word2007/2010文件,无需安装office
3.  [PdfSharp](https://pdfsharp.codeplex.com/)&nbsp;操作pdf

## <a name="t4" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>基础类库

1.  [AutoMapper](https://automapper.codeplex.com/)&nbsp;对象映射,常用来做DTO/ViewModel和Model之间的映射,功能丰富远超你想象
2.  [Html Agility Pack](https://htmlagilitypack.codeplex.com/)Html解析库
3.  [Json.net](https://json.codeplex.com/)&nbsp;Json序列化和反序列化,基本支持所有的json特性,性能也很好,MVC4的默认引用程序集中已包含.(支持4.0的动态对象,这个很好用)
4.  [FluentValidation](https://fluentvalidation.codeplex.com/)&nbsp;类似于4.0新出的代码契约,用于对业务对象创建验证规则.其本身已经内置了很多的规则
5.  [DotNetZip&nbsp;](https://dotnetzip.codeplex.com/)创建,压缩,解压Zip文件
6.  [SharpZipLib](http://www.icsharpcode.net/)&nbsp;创建,压缩,解压Zip文件
7.  [SevenZipSharp](https://sevenzipsharp.codeplex.com/)&nbsp;支持7zip所有格式的压缩和解压缩
8.  [Rx](https://rx.codeplex.com/)&nbsp;使用可观测对象(IObservable)的序列和 LINQ 风格的查询操作来编写异步和基于事件的程序。开发人员可通过 Rx 使用可观测对象来表示异步数据流，并使用 LINQ 操作来查询异步数据流。简而言之：Rx = Observables + LINQ + Schedulers.
9.  [Microsoft.Bcl.Async](https://www.nuget.org/packages/Microsoft.Bcl.Async)&nbsp;可以在4.0中使用4.5中新增的async和await两个关键字

## <a name="t5" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>辅助开发

1.  [Autoupdate](https://autoupdaterdotnet.codeplex.com/)&nbsp;为你的程序一键增加更新功能
2.  [NetSparkle&nbsp;](https://netsparkle.codeplex.com/)一个独立的升级框架,不依赖于你的程序和代码
3.  [MailSystem.NET](https://mailsystem.codeplex.com/)&nbsp;功能强大的电子邮件组件,提供对SMTP, POP3, IMAP4, NNTP, MIME, S/MIME, OpenPGP, DNS, vCard, vCalendar, Anti-Spam (Bayesian , RBL, DomainKeys), Queueing, Mail Merge and WhoIs的支持
4.  [FluentMigrator](https://github.com/schambers/fluentmigrator)&nbsp;一个类似于RubyMigrations的数据库Migration框架
5.  [GMap.Net](https://greatmaps.codeplex.com/)&nbsp;一个强大的.NET地图控件,可以用于Winform和WPF,跨平台,支持 Coogle, Yahoo!, Bing, OpenStreetMap, ArcGIS, Pergo, SigPac, Yandex, Mapy.cz, Maps.lt, iKarte.lv, NearMap, OviMap, CloudMade, WikiMapia, MapQuest ,同学们可以根据需求扩展国内的版本.

## <a name="t6" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>企业总线

1.  [Shuttle ESB](https://shuttle.codeplex.com/)&nbsp;一个开源的企业总线,C#编写,不依赖第三方程序集,支持MSMQ和table-based queue
2.  [NServiceBus](http://particular.net/nservicebus)&nbsp;最流行的.NET开源总线,不依赖于xml配置,支持MSMQ, RabbitMQ, ActiveMQ, WebSphereMQ, Azure,其次配套设施十分齐全,比如对autofac的集成

## <a name="t7" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>服务器

1.  [Katana](https://katanaproject.codeplex.com/)&nbsp;包含一系列的服务器组件,用来创建自包含的web应用程序.
2.  [CassiniDev](https://cassinidev.codeplex.com/)&nbsp;开源的asp.net服务器,IIS的替代品
3.  [IISTuner](https://iistuner.codeplex.com/)&nbsp;IIS配置优化工具

## <a name="t8" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>图形图像

1.  [SharpGL](https://sharpgl.codeplex.com/)&nbsp;OpenGL的C#封装,更新很

2.  快,基本可以与Glew保持一致.

3.  [Magick.NET](https://magick.codeplex.com/)&nbsp;强大的图片处理库,可以处理超过100种格式,无需安装ImageMagick
4.  [DotNet.Highcharts](https://dotnethighcharts.codeplex.com/)&nbsp;Highcharts的封装,用于asp.net,强类型和智能提示,渣前端开发者的福音.

## <a name="t9" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>日志
> 日志框架如何选择如果你使用了微软企业库,就用企业库自带的,如果你引入的程序集中有的使用了Log4net,那就最好使用Log4net,如果都没有,看个人喜好

1.  [Log4net](http://logging.apache.org/log4net/)&nbsp;传统的日志框架,移植于log4jV1.2,高效,稳定
2.  [NLog](https://github.com/nlog/NLog/)&nbsp;官方介绍为高级日志框架,与Log4net相比,有比较强的配置文件自纠错能力,更加丰富的LogAppender.
3.  [Logging Application Block](https://entlib.codeplex.com/releases/view/101823)&nbsp;微软企业库自带的日志记录模块
4.  [Semantic Logging Application Block](https://entlib.codeplex.com/releases/view/101823)&nbsp;微软企业库新出的日志记录框架,理念上不同于前面三个,具体可以参考http://blogs.msdn.com/b/agile/archive/2013/02/07/embracing-semantic-logging.aspx

## <a name="t10" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>CMS

1.  [Orchard](http://www.orchardproject.net/)&nbsp;CMS的新起之秀,基于Asp.net MVC.扩展很多.非常值得作为源码学习(值得学习的模块有IOC的深度应用,基于IOC的EventBus,高度抽象的模板系统,Cache,插件化体系,基于NH的数据迁移框架)
2.  [DotNetNuke](http://www.cnblogs.com/Mercurius/admin/)&nbsp;DotNetNuke 是微软支持的一套非常优秀的基于asp.net的开源门户网站程序,功能强大,地位类似于PHP中的WordPress
3.  [Umbraco](https://github.com/umbraco/Umbraco-CMS)&nbsp;Umbraco 是一种基于.NET技术的开源的CMS（Content Management System），使用SQL Server或MySQL进行存储数据。Umbraco最大的特色是简单、灵活、易用，不管对于开发者还是网站管理者。 Umbraco还提供了WYSIWYG 编辑器几乎与Microsoft Word完全一样

## <a name="t11" style="padding: 0px; margin: 0px; color: rgb(34, 116, 155);"></a>工具篇

1.  [nuget](http://www.cnblogs.com/Mercurius/admin/)&nbsp;vs必备插件第一,项目依赖文件管理.也可以在部门内部架设自己的nuget服务器,用于协作开发中的程序集发布.
2.  [Sandcastle Help File Builder](https://shfb.codeplex.com/)&nbsp;Sandcastle本身是微软出品的一个文档生成工具,用来代替NDoc,SHFB基于SandCastle,提供了更多的选项,工具支持和vs集成,推荐使用
<div style="color:gray"><small>来源：&nbsp;&lt;[http://www.open-open.com/lib/view/open1393838784177.html](http://www.open-open.com/lib/view/open1393838784177.html)<small>&gt;</small></small></div><small><small>&nbsp;</small></small>

