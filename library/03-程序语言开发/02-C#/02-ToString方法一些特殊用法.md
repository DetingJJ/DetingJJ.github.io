## ToString()用法
### 取中文日期显示
1. 年月日时分  
 urrentTime.ToString("f"); //不显示秒    
1. 年月  
 currentTime.ToString("y");  
1. 月日  
 currentTime.ToString("m");  
1. 格式为：2003-9-23
 currentTime.ToString("d");  
1. 格式为：14:24   
 currentTime.ToString("t");  

### 字符型转换 转为字符串
12345.ToString("n"); //结果：12,345.00  
12345.ToString("C");//结果：￥12,345.00  
12345.ToString("e"); //结果：1.234500e+004  
12345.ToString("f4");//结果：12345.0000  
12345.ToString("x"); //结果：3039 (16进制)  
12345.ToString("p");//结果：1,234,500.00%  

---

### datetime
令DateTime.Now为2007-7-17 22:07:24  
1. DateTime.Now.ToString("yy－MM－dd")  
处理后：07-07-17  
1. DateTime.Now.ToString("yy年MM月dd日")  
处理后：07年07月17日（中文样式）  
