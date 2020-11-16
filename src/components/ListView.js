import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Star from './Star';
function ListView({ items, onStarClicked }) {
  if (items.length === 0) {
    return <h3> You have no items</h3>;
  }
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Rating</th>
            <th>Repo name</th>
            <th>Github link</th>
            <th>Description</th>
            <th>ADD</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.gitHubStars}</td>
                <td>{item.name}</td>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>
                 
                  <Star
                    isStarred={item.isStarred}
                    onStarClicked={onStarClicked(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ListView;

