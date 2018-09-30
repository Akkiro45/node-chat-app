const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Ak',
      room: 'Node'
    }, {
      id: '2',
      name: 'Ro',
      room: 'React'
    }, {
      id: '3',
      name: 'Ms',
      room: 'Node'
    }];
  });
  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: 123,
      name: 'MS',
      room: 'cricket'
    }
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it('should return names of users on node room', () => {
    const userList = users.getUserList('Node');
    expect(userList).toEqual(['Ak', 'Ms']);
  });

  it('should get the user', () => {
    const user = users.getUser(users.users[0].id);
    expect(user.name).toBe('Ak');
  });
  it('should not get the user', () => {
    const user = users.getUser('7');
    expect(user).toNotExist();
  });

  it('should remove user', () => {
    const userId = users.users[0].id;
    const user = users.removeUser(users.users[0].id);
    expect(user.id).toEqual(userId);
  });
  it('should not remove user', () => {
    const user = users.removeUser('7');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
});
