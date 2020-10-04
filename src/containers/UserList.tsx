import React, { FunctionComponent, Suspense } from 'react';
import { Fetcher } from '../modules/Fetcher';
type User = {id: string; name: string};

function fetchUsers(): Promise<User[]> {
    console.log(`fetch users`)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1,2,3,4,5].map(v => ({
                id: `${v}`,
                name: `name_${v}`
            })))
        }, 5000);
    })
}

const UserList: FunctionComponent<{userFetcher: Fetcher<User[]>}> = ({userFetcher}) => {
    const users = userFetcher.get();
    return (
        <ul>
            {users.map(({id, name}) => (
                <li key={id}>{name}</li>
            ))}
        </ul>
    )
}

export default function() {
    const [usersFetcher, setUsersFetcher] = React.useState<Fetcher<User[]> | undefined>();
    return (
        <Suspense fallback={<p>Loading...</p>}>
          <p>
            <button
              onClick={() => {
                setUsersFetcher(new Fetcher(fetchUsers));
              }}
            >Load Users</button>
          </p>
          {usersFetcher ? <UserList userFetcher={usersFetcher} /> : null}
         </Suspense>
      );
}