/* 
  Реализовать функцию findUsersWithRole, которая принимает XML-документ xmlDoc и строку targetRole, которая представляет роль пользователя. Функция должна возвращать массив пользователей с заданной ролью.

  Пример XML:
<users>
  <user id="1">
    <profile>
      <personal>
        <roles>
          <role>admin</role>
          <role>user</role>
        </roles>
      </personal>
    </profile>
  </user>
  <user id="2">
    <profile>
      <personal>
        <roles>
          <role>user</role>
        </roles>
      </personal>
    </profile>
  </user>
</users>	
*/

export interface UserWithRole {
  id: string;
  profile: {
    personal: {
      roles: string[];
    };
  };
}

export function findUsersWithRole(xmlDoc: Document, targetRole: string): Element[] {
  const usersWithRole: Element[] = [];

  // Находим всех пользователей
  const users = xmlDoc.getElementsByTagName('user');

  // Перебираем каждого пользователя
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // Находим все role элементы внутри этого пользователя
    const roles = user.getElementsByTagName('role');

    // Проверяем, есть ли среди ролей targetRole
    for (let j = 0; j < roles.length; j++) {
      const role = roles[j];
      const roleText = role.textContent;

      if (roleText === targetRole) {
        usersWithRole.push(user);
        break; // Нашли нужную роль, выходим из внутреннего цикла
      }
    }
  }

  return usersWithRole;
}