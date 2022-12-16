interface User {
  id: string;
  name: string;
}

type Member = Pick<User, 'id'> | Pick<User, 'name'>

const test = (use: Member) => {
  const ret = use
  console.log('key: ', ret)
}

test({ name: 'akashi' })
