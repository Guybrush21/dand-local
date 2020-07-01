import React from 'react';
import Store from '../store';
import DashboardList from '../component/dashboard/dashboard-list'
import { useAsync } from 'react-use';

export default function Dashboard(props) {

  let store = new Store()
  const state = useAsync(async () => {

    const result = {
      pg: await store.getAllFavoriteCharacthers(),
      locations: await store.getAllFavoriteLocations(),
      items: await store.getAllFavoriteItems()
    }
    return result
  });

  return (
    <main>
      <h2>Dashboard</h2>
      <div className="dashboard">
        <article>
          <h3>Characters</h3>
          {state.loading
            ? <p>Loading...</p>
            : <DashboardList
              elements={state.value.pg}
              title="name"
              imageUrl="imageUrl"
            ></DashboardList>
          }
        </article>
        <article>
          <h3>Location</h3>
          {state.loading
            ? <p>Loading...</p>
            : <DashboardList
              elements={state.value.locations}
              title="name"
              imageUrl="imageUrl"
            ></DashboardList>
          }
        </article>
        <article>
          <h3>Items</h3>
          {state.loading
            ? <p>Loading...</p>
            : <DashboardList
              elements={state.value.items}
              title="name"
              imageUrl="imageUrl"
            ></DashboardList>
          }
        </article>
      </div>
    </main>
  )
}
