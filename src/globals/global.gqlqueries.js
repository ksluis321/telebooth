import gql from "graphql-tag";

export const fetchMessages = gql`
  query($last_received_id: Int, $last_received_ts: timestamptz) {
    message(
      order_by: { timestamp: asc }
      where: {
        _and: {
          id: { _neq: $last_received_id }
          timestamp: { _gte: $last_received_ts }
        }
      }
    ) {
      id
      text
      user {
        username
      }
      timestamp
      chat_id
    }
  }
`;
export const fetchOnlineUsersSubscription = gql`
  subscription {
    online_users {
      user_id
      timestamp: ts
      username
      first_name
      is_unread
      is_bot
    }
  }
`;

export const addUser = gql`
  mutation($username: String!) {
    insert_user(objects: [{ username: $username }]) {
      returning {
        id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: Int, $is_unread: Boolean) {
    update_user(where: { id: { _eq: $id } }, _set: { is_unread: $is_unread }) {
      affected_rows,
      returning {
        id,
        is_unread
      }
    }
  }
`;

export const MARK_READ_MESSAGE = gql`
  mutation($chatId: Int) {
    update_message(where: {chat_id: {_eq: $chatId}, read: {_eq: false}}, _set: {read: true}) {
      affected_rows
    }
  }
`;

export const subscribeToNewMessages = gql`
  subscription {
    message(order_by: { id: asc }) {
      id
      user {
        username
        id
      }
      text
      timestamp
      chat_id
      read
    }
  }
`;
