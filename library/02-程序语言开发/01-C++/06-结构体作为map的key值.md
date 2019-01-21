### map中以结构体作为key

在map中以结构体作为key值，需要将<进行重载，用于比较或者find。

```C++
#include "stdafx.h"
#include <iostream>
#include <map>
struct SStudent
{
	std::string Name;
	std::string Code;

	bool operator < (const SStudent &stOther) const 
	{
		return Name.compare(stOther.Name) < 0 && Code.compare(stOther.Code) ? true : false;
	}
};
typedef std::map<SStudent,int> StudentMap;
int _tmain(int argc, _TCHAR* argv[])
{
	StudentMap _map;
	SStudent _student;
	_student.Name = "jj";
	_student.Code = "123";
	_map.insert(std::make_pair(_student,1));
	SStudent _temp;
	_temp.Name = "jj";
	_temp.Code = "123";
	StudentMap::iterator it = _map.find(_temp);
	
	//do other thing

	system("pause");
	return 0;
}
 ```