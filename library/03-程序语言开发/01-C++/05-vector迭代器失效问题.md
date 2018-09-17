### vector 迭代器失效测试

#### 失效样例
```C++
#include "stdafx.h"
#include <stdio.h>
#include <string>
#include <vector>
using namespace std;  
int _tmain(int argc, _TCHAR* argv[])
{
	vector<int> a;
	a.push_back(1);
	a.push_back(2);
	a.push_back(3);
	a.push_back(4);
	a.push_back(5);

	vector<int>::iterator iterator = a.begin();

	for (;iterator!=a.end();++iterator)
	{
		cout<< &(*iterator) << " " << *iterator <<endl;
	}
	
	iterator = a.begin();
	for (;iterator!=a.end();++iterator)
	{
		if( 2 == *iterator )
		{
            a.erase(iterator);
		}
	}

	iterator = a.begin();
	for (;iterator!=a.end();++iterator)
	{
		cout<< &(*iterator) << " " << *iterator <<endl;
	}

	system("pause");
	return 0;
}
```
此样例在代码编译时通过，但在运行时出现问题。经过调试发现出现问题时在vector执行erase后出现的。因此我们可以确定vector的迭代器失效是在erase之后产生的，那么为什么会出现此问题。

#### 优化代码1
```c++
#include "stdafx.h"
#include <stdio.h>
#include <string>
#include <vector>
using namespace std;  
int _tmain(int argc, _TCHAR* argv[])
{
	vector<int> a;
	a.push_back(1);
	a.push_back(2);
	a.push_back(3);
	a.push_back(4);
	a.push_back(5);

	vector<int>::iterator iterator = a.begin();

	for (;iterator!=a.end();++iterator)
	{
		cout<< &(*iterator) << " " << *iterator <<endl;
	}
	
	iterator = a.begin();
	for (;iterator!=a.end();++iterator)
	{
		if( 2 == *iterator || 3 == *iterator)
		{
			vector<int>::iterator it = a.erase(iterator);
			iterator = it;
		}
	}

	iterator = a.begin();
	for (;iterator!=a.end();++iterator)
	{
		cout<< &(*iterator) << " " << *iterator <<endl;
	}

	system("pause");
	return 0;
}
```
现在我希望删除2和3元素，但是此次的代码会发现我们并没有删除值为3的元素，那么是为什么呢？
#### 再次优化
```C++
#include "stdafx.h"
#include <stdio.h>
#include <string>
#include <vector>
#include <list>
#include <iostream>
#include <fstream>
using namespace std;  
int _tmain(int argc, _TCHAR* argv[])
{
	vector<int> a;
	a.push_back(1);
	a.push_back(2);
	a.push_back(3);
	a.push_back(4);
	a.push_back(5);

	vector<int>::iterator iterator = a.begin();

	for (;iterator!=a.end();++iterator)
	{
		cout<< &(*iterator) << " " << *iterator <<endl;
	}
	
	iterator = a.begin();
	for (;iterator!=a.end();)
	{
		if( 2 == *iterator || 3 == *iterator)
		{
			vector<int>::iterator it = a.erase(iterator);
			iterator = it;
		}
		else
		{
			++iterator;
		}
	}

	iterator = a.begin();
	for (;iterator!=a.end();++iterator)
	{
		cout<< &(*iterator) << " " << *iterator <<endl;
	}

	system("pause");
	return 0;
}
```
vector在erase指定位置的元素时：  
返回值是一个迭代器，指向删除元素下一个元素;如果是删除某范围内的元素时：返回值也表示一个迭代器，指向最后一个删除元素的下一个元素;